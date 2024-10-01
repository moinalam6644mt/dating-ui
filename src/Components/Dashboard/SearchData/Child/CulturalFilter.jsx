import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../ContextApi/AuthProvider'; // Import the AuthContext
import '../../MyProfile/style/collapse.css';

const CulturalFilter = ({ setData, option }) => {
  const { allLanguageKey } = useContext(AuthContext); // Access the allLanguageKey
  const [openSection, setOpenSection] = useState(null);
  const [formData, setFormData] = useState({
    nationality: [],
    education: '-1',
    language: [],
    englishAbility: '-1',
    religion: '-1',
    starSign: []
  });

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      cultural: formData
    }));
  }, [formData, setData]);

  const handleSectionToggle = (section) => {
    setOpenSection(prevSection => (prevSection === section ? null : section));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name], value]
        : prevData[name].filter(item => item !== value)
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const renderCheckboxGroup = (label, name, options) => (
    <li key={name}>
      <div className="collapsible-header" onClick={() => handleSectionToggle(name)}>
        <i className="material-icons down">arrow_drop_down</i>
        {label}
      </div>
      <div className={`collapsible-body ${openSection === name ? 'show' : ''}`}>
        {options?.map(item => (
          <div key={item.item_id} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`${name}_${item.item_id}`}
              name={name}
              value={item.item_id}
              checked={formData[name]?.includes(item.item_id)}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={`${name}_${item.item_id}`}>
              {item.item}
            </label>
          </div>
        ))}
      </div>
    </li>
  );

  const renderSelectGroup = (label, name, options) => (
    <li key={name}>
      <div className="collapsible-header" onClick={() => handleSectionToggle(name)}>
        <i className="material-icons down">arrow_drop_down</i>
        {label}
      </div>
      <div className={`collapsible-body ${openSection === name ? 'show' : ''}`}>
        <div className="form-floating">
          <select 
            className="form-select" 
            name={name} 
            id={name}
            value={formData[name]}
            onChange={handleSelectChange}
          >
            {options?.map(option => (
              <option key={option.item_id} value={option.item_id}>
                {option.item}
              </option>
            ))}
          </select>
          <label htmlFor={name}>{label}</label>
        </div>
      </div>
    </li>
  );

  return (
    <div>
      <h4 className="mb-3"><b>{allLanguageKey?.culturalFilters ||'Cultural Value '}</b></h4>
      <ul className="collapsible" data-collapsible="accordion">
        {renderCheckboxGroup(allLanguageKey?.nationality, 'nationality', option?.nationality)}
        {renderSelectGroup(allLanguageKey?.qualification, 'education', option?.education)}
        {renderCheckboxGroup(allLanguageKey?.communicationLanguage, 'language', option?.language)}
        {renderSelectGroup(allLanguageKey?.languageAbility, 'englishAbility', option?.englishAbility)}
        {renderSelectGroup(allLanguageKey?.religion, 'religion', option?.religion)}
        {renderCheckboxGroup(allLanguageKey?.starSign, 'starSign', option?.starSign)}
      </ul>
    </div>
  );
};

export default CulturalFilter;
