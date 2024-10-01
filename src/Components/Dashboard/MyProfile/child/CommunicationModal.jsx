import React, { useState, useEffect } from 'react';
import AuthUser from '../../../Authentication/AuthUser/AuthUser';
import toast from 'react-hot-toast';

const CommunicationModal = ({ handleClose, FetchProfileData, profileData }) => {
  const { CallApi } = AuthUser();

  const [formData, setFormData] = useState(
    profileData?.communication_language?.length
      ? profileData.communication_language.map((lang) => ({
          language: lang.language_id,
          ability: lang.ability_id
        }))
      : [{ language: '', ability: '' }]
  );

  const [options, setOptions] = useState({
    language: [],
    englishAbility: [],
  });

  // Fetch communication data from the API
  const FetchCommunicationData = async () => {
    const params = {
      step: 'communication_language'
    };
    try {
      const response = await CallApi({
        api: '/profile_edit',
        method: 'GET',
        data: params
      });
      if (response && response.status === 1) {
        setOptions(response.options);
      } else {
        toast.error(response?.error?.name || 'Failed to fetch communication data');
      }
    } catch (error) {
      console.error('Error fetching communication data', error);
      toast.error('Failed to load communication language options');
    }
  };

  useEffect(() => {
    FetchCommunicationData();
  }, []);

  // Handle form field changes for language and ability
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFormData = [...formData];
    updatedFormData[index][name] = value;
    setFormData(updatedFormData);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await CallApi({
        api: '/profile_update',
        method: 'UPLOAD', // Assuming 'UPLOAD' was a mistake
        data: {
          'communication_languages': JSON.stringify(formData),
          step: 'communication_language'
        }
      });

      if (response && response.status === 1) {
        toast.success(response.msg || 'Communication languages updated successfully');
        handleClose();
        FetchProfileData();
      } else {
        toast.error(response?.error?.step || 'Failed to update communication languages');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      toast.error('Failed to update communication languages');
    }
  };

  // Add a new language-ability pair
  const addLanguageAbility = () => {
    setFormData([...formData, { language: '', ability: '' }]);
  };

  // Remove a language-ability pair
  const removeLanguageAbility = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="input-fields">
        {formData.map((field, index) => (
          <div className="form-group row d-flex input-row" key={index}>
            <div className="col-md-6 col-xs-12">
              <label htmlFor={`language_${index}`}>Language</label>
              <select
                className="form-control"
                name="language"
                id={`language_${index}`}
                value={field.language}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="">Select language</option>
                {options?.language?.map((option) => (
                  <option key={option.language_id} value={option.language_id}>
                    {option.language}
                  </option>
                ))}
              </select>
              <span id={`language_match_${index}Error`} className="text-danger"></span>
            </div>
            <div className="col-md col-xs-12">
              <label htmlFor={`ability_${index}`}>Ability</label>
              <select
                className="form-control"
                name="ability"
                id={`ability_${index}`}
                value={field.ability}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="">Select ability</option>
                {options?.englishAbility?.map((option) => (
                  <option key={option.item_id} value={option.item_id}>
                    {option.item}
                  </option>
                ))}
              </select>
              <span id={`ability_${index}Error`} className="text-danger"></span>
            </div>
            <div className="col-md-auto col-xs-12">
              <label className="d-block"> </label>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeLanguageAbility(index)}
              >
                Delete
                <i className="fa fa-trash" title="Remove"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="btn btn-primary" onClick={addLanguageAbility}>
        Add More
      </button>
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
};

export default CommunicationModal;
