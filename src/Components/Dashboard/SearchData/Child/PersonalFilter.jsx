import React, { useState, useEffect, useContext } from 'react';
import '../../MyProfile/style/collapse.css';
import AuthContext from '../../../ContextApi/AuthProvider';

const PersonalFilter = ({ setData, option }) => {
  const {allLanguageKey} =useContext(AuthContext)
  const [openSection, setOpenSection] = useState(null);
  const [formData, setFormData] = useState({
    bustCupSize: [],
    bustMeasurementMin: '-1',
    bustMeasurementMax: '-1',
    waistMeasurementMin: '-1',
    waistMeasurementMax: '-1',
    hipsMeasurementMin: '-1',
    hipsMeasurementMax: '-1',
  });

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      personal: formData,
    }));
  }, [formData, setData]);

  const handleSectionToggle = section => {
    setOpenSection(prevSection => (prevSection === section ? null : section));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name], value]
        : prevData[name].filter(item => item !== value),
    }));
  };

  const handleSelectChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div id="personal_info_card">
      <h4 className="mb-3"><b>{allLanguageKey?.personal}Personal</b></h4>
      <ul className="collapsible" data-collapsible="accordion">
        {/* Bust Cup Size Section */}
        <li>
          <div className="collapsible-header" onClick={() => handleSectionToggle('bustCupSize')}>
            <i className="material-icons down">arrow_drop_down</i>
            {allLanguageKey?.bust_cup_size}
          </div>
          <div className={`collapsible-body ${openSection === 'bustCupSize' ? 'show' : ''}`}>
            {option?.bustCupSize?.map((value, index) => (
              <div className="form-check" key={index}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`bustCupSize_${value.item_id}`}
                  name="bustCupSize"
                  value={value.item_id}
                  checked={formData.bustCupSize.includes(value.item_id)}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor={`bustCupSize_${value.item_id}`}>
                  {value === '-1' ? 'Any' : value.item}
                </label>
              </div>
            ))}
          </div>
        </li>

        {/* Measurement Section */}
        <li>
          <div className="collapsible-header" onClick={() => handleSectionToggle('measurement')}>
            <i className="material-icons down">arrow_drop_down</i>
            {allLanguageKey?.measurement}
          </div>
          <div className={`collapsible-body ${openSection === 'measurement' ? 'show' : ''}`}>
            <div className="row gx-3">
              <div className="col-md-6 col-sm-12 mb-4">
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="bustMeasurementMin"
                    id="bustMeasurementMin"
                    value={formData.bustMeasurementMin}
                    onChange={handleSelectChange}
                  >
                    {option?.bustMeasurementMin?.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="bustMeasurementMin">{allLanguageKey?.bust_measurement}</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mb-4">
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="bustMeasurementMax"
                    id="bustMeasurementMax"
                    value={formData.bustMeasurementMax}
                    onChange={handleSelectChange}
                  >
                    {option?.bustMeasurementMax?.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="bustMeasurementMax">{allLanguageKey?.to}</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mb-4">
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="waistMeasurementMin"
                    id="waistMeasurementMin"
                    value={formData.waistMeasurementMin}
                    onChange={handleSelectChange}
                  >
                    {option?.waistMeasurementMin?.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="waistMeasurementMin">{allLanguageKey?.waist_measurement}</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mb-4">
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="waistMeasurementMax"
                    id="waistMeasurementMax"
                    value={formData.waistMeasurementMax}
                    onChange={handleSelectChange}
                  >
                    {option?.waistMeasurementMax?.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="waistMeasurementMax">{allLanguageKey?.to}</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mb-4">
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="hipsMeasurementMin"
                    id="hipsMeasurementMin"
                    value={formData.hipsMeasurementMin}
                    onChange={handleSelectChange}
                  >
                    {option?.hipsMeasurementMin?.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="hipsMeasurementMin">{allLanguageKey?.hips_measurement}</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mb-4">
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="hipsMeasurementMax"
                    id="hipsMeasurementMax"
                    value={formData.hipsMeasurementMax}
                    onChange={handleSelectChange}
                  >
                    {option?.hipsMeasurementMax?.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="hipsMeasurementMax">{allLanguageKey?.to}</label>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PersonalFilter;
