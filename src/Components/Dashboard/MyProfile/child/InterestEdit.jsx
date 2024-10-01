import React, { useEffect, useState } from 'react';
import '../style/collapse.css'
import AuthUser from '../../../Authentication/AuthUser/AuthUser';
import toast from 'react-hot-toast';

const InterestEdit = () => {
  const { CallApi } = AuthUser();
  const [formData, setFormData] = useState({
    entertainment: [],
    foodCategory: [],
    musicType: [],
    sportsType: []
  });

  const [openSection, setOpenSection] = useState(null);
  const [options, setOptions] = useState({
    entertainment: [],
    foodCategory: [],
    musicType: [],
    sportsType: []
  });

  useEffect(() => {
    FetchInterestData();
  }, []);

  const handleCheckboxChange = (category, value) => {
    setFormData(prevData => {
      const currentValues = new Set(prevData[category]);
      if (currentValues.has(value)) {
        currentValues.delete(value);
      } else {
        currentValues.add(value);
      }
      return { ...prevData, [category]: Array.from(currentValues) };
    });
  };

  const handleSectionToggle = (section) => {
    setOpenSection(prevSection => (prevSection === section ? null : section));
  };

  const FetchInterestData = async () => {
    try {
      const response = await CallApi({
        api: '/profileInterest',
        method: 'GET',
      });

      if (response && response.status === 1) {
        setOptions(response.options);
        setFormData(response.interest_data);
      } else {
        toast.error(response.message || 'Failed to load data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await CallApi({
        api: '/profileInterestSave',
        method: 'UPLOAD',
        data: formData
      });

      if (response && response.status === 1) {
        toast.success('Interests updated successfully');
      } else {
        toast.error(response.message || 'Failed to update interests');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to update interests');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="hidden" id="defaultsubmitbypostinterest" name="defaultsubmitbypostinterest" value="defaultsubmitbypostinterest" />
        <h4><b>Edit Hobbies & Interests</b></h4>
        <ul className="collapsible" data-collapsible="accordion">
          {/* Entertainment */}
          <li>
            <div className="collapsible-header" onClick={() => handleSectionToggle('entertainment')}>
              <i className="material-icons down">arrow_drop_down</i>
              What do you do for fun / entertainment?
            </div>
            <div className={`collapsible-body ${openSection === 'entertainment' ? 'show' : ''}`}>
              <div className="effect-from-s">
                {options.entertainment.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`entertainment_${item?.item_id}`}
                      name="entertainment"
                      value={item?.item_id}
                      checked={formData?.entertainment.includes(String(item?.item_id))}
                      onChange={() => handleCheckboxChange('entertainment', String(item?.item_id))}
                    />
                    <label htmlFor={`entertainment_${item?.item_id}`} className="form-check-label">
                      {item?.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          {/* Food Category */}
          <li>
            <div className="collapsible-header" onClick={() => handleSectionToggle('foodCategory')}>
              <i className="material-icons down">arrow_drop_down</i>
              What sort of food do you like?
            </div>
            <div className={`collapsible-body ${openSection === 'foodCategory' ? 'show' : ''}`}>
              <div className="effect-from-s">
                {options.foodCategory.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`foodCategory_${item?.item_id}`}
                      name="foodCategory"
                      value={item?.item_id}
                      checked={formData.foodCategory.includes(String(item?.item_id))}
                      onChange={() => handleCheckboxChange('foodCategory', String(item?.item_id))}
                    />
                    <label htmlFor={`foodCategory_${item?.item_id}`} className="form-check-label">
                      {item?.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          {/* Music Type */}
          <li>
            <div className="collapsible-header" onClick={() => handleSectionToggle('musicType')}>
              <i className="material-icons down">arrow_drop_down</i>
              What sort of music are you into?
            </div>
            <div className={`collapsible-body ${openSection === 'musicType' ? 'show' : ''}`}>
              <div className="effect-from-s">
                {options.musicType.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`musicType_${item?.item_id}`}
                      name="musicType"
                      value={item?.item_id}
                      checked={formData?.musicType.includes(String(item?.item_id))}
                      onChange={() => handleCheckboxChange('musicType', String(item?.item_id))}
                    />
                    <label htmlFor={`musicType_${item?.item_id}`} className="form-check-label">
                      {item?.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
          {/* Sports Type */}
          <li>
            <div className="collapsible-header" onClick={() => handleSectionToggle('sportsType')}>
              <i className="material-icons down">arrow_drop_down</i>
              What sports do you play or like to watch?
            </div>
            <div className={`collapsible-body ${openSection === 'sportsType' ? 'show' : ''}`}>
              <div className="effect-from-s">
                {options.sportsType.map((item, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`sportsType_${item?.item_id}`}
                      name="sportsType"
                      value={item?.item_id}
                      checked={formData?.sportsType.includes(String(item?.item_id))}
                      onChange={() => handleCheckboxChange('sportsType', String(item?.item_id))}
                    />
                    <label htmlFor={`sportsType_${item.item_id}`} className="form-check-label">
                      {item?.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </li>
        </ul>
        <div className="d-grid d-md-block">
          <button className="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default InterestEdit;
