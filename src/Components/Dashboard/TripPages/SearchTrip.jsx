import React, { useEffect, useState , useContext } from 'react';
import SearchTripFilter from './SearchTripFilter';
import { Link } from 'react-router-dom';
import AuthUser from '../../Authentication/AuthUser/AuthUser';
import toast from 'react-hot-toast';
import AuthContext from '../../ContextApi/AuthProvider';

const SearchTrip = () => {
  const { CallApi } = AuthUser();
  const {allLanguageKey} =useContext(AuthContext)
  const [tripList, setTripList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const LIMIT = 20;

  useEffect(() => {
    FetchSearchList();
  }, []);

  const FetchSearchList = async (queryParams = {}, loadMore = false) => {
    setIsLoading(true);
    
    try {
      const response = await CallApi({
        api: '/search_trips',
        method: 'UPLOAD',
        data: {
          filterData:JSON.stringify(queryParams),
        }
      });

      if (response && response.status === 1) {
        const fetchedTrips = response.trip_list;
        setTripList((prevTrips) => loadMore ? [...prevTrips, ...fetchedTrips] : fetchedTrips);
        setOffset((prevOffset) => prevOffset + LIMIT);
        setHasMore(fetchedTrips.length === LIMIT);
      } else {
        toast.error('No trips found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch trips');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterSubmit = (filterData) => {
    setOffset(0);
    setHasMore(true);
    FetchSearchList(filterData);
  };

  const handleLoadMore = () => {
    FetchSearchList({}, true);
  };

  return (
    <div className="dashboard-content-inner">
      <div className="row">
        <aside className="col-xl-9 col-lg-8 col-12">
          <div id="trips_container" className="allUser">
            {tripList.length > 0 ? (
              tripList.map((trip) => (
                <div key={trip.trip_id} className="d-flex border-box mb-3">
                  <div className="flex-shrink-0 me-3">
                    <img
                      src={trip.profile_pic}
                      height="64"
                      width="64"
                      alt={`${trip.name}'s profile`}
                      className="rounded-circle"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-lg-flex justify-content-between">
                      <h4 className="title-name">
                        <Link to={`/public-profile/${trip.user_id}`}>
                          {trip.name}
                        </Link>
                        {trip.doc_verify_status === 'Y' && (
                          <span className="verify">
                            <img
                              src="https://truetiesdating.com/assets/images/verified.png"
                              alt="Verified"
                              height="24"
                              width="24"
                            />
                          </span>
                        )}
                      </h4>
                      <p className="mb-2 text-muted">
                        <i className="bi bi-calendar-range"></i> {trip.from_date} - {trip.to_date}
                      </p>
                    </div>
                    <p className="mb-2">
                      <i className="bi bi-geo-alt"></i> {trip.from_city}, {trip.from_country}{' '}
                      <i className="bi bi-arrow-right"></i> {trip.to_city || 'Unknown'}, {trip.to_country}
                    </p>
                    <p className="card-text">{trip.note}</p>
                    <div className="task-tags mb-2">
                      {trip.purpose.map((p, index) => (
                        <span key={index} className="task-tags mb-2">
                          {p.purpose_id}
                        </span>
                      ))}
                    </div>
                    <div className="d-flex">
                      <Link to={`/trip-details/${trip.trip_id}`} className="btn btn-primary btn-sm">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div id="card-alert" className="not-result-found">
                <div className="noavatar">
                  <img
                    src="https://truetiesdating.com/assets/images/icon-girl.png"
                    alt=""
                    height="84"
                    width="84"
                  />
                </div>
                <h3>No Trip found</h3>
                <p className="mx-auto">
                  Don't worry, we have so many trips, there are bound to be many people interested in you. The best way to increase your chance of receiving interest is to add a photo.
                </p>
                <a className="btn btn-outline-primary">Get Matches</a>
              </div>
            )}

            {hasMore && (
              <div className="text-center mb-3" id="load_more_trips">
                <button onClick={handleLoadMore} className="btn btn-primary" disabled={isLoading}>
                {allLanguageKey?.load_more}
                </button>
              </div>
            )}

            <div className="text-end mb-3">
              <Link to="/add-trip" className="btn btn-outline-primary" style={{ minWidth: '150px' }}>
              {allLanguageKey?.account_add_trip}
              </Link>
            </div>
          </div>
        </aside>

        <SearchTripFilter FetchSearchList={handleFilterSubmit} />
      </div>
    </div>
  );
};

export default SearchTrip;
