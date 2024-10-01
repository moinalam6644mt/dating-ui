import React, { useState, useContext } from 'react';
import DateRange from './DateRange';
import AuthContext from '../../ContextApi/AuthProvider';


const SearchTripFilter = ({ FetchSearchList }) => {

  const [isFormVisible, setFormVisible] = useState(true);
  const { allLanguageKey } = useContext(AuthContext)
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [formData, setFormData] = useState({
    lookingFor: '',
    locationFrom: '',
    locationTo: '',
    dateRange: '',
    purpose: [],
    financeType: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => {
        const newPurpose = checked
          ? [...prevData.purpose, value]
          : prevData.purpose.filter((item) => item !== value);

        return { ...prevData, [name]: newPurpose };
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleDateChange = (range) => {
    setDateRange(range);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatDate = (date) => {
      if (!date) return '';
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const formattedDateRange = `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`;

    const queryParams = {
      looking_for: formData.lookingFor,
      location_addr_from: formData.locationFrom,
      location_addr_to: formData.locationTo,
      daterange: formattedDateRange,
      purpose: formData.purpose.join(','),
      financeType: formData.financeType,
    }

    FetchSearchList(queryParams);

  };

  return (
    <aside className="col-xl-3 col-lg-4 col-12">
      <div className="card">
        <div className="card-header d-flex align-items-center">
          <h4 className="mb-0">{allLanguageKey?.account_looking_for_trip}?</h4>
          <button
            className="btn btn-link ms-auto"
            type="button"
            onClick={() => setFormVisible(!isFormVisible)}
          >
            <i className={`bi ${isFormVisible ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
          </button>
        </div>
        <div className="card-body">
          <form id="searchTripForm" onSubmit={handleSubmit} className={isFormVisible ? '' : 'd-none'}>
            <div className="form-field mb-4">
              <label className="form-label d-block">I am Looking For</label>
              <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input
                  type="radio"
                  className="btn-check"
                  name="lookingFor"
                  id="lookng_for1"
                  value="1"
                  checked={formData.lookingFor === '1'}
                  onChange={handleChange}
                />
                <label className="btn btn-outline-primary" htmlFor="lookng_for1">
                  <i className="bi bi-gender-male"></i> {allLanguageKey?.male}
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="lookingFor"
                  id="lookng_for2"
                  value="2"
                  checked={formData.lookingFor === '2'}
                  onChange={handleChange}
                />
                <label className="btn btn-outline-primary" htmlFor="lookng_for2">
                  <i className="bi bi-gender-female"></i> {allLanguageKey?.female}
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="lookingFor"
                  id="lookng_for3"
                  value="3"
                  checked={formData.lookingFor === '3'}
                  onChange={handleChange}
                />
                <label className="btn btn-outline-primary" htmlFor="lookng_for3">
                  <i className="bi bi-person"></i> {allLanguageKey?.account_does_not_matter}
                </label>
              </div>
            </div>

            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control"
                name="locationFrom"
                id="location_addr_from"
                value={formData.locationFrom}
                onChange={handleChange}
                placeholder="Location from"
              />
              <label htmlFor="location_addr_from">{allLanguageKey?.account_location_from}</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control"
                name="locationTo"
                id="location_addr_to"
                value={formData.locationTo}
                onChange={handleChange}
                placeholder="Location to"
              />
              <label htmlFor="location_addr_to">{allLanguageKey?.account_location_to}</label>
            </div>

            <div className="form-floating mb-4">
              <DateRange value={dateRange} onChange={handleDateChange} />
            </div>

            <div className="form-field mb-4">
              <label className="form-label">{allLanguageKey?.account_travel_purpose}</label>
              <div className="tags-container mb-3">
                {['Beach Break', 'Business Trip', 'Cruise', 'Concert', 'Foodie Tour', 'Road Trip', 'Sport Sightseeing', 'Shopping Trip', 'Short/Weekend Break', 'Festive'].map((purpose, index) => (
                  <div className="tag" key={index}>
                    <input
                      type="checkbox"
                      id={`tag${index + 1}`}
                      value={index + 1}
                      name="purpose"
                      checked={formData.purpose.includes(`${index + 1}`)}
                      onChange={handleChange}
                    />
                    <label htmlFor={`tag${index + 1}`}>{purpose}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-field mb-4 g-grid">
              <label className="form-label">Finances</label>
              <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input
                  type="radio"
                  className="btn-check"
                  name="financeType"
                  id="btnradio1"
                  value="1"
                  checked={formData.financeType === '1'}
                  onChange={handleChange}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio1">
                {allLanguageKey?.account_person_pay}
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="financeType"
                  id="btnradio2"
                  value="2"
                  checked={formData.financeType === '2'}
                  onChange={handleChange}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio2">
                {allLanguageKey?.account_everyone_pay}
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="financeType"
                  id="btnradio3"
                  value="3"
                  checked={formData.financeType === '3'}
                  onChange={handleChange}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio3">
                {allLanguageKey?.account_like_someone}
                </label>
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">{allLanguageKey?.account_search_trip}</button>
            </div>
          </form>
        </div>
      </div>
    </aside>
  );
};

export default SearchTripFilter;
