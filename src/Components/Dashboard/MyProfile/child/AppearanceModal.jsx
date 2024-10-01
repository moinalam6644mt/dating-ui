import React, { useState, useEffect } from 'react';
import AuthUser from '../../../Authentication/AuthUser/AuthUser';
import toast from 'react-hot-toast';

const AppearanceModal = ({handleClose ,FetchProfileData}) => {
  const { CallApi } = AuthUser();
  
  const [formData, setFormData] = useState({});
  const [options, setOptions] = useState({
    hairColor: [],
    hairLength: [],
    hairType: [],
    eyeColor: [],
    eyeWear: [],
    height: [],
    weight: [],
    bodyType: [],
    ethnicity: [],
    facialHair: [],
    bestFeature: [],
    bodyArt: [],
    appearance: [],
    
  });

  const FetchAppearanceData = async () => {
    const params={
      step:'appearance'
    }
    try {
      const response = await CallApi({
        api: `/profile_edit`,
        method: 'GET',
        data:params
      });
      if (response && response.status===1) {
        setOptions(response.options);
        setFormData(response.profile_data);
      } else {
        toast.error(response?.error?.name || 'Failed to fetch appearance data');
      }
    } catch (error) {
      console.error('Error fetching appearance data', error);
      toast.error('Failed to load appearance options');
    }
  };

  useEffect(() => {
    FetchAppearanceData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await CallApi({
        api: '/profile_update',
        method: 'UPLOAD',
        data: {...formData,
          step:'appearance'
        },
      });

      if (response && response.status === 1) {
        toast.success(response.msg || 'Appearance data updated successfully');
        FetchProfileData();
        handleClose();
      } else {
        toast.error(response?.error?.step || 'Failed to update appearance data');
      }
    } catch (error) {
      console.error('There was a problem with the submission:', error);
      toast.error('Failed to update appearance data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(options).map((key) => (
        <div className="form-floating mb-4" key={key}>
          <select
            className="form-select"
            name={key}
            id={key}
            value={formData[key] || ''}
            onChange={handleChange}
          >
            <option value="">Choose {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</option>
            {options[key]?.map((option) => (
              <option key={option.item_id} value={option.item_id}>
                {option.item}
              </option>
            ))}
          </select>
          <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</label>
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AppearanceModal;

