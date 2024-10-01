import React, { useState, useEffect } from 'react';
import AuthUser from '../../../Authentication/AuthUser/AuthUser';
import toast from 'react-hot-toast';

const BasicModal = ({handleClose ,FetchProfileData}) => {
  const { CallApi } = AuthUser();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [countryLive, setCountryLive] = useState('');
  const [stateLive, setStateLive] = useState('');
  const [cityLive, setCityLive] = useState('');

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    FetchBasicData();
  }, []);
  
  const FetchBasicData = async () => {
    const params = {
      step: 'basic'
    };
    try {
      const response = await CallApi({
        api: `/profile_edit`,
        method: 'GET',
        data: params
      });
      if (response && response.status === 1) {
        const profileData = response.profile_data;
        setName(profileData.name || '');
        setGender(profileData.gender || '');
        setDob(profileData.dob || '');
        setCountryLive(profileData?.countryLive || '');
        setStateLive(profileData?.stateLive || '');
        setCityLive(profileData?.cityLive || '');
        setCountries(response?.countries || []);
        
        if (profileData?.countryLive) {
          await fetchStates(profileData.countryLive);
        }
        if (profileData?.stateLive) {
          await fetchCities(profileData.stateLive);
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error fetching profile data', error);
      toast.error('Data not found');
    }
  };
  
  const handleCountryChange = async (event) => {
    const selectedCountry = event.target.value;
    setCountryLive(selectedCountry);
    setStateLive('');
    setCities([]); // Reset cities when the country changes
    await fetchStates(selectedCountry);
  };
  
  const handleStateChange = async (event) => {
    const selectedState = event.target.value;
    setStateLive(selectedState);
    setCityLive('');
    await fetchCities(selectedState); // Fetch cities when state changes
  };
  

  const fetchStates = async (countryId) => {
    try {
      const response = await CallApi({
        api: `/getState/${countryId}`,
        method: 'GET',
      });
      setStates(response.states || []);
    } catch (error) {
      console.error('Error fetching states', error);
      toast.error('States not found');
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const response = await CallApi({
        api: `/getCity/${stateId}`,
        method: 'GET',
      });
      setCities(response.cities || []);
    } catch (error) {
      console.error('Error fetching cities', error);
      toast.error('Cities not found');
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const formdata = {
      name,
      gender,
      dob,
      countryLive,
      stateLive,
      cityLive,
      step:'basic'
    };

    let response;
    try {
       response = await CallApi({
        api: `/profile_update`,
        method: 'UPLOAD',
        data:formdata,
      });
      if(response &&response.status===1){
      toast.success(response.msg ||"Data update Successfully")
      handleClose();
      FetchProfileData();
      }else{
        toast.error(response?.error?.name)
      }
    } catch (error) {
      console.error('Error fetching cities', error);
      toast.error('Cities not found');
    }
    }


  return (
    <div>
      <div className="form-floating mb-4">
        <input
          id="name"
          type="text"
          className="form-control"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <label htmlFor="name">Name</label>
      </div>

      <div className="form-floating mb-4">
        <select
          className="form-select"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <label htmlFor="gender">I'm a</label>
      </div>

      <div className="form-floating mb-4">
        <input
          id="dob"
          type="date"
          name="dob"
          className="form-control"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <label htmlFor="dob">Date of Birth</label>
      </div>

      <div className="form-floating mb-4">
        <select
          className="form-select"
          name="countryLive"
          value={countryLive}
          onChange={handleCountryChange}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.country_id} value={country.country_id}>
              {country.country}
            </option>
          ))}
        </select>
        <label htmlFor="countryLive">Country</label>
      </div>

      <div className="form-floating mb-4">
        <select
          className="form-select"
          name="stateLive"
          value={stateLive}
          onChange={handleStateChange}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.state_id} value={state.state_id}>
              {state.state}
            </option>
          ))}
        </select>
        <label htmlFor="stateLive">State</label>
      </div>

      <div className="form-floating mb-4">
        <select
          className="form-select"
          name="cityLive"
          value={cityLive}
          onChange={(e) => setCityLive(e.target.value)}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.city_id} value={city.city_id}>
              {city.city}
            </option>
          ))}
        </select>
        <label htmlFor="cityLive">City</label>
      </div>

      <button onClick={handleSubmit} className="btn btn-primary">
        Submit
      </button>
    </div>
  );
};

export default BasicModal;
