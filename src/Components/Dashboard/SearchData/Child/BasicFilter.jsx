import React, { useState, useEffect,useContext } from 'react';
import AuthUser from '../../../Authentication/AuthUser/AuthUser';
import toast from 'react-hot-toast';
import AuthContext from '../../../ContextApi/AuthProvider';

const BasicFilter = ({ setData ,countries }) => {
  const {allLanguageKey} =useContext(AuthContext)
  const { CallApi } = AuthUser();
  const [formData, setFormData] = useState({
    keyword: '',
    gender: '-1',
    ageMin: '-1',
    ageMax: '-1',
    countryLive: '-1',
    stateLive: '-1',
    cityLive: '-1',
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

 

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      basic: formData
    }));
  }, [formData, setData]);

  useEffect(() => {
    if (formData.countryLive !== '-1') {
      fetchStates(formData.countryLive);
    } else {
      setStates([]);
      setCities([]);
    }
  }, [formData.countryLive]);

  useEffect(() => {
    if (formData.stateLive !== '-1') {
      fetchCities(formData.stateLive);
    } else {
      setCities([]);
    }
  }, [formData.stateLive]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setFormData(prevState => ({
      ...prevState,
      countryLive: selectedCountry,
      stateLive: '',
      cityLive: ''
    }));
    if (selectedCountry) {
      fetchStates(selectedCountry);
    }
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setFormData(prevState => ({
      ...prevState,
      stateLive: selectedState,
      cityLive: ''
    }));
    if (selectedState) {
      fetchCities(selectedState);
    }
  };

  const fetchStates = async (countryId) => {
    try {
      const response = await CallApi({
        api: `/getState/${countryId}`,
        method: "GET",
      });
      if (response && response.states) {
        setStates(response.states);
      } else {
        toast.error("States not found");
      }
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
      if (response && response.cities) {
        setCities(response.cities);
      } else {
        toast.error("Cities not found");
      }
    } catch (error) {
      console.error("Error fetching cities", error);
      toast.error("Cities not found");
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="form-floating mb-4">
          <input
            id="keyword"
            type="text"
            className="form-control"
            name="keyword"
            value={formData.keyword}
            onChange={handleChange}
          />
          <label htmlFor="keyword" className="active">
          Keyword search
          </label>
          <div className="error" id="nameError"></div>
        </div>

        <div className="form-floating mb-4">
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="-1">{allLanguageKey?.any}</option>
            <option value="M">{allLanguageKey?.male}</option>
            <option value="F">{allLanguageKey?.female}</option>
          </select>
          <label htmlFor="gender">{allLanguageKey?.looking_for}</label>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="form-floating mb-4">
              <select
                className="form-select"
                name="ageMin"
                value={formData.ageMin}
                onChange={handleChange}
              >
                <option value="-1">{allLanguageKey?.any}</option>
                {[...Array(78).keys()].map((num) => (
                  <option key={num + 18} value={num + 18}>
                    {num + 18}
                  </option>
                ))}
              </select>
              <label>{allLanguageKey?.age_from}</label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating mb-4">
              <select
                className="form-select"
                name="ageMax"
                value={formData.ageMax}
                onChange={handleChange}
              >
                <option value="-1">{allLanguageKey?.any}</option>
                {[...Array(78).keys()].map((num) => (
                  <option key={num + 18} value={num + 18}>
                    {num + 18}
                  </option>
                ))}
              </select>
              <label>{allLanguageKey?.to}</label>
            </div>
          </div>
        </div>

        <div className="form-floating mb-4">
          <select
            className="form-select"
            name="countryLive"
            value={formData.countryLive}
            onChange={handleCountryChange}
          >
            <option value="-1">{allLanguageKey?.any}</option>
            {countries?.map((country) => (
              <option
                key={country.country_id}
                value={country.country_id}
              >
                {country.country}
              </option>
            ))}
          </select>
          <label>{allLanguageKey?.living_in}</label>
        </div>

        <div className="form-floating mb-4">
          <select
            className="form-select"
            name="stateLive"
            value={formData.stateLive}
            onChange={handleStateChange}
          >
            <option value="-1">{allLanguageKey?.any}</option>
            {states.map((state) => (
              <option
              key={state.state_id}
              value={state.state_id}
            >
              {state.state}
            </option>
            ))}
          </select>
          <label htmlFor="stateLive">{allLanguageKey?.state}</label>
        </div>

        <div className="form-floating">
          <select
            className="form-select"
            name="cityLive"
            value={formData.cityLive}
            onChange={handleChange}
          >
            <option value="-1">{allLanguageKey?.any}</option>
            {cities.map((city) => (
             <option
             key={city.city_id}
             value={city.city_id}
           >
             {city.city}
           </option>
            ))}
          </select>
          <label htmlFor="cityLive">{allLanguageKey?.city}</label>
        </div>
      </div>
    </div>
  );
};

export default BasicFilter;
