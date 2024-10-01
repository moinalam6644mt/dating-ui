import React, { useState, useEffect } from 'react';
import AuthUser from '../../../Authentication/AuthUser/AuthUser';
import toast from 'react-hot-toast';

const LifeStyleModal = ({ handleClose, FetchProfileData }) => {
  const { CallApi } = AuthUser();

  const [formData, setFormData] = useState({
    contactNo: '',
    viverId: '',
    skypeId: '',
    facebookId: '',
    step: 'contacts'
  });
  
  const FetchContactsData = async () => {
    const params={
      step:'contacts'
    }
    try {
      const response = await CallApi({
        api: `/profile_edit`,
        method: 'GET',
        data:params
      });
      if (response && response.status === 1) {
        setFormData((prevData) => ({
          ...prevData,
          ...response.profile_data,
        }));
      } else {
        toast.error(response?.error?.name || 'Failed to fetch contacts data');
      }
    } catch (error) {
      console.error('Error fetching contacts data', error);
      toast.error('Failed to load contacts data');
    }
  };
  useEffect(() => {
    FetchContactsData();
  }, []);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await CallApi({
        api: '/profile_update',
        method: 'UPLOAD',
        data: formData,
      });

      if (response && response.status === 1) {
        toast.success(response.msg || 'Contacts data updated successfully');
        handleClose();
        FetchProfileData();
      } else {
        toast.error(response?.error?.step || 'Failed to update contacts data');
      }
    } catch (error) {
      console.error('There was a problem with the submission:', error);
      toast.error('Failed to update contacts data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-floating mb-4">
        <input
          type="text"
          className="form-control"
          name="contactNo"
          id="contactNo"
          value={formData.contactNo || ''}
          onChange={handleChange}
          placeholder="Contact Number"
        />
        <label htmlFor="contactNo">Contact Number</label>
      </div>
      <div className="form-floating mb-4">
        <input
          type="text"
          className="form-control"
          name="viverId"
          id="viverId"
          value={formData.viverId || ''}
          onChange={handleChange}
          placeholder="Viver ID"
        />
        <label htmlFor="viverId">Viver ID</label>
      </div>
      <div className="form-floating mb-4">
        <input
          type="text"
          className="form-control"
          name="skypeId"
          id="skypeId"
          value={formData.skypeId || ''}
          onChange={handleChange}
          placeholder="Skype ID"
        />
        <label htmlFor="skypeId">Skype ID</label>
      </div>
      <div className="form-floating mb-4">
        <input
          type="text"
          className="form-control"
          name="facebookId"
          id="facebookId"
          value={formData.facebookId || ''}
          onChange={handleChange}
          placeholder="Facebook ID"
        />
        <label htmlFor="facebookId">Facebook ID</label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LifeStyleModal;
