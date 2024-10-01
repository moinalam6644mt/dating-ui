import React, { useState, useEffect, useContext } from "react";
import AuthContext from '../../../ContextApi/AuthProvider';

const AppearanceFilter = ({ data, setData, option }) => {
  const { allLanguageKey } = useContext(AuthContext);
  const [openSection, setOpenSection] = useState(null);
  const [formData, setFormData] = useState({
    minHeight: '-1',
    maxHeight: '-1',
    minWeight: '-1',
    maxWeight: '-1',
    bodyType: [],
    ethnicity: [],
    apperance: [],
    hairColor: [],
    hairLength: [],
    eyeColor: [],
    eyeWear: [],
    bestFeature: [],
    bodyArt: [],
    height: [],
  });

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      appearance: formData
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
    <li>
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

  return (
    <div>
      <h4 className="mb-3"><b>{allLanguageKey?.appearance}</b></h4>
      <ul className="collapsible" data-collapsible="accordion">
        <li>
          <div className="collapsible-header" onClick={() => handleSectionToggle('bodyFigure')}>
            <i className="material-icons down">arrow_drop_down</i>
            {allLanguageKey?.bodyFigure}
          </div>
          <div className={`collapsible-body ${openSection === 'bodyFigure' ? 'show' : ''}`}>
            <div className="row gx-3">
              <div className="col-md-6 col-sm-12 mb-4">
                <div className="form-floating">
                  <select 
                    className="form-select" 
                    name="minHeight" 
                    id="minHeight"
                    value={formData.minHeight}
                    onChange={handleSelectChange}
                  >
                    {option?.height?.map((item) => (
                      <option key={item.item_id} value={item.item_id}>
                        {item.item}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="minHeight">{allLanguageKey?.heightFrom}</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mb-4">
                <div className="form-floating">
                  <select 
                    className="form-select" 
                    name="maxHeight" 
                    id="maxHeight"
                    value={formData.maxHeight}
                    onChange={handleSelectChange}
                  >
                    {option?.height?.map((item) => (
                      <option key={item.item_id} value={item.item_id}>
                        {item.item}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="maxHeight">{allLanguageKey?.to}</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mb-4">
                <div className="form-floating">
                  <select 
                    className="form-select" 
                    name="minWeight" 
                    id="minWeight"
                    value={formData.minWeight}
                    onChange={handleSelectChange}
                  >
                    {option?.weight?.map((item) => (
                      <option key={item.item_id} value={item.item_id}>
                        {item.item}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="minWeight">{allLanguageKey?.weightFrom}</label>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mb-4">
                <div className="form-floating">
                  <select 
                    className="form-select" 
                    name="maxWeight" 
                    id="maxWeight"
                    value={formData.maxWeight}
                    onChange={handleSelectChange}
                  >
                    {option?.weight?.map((item) => (
                      <option key={item.item_id} value={item.item_id}>
                        {item.item}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="maxWeight">{allLanguageKey?.to}</label>
                </div>
              </div>
            </div>
          </div>
        </li>

        {renderCheckboxGroup(allLanguageKey?.body_type, 'bodyType', option?.bodyType)}
        {renderCheckboxGroup(allLanguageKey?.ethnicity, 'ethnicity', option?.ethnicity)}
        {renderCheckboxGroup(allLanguageKey?.appearance, 'apperance', option?.apperance)}
        {renderCheckboxGroup(allLanguageKey?.hair_color, 'hairColor', option?.hairColor)}
        {renderCheckboxGroup(allLanguageKey?.hair_length, 'hairLength', option?.hairLength)}
        {renderCheckboxGroup(allLanguageKey?.eye_color, 'eyeColor', option?.eyeColor)}
        {renderCheckboxGroup(allLanguageKey?.eye_wear, 'eyeWear', option?.eyeWear)}
        {renderCheckboxGroup(allLanguageKey?.best_feature, 'bestFeature', option?.bestFeature)}
        {renderCheckboxGroup(allLanguageKey?.body_art, 'bodyArt', option?.bodyArt)}
      </ul>
    </div>
  );
};

export default AppearanceFilter;
