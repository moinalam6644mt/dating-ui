import React, { useState, useEffect } from 'react';
import AuthUser from '../../../Authentication/AuthUser/AuthUser';
import toast from 'react-hot-toast';

const LifeStyleModal = ({handleClose ,FetchProfileData}) => {
  const { CallApi } = AuthUser();
  
  // Initial state with 'step' included
  const [formData, setFormData] = useState({});
  const [options, setOptions] = useState({
    nationality: [],
    education: [],
    religion: [],
    starSign: [],
  });

  // Fetch lifestyle data from the API
  const FetchCulturalData = async () => {
    const params={
      step:'background'
    }
    try {
      const response = await CallApi({
        api: `/profile_edit`,
        method: 'GET',
        data:params
      });
      if (response && response.status===1) {
        setOptions(response.options);
        setFormData((prevData) => ({
          ...prevData,
          ...response.profile_data,
        }));
       
      } else {
        toast.error(response?.error?.name || 'Failed to fetch background data');
      }
    } catch (error) {
      console.error('Error fetching background data', error);
      toast.error('Failed to load background options');
    }
  };

  useEffect(() => {
    FetchCulturalData();
  }, []);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      step: 'background' 
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await CallApi({
        api: '/profile_update',
        method: 'UPLOAD',
        data: {
          ...formData,
          step: 'background' 
        },
      });

      if (response && response.status === 1) {
        toast.success(response.msg || 'Background data updated successfully');
        handleClose();
        FetchProfileData();
      } else {
        toast.error(response?.error?.step || 'Failed to update Background data');
      }
    } catch (error) {
      console.error('There was a problem with the submission:', error);
      toast.error('Failed to update Background data');
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
            {options[key].map((option) => (
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

export default LifeStyleModal;
