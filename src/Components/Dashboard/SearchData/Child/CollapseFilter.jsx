import React, { useEffect, useState } from 'react';

const CollapseFilter = ({ setData }) => {
  const [openSection, setOpenSection] = useState(null);
  const [formData, setFormData] = useState({
    minHeight: '-1',
    maxHeight: '-1',
    bodyType: [],
  });

  // Update the parent's data whenever formData changes
  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      collapse: formData
    }));
  }, [formData, setData]);

  const toggleSection = (section) => {
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
    const { value, checked } = e.target;
    setFormData(prevData => {
      const updatedBodyType = checked
        ? [...prevData.bodyType, value]
        : prevData.bodyType.filter(item => item !== value);

      return {
        ...prevData,
        bodyType: updatedBodyType
      };
    });
  };

  return (
    <ul className="collapsible">
      <li>
        <div className="collapsible-header" onClick={() => toggleSection(1)}>
          <i className="material-icons down">arrow_drop_down</i> Body figure
        </div>
        {openSection === 1 && (
          <div className="collapsible-body">
            <div className="row gx-3">
              <div className="col-6">
                <div className="form-floating mb-4">
                  <select
                    className="form-select"
                    name="minHeight"
                    id="minHeight"
                    value={formData.minHeight}
                    onChange={handleSelectChange}
                  >
                    <option value="-1">Any</option>
                    <option value="4">4'10"</option>
                    <option value="7">4'11"</option>
                    <option value="1">4'7"</option>
                    <option value="35">7'3"</option>
                    {/* Add remaining options */}
                  </select>
                  <label htmlFor="minHeight">Height from</label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-floating mb-4">
                  <select
                    className="form-select"
                    name="maxHeight"
                    id="maxHeight"
                    value={formData.maxHeight}
                    onChange={handleSelectChange}
                  >
                    <option value="-1">Any</option>
                    <option value="34">7'2"</option>
                    <option value="36">7'4"</option>
                    {/* Add remaining options */}
                  </select>
                  <label htmlFor="maxHeight">To</label>
                </div>
              </div>
              {/* Additional fields for weight, etc. */}
            </div>
          </div>
        )}
      </li>

      <li>
        <div className="collapsible-header" onClick={() => toggleSection(2)}>
          <i className="material-icons down">arrow_drop_down</i> Body type
        </div>
        {openSection === 2 && (
          <div className="collapsible-body">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="bodyType_any"
                value="-1"
                checked={formData.bodyType.includes('-1')}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="bodyType_any">Any</label>
            </div>
            {/* Additional body type checkboxes */}
          </div>
        )}
      </li>

      {/* Repeat for other collapsible sections like ethnicity, appearance, etc. */}
    </ul>
  );
};

export default CollapseFilter;
