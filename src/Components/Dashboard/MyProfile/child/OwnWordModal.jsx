import React, { useState, useEffect } from 'react';
import AuthUser from '../../../Authentication/AuthUser/AuthUser';
import toast from 'react-hot-toast';

const OwnWordModal = ({FetchProfileData,handleClose}) => {
  const { CallApi } = AuthUser();

  const [formData, setFormData] = useState({
    profileHeading: '',
    about: '',
    partnerPreference: '',
  });


  useEffect(() => {
    const fetchProfileData = async () => {
      const params={
        step:'own_words'
      }
      try {
        const response = await CallApi({
          api: '/profile_edit',
          method: 'GET',
          data:params
        });
        if (response && response.status === 1) {
          setFormData({
            profileHeading: response.profile_data.profileHeading || '',
            about: response.profile_data.about || '',
            partnerPreference: response.profile_data.partnerPreference || ''
           
          });

        } else {
          toast.error(response?.error?.name || 'Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data', error);
        toast.error('Failed to load profile data');
      }
    };

    fetchProfileData();
  }, []);

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
       step:'own_words'
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await CallApi({
        api: '/profile_update',
        method: 'UPLOAD',
        data: {...formData,
          step:'own_words'
        },
      });

      if (response && response.status === 1) {
        toast.success(response.msg || 'Profile data updated successfully');
        FetchProfileData();
        handleClose();
      } else {
        toast.error(response?.error?.step || 'Failed to update profile data');
      }
    } catch (error) {
      console.error('There was a problem with the submission:', error);
      toast.error('Failed to update profile data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-floating mb-4">
        <input
          id="heading"
          type="text"
          className="form-control"
          value={formData.profileHeading}
          name="profileHeading"
          placeholder=""
          onChange={handleChange}
        />
        <label htmlFor="heading">Heading</label>
      </div>

      <div className="form-floating mb-4">
        <textarea
          id="textarea1"
          className="form-control"
          name="about"
          placeholder=""
          style={{ minHeight: '85px' }}
          value={formData.about}
          onChange={handleChange}
        />
        <label htmlFor="textarea1">About me</label>
      </div>

      <div className="form-floating">
        <textarea
          id="textarea2"
          className="form-control"
          name="partnerPreference"
          placeholder=""
          style={{ minHeight: '85px' }}
          value={formData.partnerPreference}
          onChange={handleChange}
        />
        <label htmlFor="textarea2">What I prefer in my partner</label>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default OwnWordModal;
