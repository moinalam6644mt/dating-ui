import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../ContextApi/AuthProvider'; // Import the AuthContext
import '../../MyProfile/style/collapse.css';

const LifeStyleFilter = ({ data, setData, option }) => {
  const { allLanguageKey } = useContext(AuthContext); // Access the allLanguageKey
  const [openSection, setOpenSection] = useState(null);
  const [formData, setFormData] = useState({
    drink: [],
    smoke: [],
    willingToRelocate: [],
    maritalStatus: [],
    children: [],
    occupation: [],
    employmentStatus: [],
    homeType: [],
    livingSituation: [],
    income: '-1', // Use string to represent select value
  });

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      lifestyle: formData // Update key to 'lifestyle' for consistency
    }));
  }, [formData, setData]);

  const handleSectionToggle = (section) => {
    setOpenSection(prevSection => (prevSection === section ? null : section));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prevData => {
      const updatedArray = checked
        ? [...prevData[name], value]
        : prevData[name].filter(item => item !== value);

      return {
        ...prevData,
        [name]: updatedArray
      };
    });
  };

  const renderCheckboxGroup = (label, key, options) => (
    <li key={key}>
      <div className="collapsible-header" onClick={() => handleSectionToggle(key)}>
        <i className="material-icons down">arrow_drop_down</i>
        {label}
      </div>
      <div className={`collapsible-body ${openSection === key ? 'show' : ''}`}>
        {options?.map((item) => (
          <div className="form-check" key={item.item_id}>
            <input
              type="checkbox"
              className="form-check-input"
              id={`${key}_${item.item_id}`}
              name={key}
              value={item.item_id}
              checked={formData[key].includes(item.item_id)}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={`${key}_${item.item_id}`}>
              {item.item}
            </label>
          </div>
        ))}
      </div>
    </li>
  );

  const renderSelectGroup = (label, key, options) => (
    <li key={key}>
      <div className="collapsible-header" onClick={() => handleSectionToggle(key)}>
        <i className="material-icons down">arrow_drop_down</i>
        {label}
      </div>
      <div className={`collapsible-body ${openSection === key ? 'show' : ''}`}>
        <div className="form-floating">
          <select
            className="form-select"
            name={key}
            value={formData[key]}
            onChange={handleSelectChange}
          >
            {options?.map((item) => (
              <option key={item.item_id} value={item.item_id}>
                {item.item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </li>
  );

  return (
    <div>
      <h4 className="mb-3"><b>{allLanguageKey?.lifestyleFilters ||'LifeStyle '}</b></h4>
      <ul className="collapsible" data-collapsible="accordion">
        {renderCheckboxGroup(allLanguageKey?.smokeQuestion, 'smoke', option?.smoke)}
        {renderCheckboxGroup(allLanguageKey?.drinkQuestion, 'drink', option?.drink)}
        {renderCheckboxGroup(allLanguageKey?.willingToRelocate, 'willingToRelocate', option?.willingToRelocate)}
        {renderCheckboxGroup(allLanguageKey?.maritalStatus, 'maritalStatus', option?.maritalStatus)}
        {renderCheckboxGroup(allLanguageKey?.childrenQuestion, 'children', option?.children)}
        {renderCheckboxGroup(allLanguageKey?.occupation, 'occupation', option?.occupation)}
        {renderCheckboxGroup(allLanguageKey?.employmentStatus, 'employmentStatus', option?.employmentStatus)}
        {renderCheckboxGroup(allLanguageKey?.homeType, 'homeType', option?.homeType)}
        {renderCheckboxGroup(allLanguageKey?.livingSituation, 'livingSituation', option?.livingSituation)}
        {renderSelectGroup(allLanguageKey?.annualIncome, 'income', option?.income)}
      </ul>
    </div>
  );
};

export default LifeStyleFilter;
