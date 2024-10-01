import React, { useState, useEffect ,useContext } from "react";
import "../style/collapse.css";
import AuthUser from "../../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";
import AuthContext from "../../../ContextApi/AuthProvider";

const MatchEdit = () => {
  const { CallApi } = AuthUser();
  const {allLanguageKey} =useContext(AuthContext)
  const [openSection, setOpenSection] = useState(null);
  const [formData, setFormData] = useState({
    looking_for: "",
    ageMin: "",
    ageMax: "",
    countryLive: "",
    stateLive: "",
    cityLive: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    hairColor: [],
    hairLength: [],
    hairType: [],
    eyeColor: [],
    eyeWear: [],
    bodyType: [],
    height: [],
    weight: [],
    ethnicity: [],
    apperance: [],
    bestFeature: [],
    bodyArt: [],
    drink: [],
    smoke: [],
    willingToRelocate: [],
    maritalStatus: [],
    occupation: [],
    employmentStatus: [],
    annualIncome: "",
    homeType: [],
    livingSituation: [],
    nationality: [],
    education: [],
    religion: [],
    starSign: [],
    bustCupSize: [],
    childYoung: "",
    childOldest: "",
    childNo: "",
    MoreChild: "",
    smoking: "",
    drinking: "",
    diet: "",
    language: [],
    englishAbility: [],
    bustMeasurementMin: "",
    bustMeasurementMax: "",
    hipsMeasurementMin: "",
    hipsMeasurementMax: "",
    waistMeasurementMin: "",
    waistMeasurementMax: "",
    languageAbilities: [{ language: "", ability: "" }],
  });

  const [options, setOptions] = useState({
    hairColor: [],
    hairLength: [],
    hairType: [],
    eyeColor: [],
    eyeWear: [],
    bodyType: [],
    height: [],
    weight: [],
    ethnicity: [],
    apperance: [],
    bestFeature: [],
    bodyArt: [],
    drink: [],
    smoke: [],
    willingToRelocate: [],
    maritalStatus: [],
    occupation: [],
    employmentStatus: [],
    homeType: [],
    livingSituation: [],
    income: [],
    nationality: [],
    education: [],
    religion: [],
    starSign: [],
    bustCupSize: [],
    language: [],
    englishAbility: [],
    countries: [],
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    FetchMatchData();
  }, []);

  const handleCheckboxChange = (category, value) => {
    setFormData((prevData) => {
      const currentValues = new Set(prevData[category]);
      if (currentValues.has(value)) {
        currentValues.delete(value);
      } else {
        currentValues.add(value);
      }
      return { ...prevData, [category]: Array.from(currentValues) };
    });
  };

  const FetchMatchData = async () => {
    try {
      const response = await CallApi({
        api: "/match",
        method: "GET",
      });

      if (response) {
        setOptions(response.options);
        setFormData(response.match_data);
        setCountries(response.countries);

        // Fetch states and cities based on countryLive and stateLive
        if (response.match_data.countryLive) {
          fetchStates(response.match_data.countryLive);
        }
        if (response.match_data.stateLive) {
          fetchCities(response.match_data.stateLive);
        }
      } else {
        toast.error(response.message || "Failed to load data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCountryChange = async (event) => {
    const selectedCountry = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      countryLive: selectedCountry,
      stateLive: "",
      cityLive: "",
    }));
    setStates([]);
    setCities([]);
    if (selectedCountry) {
      fetchStates(selectedCountry);
    }
  };

  const handleStateChange = async (event) => {
    const selectedState = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      stateLive: selectedState,
      cityLive: "",
    }));
    setCities([]);
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
        if (
          formData.stateLive &&
          response.states.some((state) => state.state_id === formData.stateLive)
        ) {
          setFormData((prevState) => ({
            ...prevState,
            stateLive: formData.stateLive,
          }));
        }
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
        if (
          formData.cityLive &&
          response.cities.some((city) => city.city_id === formData.cityLive)
        ) {
          setFormData((prevState) => ({
            ...prevState,
            cityLive: formData.cityLive,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching cities", error);
      toast.error("Cities not found");
    }
  };

  const handleSectionToggle = (section) => {
    setOpenSection((prevSection) => (prevSection === section ? null : section));
  };

  const handleInputChange = (e, index = null, field = null) => {
    const { name, value, type, checked } = e.target;

    if (index !== null && field !== null) {
      const updatedLanguageAbilities = [...formData.languageAbilities];
      updatedLanguageAbilities[index][field] = value;
      setFormData({ ...formData, languageAbilities: updatedLanguageAbilities });
    } else if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter((art) => art !== value),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddMore = () => {
    setFormData((prevState) => ({
      ...prevState,
      languageAbilities: [
        ...prevState.languageAbilities,
        { language: "", ability: "" },
      ],
    }));
  };

  const handleDelete = (index) => {
    const updatedLanguageAbilities = formData.languageAbilities.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, languageAbilities: updatedLanguageAbilities });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await CallApi({
        api: "/match_save",
        method: "UPLOAD",
        data: formData,
      });

      if (response && response.status === 1) {
        toast.success("Match updated successfully");
      } else {
        toast.error(response.message || "Failed to update interests");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to update interests");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4 className="mb-3">
          <b>{allLanguageKey?.basic_details}</b>
        </h4>
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("basicDetails")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.basic_details}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "basicDetails" ? "show" : ""
              }`}
            >
              <div className="row -mb-4">
                <div className="col-md-4">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="looking_for"
                      value={formData.looking_for}
                      onChange={handleInputChange}
                    >
                       <option value="-1">{allLanguageKey?.any}</option>
                      <option value="M"> {allLanguageKey?.male}</option>
                      <option value="F"> {allLanguageKey?.female}</option>
                    </select>
                    <label> {allLanguageKey?.looking_for}</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="ageMin"
                      value={formData.ageMin}
                      onChange={handleInputChange}
                    >
                      <option value="-1"> {allLanguageKey?.any}</option>
                      {[...Array(78).keys()].map((num) => (
                        <option key={num + 18} value={num + 18}>
                          {num + 18}
                        </option>
                      ))}
                    </select>
                    <label> {allLanguageKey?.age_from}</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="ageMax"
                      value={formData.ageMax}
                      onChange={handleInputChange}
                    >
                      <option value="-1"> {allLanguageKey?.any}</option>
                      {[...Array(78).keys()].map((num) => (
                        <option key={num + 18} value={num + 18}>
                          {num + 18}
                        </option>
                      ))}
                    </select>
                    <label> {allLanguageKey?.to}</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="countryLive"
                      value={formData.countryLive}
                      onChange={handleCountryChange} // Call custom handler
                    >
                      <option value="-1"> {allLanguageKey?.any}</option>
                      {countries?.map((country) => (
                        <option
                          key={country.country_id}
                          value={country.country_id}
                        >
                          {country.country}
                        </option>
                      ))}
                    </select>
                    <label> {allLanguageKey?.living_in}</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="stateLive"
                      value={formData.stateLive}
                      onChange={handleStateChange}
                    >
                      <option value="-1"> {allLanguageKey?.any}</option>
                      {states?.map((state) => (
                        <option key={state.state_id} value={state.state_id}>
                          {state.state}
                        </option>
                      ))}
                    </select>
                    <label> {allLanguageKey?.state}</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="cityLive"
                      value={formData.cityLive}
                      onChange={handleInputChange}
                    >
                      <option value="-1">Any</option>
                      {cities?.map((city) => (
                        <option key={city.city_id} value={city.city_id}>
                          {city.city}
                        </option>
                      ))}
                    </select>
                    <label> {allLanguageKey?.city}</label>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <h4 className="mb-3">
          <b> {allLanguageKey?.appearance}Appearance</b>
        </h4>
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("appearance")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.body_figure}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "appearance" ? "show" : ""
              }`}
            >
              <div className="row -mb-4">
                <div className="col-md-3 col-sm-6">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="minHeight"
                      value={formData.minHeight}
                      onChange={handleInputChange}
                    >
                       <option value="-1"> {allLanguageKey?.any}</option>
                      {options.height.map((item) => (
                        <option key={item.item_id} value={item.item_id}>
                          {item.item}
                        </option>
                      ))}
                    </select>
                    <label> {allLanguageKey?.height_from}</label>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="maxHeight"
                      value={formData.maxHeight}
                      onChange={handleInputChange}
                    >
                      <option value=""> {allLanguageKey?.any}</option>
                      {options.height.map((item) => (
                        <option key={item.item_id} value={item.item_id}>
                          {item.item}
                        </option>
                      ))}
                    </select>
                    <label> {allLanguageKey?.to}</label>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="minWeight"
                      value={formData.minWeight}
                      onChange={handleInputChange}
                    >
                      <option value=""> {allLanguageKey?.any}</option>
                      {options.weight.map((item) => (
                        <option key={item.item_id} value={item.item_id}>
                          {item.item}
                        </option>
                      ))}
                    </select>
                    <label> {allLanguageKey?.weight_from}</label>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="maxWeight"
                      value={formData.maxWeight}
                      onChange={handleInputChange}
                    >
                      <option value=""> {allLanguageKey?.any}</option>
                      {options.weight.map((item) => (
                        <option key={item.item_id} value={item.item_id}>
                          {item.item}
                        </option>
                      ))}
                    </select>
                    <label> {allLanguageKey?.to}</label>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("bodyType")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.body_type || ''}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "bodyType" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.bodyType.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`bodyType${item.item_id}`}
                      name="bodyType"
                      value={item.item_id}
                      checked={formData.bodyType.includes(String(item.item_id))}
                      onChange={() =>
                        handleCheckboxChange("bodyType", String(item.item_id))
                      }
                    />
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`bodyType${item.item_id}`}
                      name="bodyType"
                      value={item.item_id}
                      checked={formData.bodyType.includes(String(item.item_id))}
                      onChange={() =>
                        handleCheckboxChange("bodyType", String(item.item_id))
                      }
                    />
                    <label
                      htmlFor={`bodyType${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("ethnicity")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.their_ethnicity_is_mostly}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "ethnicity" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
              <option value="-1"> {allLanguageKey?.any}</option>
                {options.ethnicity.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`ethnicity${item.item_id}`}
                      name="ethnicity"
                      value={item.item_id}
                      checked={formData.ethnicity.includes(
                        String(item.item_id)
                      )}
                      onChange={() =>
                        handleCheckboxChange("ethnicity", String(item.item_id))
                      }
                    />
                    <label
                      htmlFor={`ethnicity${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("apperance")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.apperance}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "apperance" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.apperance.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`apperance${item.item_id}`}
                      name="apperance"
                      value={item.item_id}
                      checked={formData.apperance.includes(
                        String(item.item_id)
                      )}
                      onChange={() =>
                        handleCheckboxChange("apperance", String(item.item_id))
                      }
                    />
                    <label
                      htmlFor={`apperance${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("hairColor")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.hair_color}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "hairColor" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.hairColor.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`hairColor${item.item_id}`}
                      name="hairColor"
                      value={item.item_id}
                      checked={formData.hairColor.includes(
                        String(item.item_id)
                      )}
                      onChange={() =>
                        handleCheckboxChange("hairColor", String(item.item_id))
                      }
                    />
                    <label
                      htmlFor={`hairColor${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("hairLength")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.hair_length}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "hairLength" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.hairLength.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`hairLength${item.item_id}`}
                      name="hairLength"
                      value={item.item_id}
                      checked={formData.hairLength.includes(
                        String(item.item_id)
                      )}
                      onChange={() =>
                        handleCheckboxChange("hairLength", String(item.item_id))
                      }
                    />
                    <label
                      htmlFor={`hairLength${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("hairType")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.hair_type}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "hairType" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.hairType.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`hairType${item.item_id}`}
                      name="hairType"
                      value={item.item_id}
                      checked={formData.hairType.includes(String(item.item_id))}
                      onChange={() =>
                        handleCheckboxChange("hairType", String(item.item_id))
                      }
                    />
                    <label
                      htmlFor={`hairType${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("eyeColor")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.eye_color}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "eyeColor" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.eyeColor.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`eyeColor${item.item_id}`}
                      name="eyeColor"
                      value={item.item_id}
                      checked={formData.eyeColor.includes(String(item.item_id))}
                      onChange={() =>
                        handleCheckboxChange("eyeColor", String(item.item_id))
                      }
                    />
                    <label
                      htmlFor={`eyeColor${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("eyeWear")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.eye_wear}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "eyeWear" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.eyeWear.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`eyeWear${item.item_id}`}
                      name="eyeWear"
                      value={item.item_id}
                      checked={formData.eyeWear.includes(String(item.item_id))}
                      onChange={() =>
                        handleCheckboxChange("eyeWear", String(item.item_id))
                      }
                    />
                    <label
                      htmlFor={`eyeWear${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("bestFeature")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.best_feature}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "bestFeature" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.bestFeature.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`bestFeature${item.item_id}`}
                      name="bestFeature"
                      value={item.item_id}
                      checked={formData.bestFeature.includes(
                        String(item.item_id)
                      )}
                      onChange={() =>
                        handleCheckboxChange(
                          "bestFeature",
                          String(item.item_id)
                        )
                      }
                    />
                    <label
                      htmlFor={`bestFeature${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("bodyArt")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.body_art}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "bodyArt" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.bodyArt.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`bodyArt${item.item_id}`}
                      name="bodyArt"
                      value={item.item_id}
                      checked={formData.bodyArt.includes(String(item.item_id))}
                      onChange={() =>
                        handleCheckboxChange("bodyArt", String(item.item_id))
                      }
                    />
                    <label
                      htmlFor={`bodyArt${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
        </ul>

        <h4 className="mb-3">
          <b> {allLanguageKey?.their_lifestyle}</b>
        </h4>
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("smoke")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.do_they_smoke}?
            </div>
            <div
              className={`collapsible-body ${
                openSection === "smoke" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.smoke.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`smoke${item.item_id}`}
                      name="smoke"
                      value={item.item_id}
                      checked={formData.smoke.includes(String(item.item_id))}
                      onChange={() =>
                        handleCheckboxChange("smoke", String(item.item_id))
                      }
                    />
                    <label
                      htmlFor={`smoke${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("drink")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.do_they_drink}?
            </div>
            <div
              className={`collapsible-body ${
                openSection === "drink" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.drink.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`drink${item.item_id}`}
                      name="drink"
                      value={item.item_id}
                      checked={formData.drink.includes(String(item.item_id))}
                      onChange={() =>
                        handleCheckboxChange("drink", String(item.item_id))
                      }
                    />
                    <label
                      htmlFor={`drink${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("willingToRelocate")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.willing_to_relocate}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "willingToRelocate" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.willingToRelocate.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`willingToRelocate${item.item_id}`}
                      name="willingToRelocate"
                      value={item.item_id}
                      checked={formData.willingToRelocate.includes(
                        String(item.item_id)
                      )}
                      onChange={() =>
                        handleCheckboxChange(
                          "willingToRelocate",
                          String(item.item_id)
                        )
                      }
                    />
                    <label
                      htmlFor={`willingToRelocate${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("maritalStatus")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.marital_status}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "maritalStatus" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.maritalStatus.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`maritalStatus${item.item_id}`}
                      name="maritalStatus"
                      value={item.item_id}
                      checked={formData.maritalStatus.includes(
                        String(item.item_id)
                      )}
                      onChange={() =>
                        handleCheckboxChange(
                          "maritalStatus",
                          String(item.item_id)
                        )
                      }
                    />
                    <label
                      htmlFor={`maritalStatus${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("childNo")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.how_many_children}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "childNo" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                <div className="form-check">
                  <select
                    className="form-control"
                    name="childNo"
                    value={formData.childNo}
                    onChange={handleInputChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "More than 10"].map(
                      (item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("childOldest")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.oldest_child_age}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "childOldest" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                <div className="form-check">
                  <select
                    className="form-control"
                    name="childOldest"
                    value={formData.childOldest}
                    onChange={handleInputChange}
                  >
                    {[
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      9,
                      10,
                      11,
                      12,
                      13,
                      14,
                      15,
                      16,
                      17,
                      18,
                      "More than 18",
                    ].map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("childYoung")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.youngest_child_age}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "childYoung" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                <div className="form-check">
                  <select
                    className="form-control"
                    name="childYoung"
                    value={formData.childYoung}
                    onChange={handleInputChange}
                  >
                    <option value="">Any</option>
                    {[
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      9,
                      10,
                      11,
                      12,
                      13,
                      14,
                      15,
                      16,
                      17,
                      18,
                      "More than 18",
                    ].map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("childrenW")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.do_you_want_more_children}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "childrenW" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                <div className="form-check">
                  <select
                    className="form-control"
                    name="childrenW"
                    value={formData.childrenW}
                    onChange={handleInputChange}
                  >
                    {["Yes", "No", "Not Sure"].map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <h4 className="mb-3">
          <b>{allLanguageKey?.partner_lifestyle}</b>
        </h4>
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("occupation")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.occupation}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "occupation" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.occupation.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`occupation${item.item_id}`}
                      name="occupation"
                      value={item.item_id}
                      checked={formData.occupation.includes(
                        String(item.item_id)
                      )}
                      onChange={() =>
                        handleCheckboxChange("occupation", String(item.item_id))
                      }
                    />
                    <label
                      htmlFor={`occupation${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("employmentStatus")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.employment_status}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "employmentStatus" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.employmentStatus.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`employmentStatus${item.item_id}`}
                      name="employmentStatus"
                      value={item.item_id}
                      checked={formData.employmentStatus.includes(
                        String(item.item_id)
                      )}
                      onChange={() =>
                        handleCheckboxChange(
                          "employmentStatus",
                          String(item.item_id)
                        )
                      }
                    />
                    <label
                      htmlFor={`employmentStatus${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("homeType")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.home_type}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "homeType" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.homeType.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`homeType${item.item_id}`}
                      name="homeType"
                      value={item.item_id}
                      checked={formData.homeType.includes(String(item.item_id))}
                      onChange={() =>
                        handleCheckboxChange("homeType", String(item.item_id))
                      }
                    />
                    <label
                      htmlFor={`homeType${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("livingSituation")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.living_situation}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "livingSituation" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.livingSituation.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`livingSituation${item.item_id}`}
                      name="livingSituation"
                      value={item.item_id}
                      checked={formData.livingSituation.includes(
                        String(item.item_id)
                      )}
                      onChange={() =>
                        handleCheckboxChange(
                          "livingSituation",
                          String(item.item_id)
                        )
                      }
                    />
                    <label
                      htmlFor={`livingSituation${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("annualIncome")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.annual_income}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "annualIncome" ? "show" : ""
              }`}
            >
              <div className="col-md-3 col-sm-6">
                <div className="form-floating mb-4">
                  <select
                    className="form-select"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleInputChange}
                  >
                    {options.income.map((item) => (
                      <option key={item.item_id} value={item.item_id}>
                        {item.item}
                      </option>
                    ))}
                  </select>
                  <label>{allLanguageKey?.income}</label>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <h4 className="mb-3">
          <b>{allLanguageKey?.cultural_values}</b>
        </h4>
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("nationality")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.nationality}:
            </div>
            <div
              className={`collapsible-body ${
                openSection === "nationality" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.nationality.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`nationality${item.item_id}`}
                      name="nationality"
                      value={item.item_id}
                      checked={formData.nationality.includes(
                        String(item.item_id)
                      )}
                      onChange={() =>
                        handleCheckboxChange(
                          "nationality",
                          String(item.item_id)
                        )
                      }
                    />
                    <label
                      htmlFor={`nationality${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("Qualification")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.qualification}:
            </div>
            <div
              className={`collapsible-body ${
                openSection === "Qualification" ? "show" : ""
              }`}
            >
              <div className="row">
                <div className="col-md-4 col-sm-6">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                    >
                      {options.education.map((item) => (
                        <option key={item.item_id} value={item.item_id}>
                          {item.item}
                        </option>
                      ))}
                    </select>
                    <label>{allLanguageKey?.education}</label>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="religion"
                      value={formData.religion}
                      onChange={handleInputChange}
                    >
                     
                      {options.religion.map((item) => (
                        <>
                        <options value='-1'>{allLanguageKey?.any}</options>
                        <option key={item.item_id} value={item.item_id}>
                          {item.item}
                        </option>
                        </>
                         
                      ))}
                    </select>
                    <label>{allLanguageKey?.religion}</label>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("Communication Language")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.language}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "Communication Language" ? "show" : ""
              }`}
            >
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                    >
                      {options.language.map((item) => (
                        <option key={item.item_id} value={item.item_id}>
                          {item.item}
                        </option>
                      ))}
                    </select>
                    <label>{allLanguageKey?.language}</label>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-floating mb-4">
                    <select
                      className="form-select"
                      name="englishAbility"
                      value={formData.englishAbility}
                      onChange={handleInputChange}
                    >
                      {options.englishAbility.map((item) => (
                        <option key={item.item_id} value={item.item_id}>
                          {item.item}
                        </option>
                      ))}
                    </select>

                    <label>Ability</label>
                    <button className="btn btn-danger">Delete</button>
                  </div>
                </div>
                <button className="btn btn-danger" style={{ width: "10%" }}>
                Add More{" "}
                </button>
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("starSign")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.star_sign}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "starSign" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.starSign.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`starSign${item.item_id}`}
                      name="starSign"
                      value={item.item_id}
                      checked={formData.starSign.includes(String(item.item_id))}
                      onChange={() =>
                        handleCheckboxChange("starSign", String(item.item_id))
                      }
                    />
                    <label
                      htmlFor={`starSign${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
        </ul>

        <h4 className="mb-3">
          <b>{allLanguageKey?.personal}</b>
        </h4>
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("bustCupSize")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.bust_cup_size}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "bustCupSize" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                {options.bustCupSize.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`bustCupSize${item.item_id}`}
                      name="bustCupSize"
                      value={item.item_id}
                      checked={formData.bustCupSize.includes(
                        String(item.item_id)
                      )}
                      onChange={() =>
                        handleCheckboxChange(
                          "bustCupSize",
                          String(item.item_id)
                        )
                      }
                    />
                    <label
                      htmlFor={`nationality${item.item_id}`}
                      className="form-check-label"
                    >
                      {item.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="collapsible-header"
              onClick={() => handleSectionToggle("Measurement")}
            >
              <i className="material-icons down">arrow_drop_down</i>
              {allLanguageKey?.measurement}
            </div>
            <div
              className={`collapsible-body ${
                openSection === "Measurement" ? "show" : ""
              }`}
            >
              <div className="effect-from-s">
                <div className="row">
                  {/* Bust Measurement From */}
                  <div className="col-md-4 col-sm-6">
                    <div className="form-floating mb-4">
                      <select
                        className="form-select"
                        name="bustMeasurementMin"
                        value={formData.bustMeasurementMin}
                        onChange={handleInputChange}
                      >
                        <option value="">{allLanguageKey?.any}</option>
                        {[
                          24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
                          50, 51, 52, 53, 54,
                        ].map((item, index) => (
                          <option key={index} value={item}>
                            {item}"
                          </option>
                        ))}
                      </select>
                      <label>{allLanguageKey?.bust_measurement}</label>
                    </div>
                  </div>

                  {/* Bust Measurement To */}
                  <div className="col-md-4 col-sm-6">
                    <div className="form-floating mb-4">
                      <select
                        className="form-select"
                        name="bustMeasurementMax"
                        value={formData.bustMeasurementMax}
                        onChange={handleInputChange}
                      >
                        <option value="">{allLanguageKey?.any}</option>
                        {[
                          24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
                          50, 51, 52, 53, 54,
                        ].map((item, index) => (
                          <option key={index} value={item}>
                            {item}"
                          </option>
                        ))}
                      </select>
                      <label> {allLanguageKey?.to}</label>
                    </div>
                  </div>

                  {/* Waist Measurement From */}
                  <div className="col-md-4 col-sm-6">
                    <div className="form-floating mb-4">
                      <select
                        className="form-select"
                        name="waistMeasurementMin"
                        value={formData.waistMeasurementMin}
                        onChange={handleInputChange}
                      >
                        <option value="">{allLanguageKey?.any}</option>
                        {[
                          24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
                          50, 51, 52, 53, 54,
                        ].map((item, index) => (
                          <option key={index} value={item}>
                            {item}"
                          </option>
                        ))}
                      </select>
                      <label>{allLanguageKey?.waist_measurement}</label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Waist Measurement To */}
                  <div className="col-md-4 col-sm-6">
                    <div className="form-floating mb-4">
                      <select
                        className="form-select"
                        name="waistMeasurementMax"
                        value={formData.waistMeasurementMax}
                        onChange={handleInputChange}
                      >
                        <option value="">{allLanguageKey?.any}</option>
                        {[
                          24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
                          50, 51, 52, 53, 54,
                        ].map((item, index) => (
                          <option key={index} value={item}>
                            {item}"
                          </option>
                        ))}
                      </select>
                      <label> {allLanguageKey?.to}To</label>
                    </div>
                  </div>

                  {/* Hips Measurement From */}
                  <div className="col-md-4 col-sm-6">
                    <div className="form-floating mb-4">
                      <select
                        className="form-select"
                        name="hipsMeasurementMin"
                        value={formData.hipsMeasurementMin}
                        onChange={handleInputChange}
                      >
                        <option value="">{allLanguageKey?.any}Any</option>
                        {[
                          24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
                          50, 51, 52, 53, 54,
                        ].map((item, index) => (
                          <option key={index} value={item}>
                            {item}"
                          </option>
                        ))}
                      </select>
                      <label>{allLanguageKey?.hips_measurement}Hips measurement</label>
                    </div>
                  </div>

                  {/* Hips Measurement To */}
                  <div className="col-md-4 col-sm-6">
                    <div className="form-floating mb-4">
                      <select
                        className="form-select"
                        name="hipsMeasurementMax"
                        value={formData.hipsMeasurementMax}
                        onChange={handleInputChange}
                      >
                        <option value="">{allLanguageKey?.any}</option>
                        {[
                          24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
                          50, 51, 52, 53, 54,
                        ].map((item, index) => (
                          <option key={index} value={item}>
                            {item}"
                          </option>
                        ))}
                      </select>
                      <label>{allLanguageKey?.to}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <button type="submit" className="btn btn-primary">
        {allLanguageKey?.save}
        </button>
      </form>
    </div>
  );
};

export default MatchEdit;
