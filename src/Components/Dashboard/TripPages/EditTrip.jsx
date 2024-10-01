import React, { useState, useEffect } from "react";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import DateRange from "./DateRange"; // Ensure the path is correct
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const financeOptions = {
  1: "Each person pays for himself/herself",
  2: "I can pay for everyone",
  3: "I would like someone to pay for me",
};

const purposeOptions = {
  1: "Beach Break",
  2: "Business Trip",
  3: "Cruise",
  4: "Concert",
  5: "Foodie Tour",
  6: "Road Trip",
  7: "Sport Sightseeing",
  8: "Shopping Trip",
  9: "Short/Weekend Break",
  10: "Festive",
};

const EditTrip = () => {
  const [formData, setFormData] = useState({
    looking_for: "",
    to_country_id: "",
    to_state_id: "",
    to_city_id: "",
    daterange: { startDate: null, endDate: null },
    note: "",
    purpose: [],
    finance: "",
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const { CallApi } = AuthUser();

  useEffect(() => {
    FetchTripData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDateRangeChange = (newDateRange) => {
    setFormData((prevData) => ({
      ...prevData,
      daterange: newDateRange,
    }));
  };

  const FetchTripData = async () => {
    try {
      const response = await CallApi({
        api: `/edit_trips/61`,
        method: "GET",
      });
      if (response) {
        const tripData = response.trip;
        setFormData({
          looking_for: tripData.looking_for || "1",
          to_country_id: tripData.to_country_id || "",
          to_state_id: tripData.to_state_id || "",
          to_city_id: tripData.to_city_id || "",
          daterange: {
            startDate: tripData.from_date ? new Date(tripData.from_date) : null,
            endDate: tripData.to_date ? new Date(tripData.to_date) : null,
          },
          note: tripData.note || "",
          purpose: tripData.purpose || [],
          finance: tripData.finance_type || "1",
        });
        setCountries(response.countries || []);
        setStates(response.states || []);
        setCities(response.cities || []);
      }
    } catch (error) {
      console.error("Error fetching trip data", error);
      toast.error("Failed to fetch trip data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${month}/${day}/${year}`;
    };

    const startDate = formData.daterange.startDate
      ? formatDate(formData.daterange.startDate)
      : null;
    const endDate = formData.daterange.endDate
      ? formatDate(formData.daterange.endDate)
      : null;

    try {
      const response = await CallApi({
        api: "/trip_edit_save",
        method: "UPLOAD",
        data: {
          ...formData,
          daterange: startDate && endDate ? `${startDate} - ${endDate}` : null,
        },
      });

      if (response) {
        toast.success(response.message);
        setFormData({
          looking_for: "1",
          to_country_id: "",
          to_state_id: "",
          to_city_id: "",
          daterange: { startDate: null, endDate: null },
          note: "",
          purpose: [],
          finance: "1",
        });

        FetchTripData();
      } else {
        toast.error("Failed to add trip");
      }
    } catch (error) {
      console.error("Error adding trip", error);
      toast.error("Failed to add trip");
    }
  };

  const handleCountryChange = async (event) => {
    const selectedCountry = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      to_country_id: selectedCountry,
      to_state_id: "",
      to_city_id: "",
    }));
    fetchStates(selectedCountry);
  };

  const handleStateChange = async (event) => {
    const selectedState = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      to_state_id: selectedState,
      to_city_id: "",
    }));
    fetchCities(selectedState);
  };

  const fetchStates = async (countryId) => {
    try {
      const response = await CallApi({
        api: `/getState/${countryId}`,
        method: "GET",
      });
      setStates(response.states || []);
    } catch (error) {
      console.error("Error fetching states", error);
      toast.error("States not found");
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const response = await CallApi({
        api: `/getCity/${stateId}`,
        method: "GET",
      });
      setCities(response.cities || []);
    } catch (error) {
      console.error("Error fetching cities", error);
      toast.error("Cities not found");
    }
  };

  return (
    <div className="dashboard-content-inner">
        <h1></h1>
      <div className="row">
        <aside className="col-xl-9 col-lg-8 col-12">
          <div className="card">
            <div className="card-header">
              <h4>
                <b>Edit Trip</b>
              </h4>
              <Link to='/my-trip' className="btn btn-outline-primary right" >
                <i className="bi bi-chevron-left"></i> Back to list
              </Link>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-field mb-4">
                  <label className="form-label d-block">I am Looking For</label>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic radio toggle button group"
                  >
                    <input
                      type="radio"
                      className="btn-check"
                      name="looking_for"
                      id="looking_for1"
                      value="1"
                      checked={formData.looking_for === "1"}
                      onChange={handleChange}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="looking_for1"
                    >
                      <i className="bi bi-gender-male"></i> Male
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="looking_for"
                      id="looking_for2"
                      value="2"
                      checked={formData.looking_for === "2"}
                      onChange={handleChange}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="looking_for2"
                    >
                      <i className="bi bi-gender-female"></i> Female
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="looking_for"
                      id="looking_for3"
                      value="3"
                      checked={formData.looking_for === "3"}
                      onChange={handleChange}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="looking_for3"
                    >
                      <i className="bi bi-person"></i> Does not matter
                    </label>
                  </div>
                </div>

                <div className="form-floating mb-4">
                  <select
                    className="form-select"
                    name="to_country_id"
                    value={formData.to_country_id}
                    onChange={handleCountryChange}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option
                        key={country.country_id}
                        value={country.country_id}
                      >
                        {country.country}
                      </option>
                    ))}
                  </select>
                  <label>Country</label>
                </div>

                <div className="form-floating mb-4">
                  <select
                    className="form-select"
                    name="to_state_id"
                    value={formData.to_state_id}
                    onChange={handleStateChange}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.state_id} value={state.state_id}>
                        {state.state}
                      </option>
                    ))}
                  </select>
                  <label>State</label>
                </div>

                <div className="form-floating mb-4">
                  <select
                    className="form-select"
                    name="to_city_id"
                    value={formData.to_city_id}
                    onChange={handleChange}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.city_id} value={city.city_id}>
                        {city.city}
                      </option>
                    ))}
                  </select>
                  <label>City</label>
                </div>

                <div className="form-floating mb-4">
                  <DateRange
                    value={formData.daterange}
                    onChange={handleDateRangeChange}
                  />
                </div>

                <div className="form-floating mb-4">
                  <textarea
                    id="textarea1"
                    className="form-control"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder=""
                    style={{ minHeight: "100px" }}
                  ></textarea>
                  <label htmlFor="textarea1">Note</label>
                </div>

                <div className="form-field mb-4">
                  <label className="form-label d-block">
                    Purpose of Travel
                  </label>
                  <div className="tags-container mb-3">
                    {Object.entries(purposeOptions).map(([key, value]) => (
                      <div className="tag" key={key}>
                        <input
                          type="checkbox"
                          id={`tag${key}`}
                          value={key}
                          name="purpose"
                          checked={formData.purpose.includes(key)}
                          onChange={handleChange}
                        />
                        <label htmlFor={`tag${key}`}>{value}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-field mb-4">
                  <label className="form-label d-block">Finances</label>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic radio toggle button group"
                  >
                    {Object.entries(financeOptions).map(([key, value]) => (
                      <React.Fragment key={key}>
                        <input
                          type="radio"
                          className="btn-check"
                          name="finance"
                          id={`btnradio${key}`}
                          value={key}
                          checked={formData.finance === key}
                          onChange={handleChange}
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor={`btnradio${key}`}
                        >
                          {value}
                        </label>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Update Trip
                  </button>
                </div>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EditTrip;
