import React, { useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import AuthUser from '../../Authentication/AuthUser/AuthUser';
import { Link } from 'react-router-dom';
import AuthContext from '../../ContextApi/AuthProvider';

const TheirFavourite = () => {
  const { CallApi } = AuthUser();
const {allLanguageKey} =useContext(AuthContext)
  const [favData, setFavData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [picLink, setPicLink] = useState('');
  const [Fimage, setFimage] = useState('');
  const [Mimage, setMimage] = useState('');
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false); 

  useEffect(() => {
    FetchFavouriteData();
  }, [page]);

  const FetchFavouriteData = async () => {
    if (loadingMore) return;

    setLoading(page === 1);
    setLoadingMore(page > 1);

    try {
      const response = await CallApi({
        api: `/favourite_me`,
        method: 'GET',
        data:{
          per_page:page
        }
      });

      if (response) {
        if (response.fav_users.length === 0) {
          setNoMoreData(true);
        }
        setFavData((prevData) => [...prevData, ...response.fav_users]);
        setPicLink(response.pic_link || '');
        setFimage(response.f_image || '');
        setMimage(response.m_image || '');
      } else {
        toast.error(response.error || 'Failed to load favorite users.');
      }
    } catch (error) {
      toast.error('An error occurred while fetching favorite users.');
      console.error('FetchFavouriteData Error:', error);
      setNoMoreData(true); 
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const addFav = async (userId, isFav) => {
    const apiEndpoint = isFav ? '/removeFav' : '/addFav';

    setFavData((prevList) =>
      prevList.map((user) =>
        user.user_id === userId ? { ...user, is_fav: !isFav } : user
      )
    );

    try {
      const response = await CallApi({
        api: apiEndpoint,
        method: 'UPLOAD',
        data: { user: userId },
      });

      if (response && response.status === 1) {
        toast.success(response.msg || 'Favorite updated successfully');
      } else {
        toast.error(response.msg || 'Failed to update favorites.');
        // Revert optimistic update if API call fails
        setFavData((prevList) =>
          prevList.map((user) =>
            user.user_id === userId ? { ...user, is_fav: isFav } : user
          )
        );
      }
    } catch (error) {
      console.error('API request failed:', error);
      toast.error('Failed to update favorites.');
      // Revert optimistic update if API call fails
      setFavData((prevList) =>
        prevList.map((user) =>
          user.user_id === userId ? { ...user, is_fav: isFav } : user
        )
      );
    }
  };

  const sendInterest = async (userId, isInterestSent) => {
    const apiEndpoint = isInterestSent ? '/removeInterest' : '/addInterest';

    // Optimistic UI update
    setFavData((prevList) =>
      prevList.map((user) =>
        user.user_id === userId ? { ...user, is_interest_send: !isInterestSent } : user
      )
    );

    try {
      const response = await CallApi({
        api: apiEndpoint,
        method: 'UPLOAD',
        data: { user: userId },
      });

      if (response && response.status === 1) {
        toast.success(response.msg || 'Interest updated successfully');
      } else {
        toast.error(response.msg || 'Failed to update interest.');
        // Revert optimistic update if API call fails
        setFavData((prevList) =>
          prevList.map((user) =>
            user.user_id === userId ? { ...user, is_interest_send: isInterestSent } : user
          )
        );
      }
    } catch (error) {
      console.error('API request failed:', error);
      toast.error('Failed to update interest.');
      // Revert optimistic update if API call fails
      setFavData((prevList) =>
        prevList.map((user) =>
          user.user_id === userId ? { ...user, is_interest_send: isInterestSent } : user
        )
      );
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && !noMoreData) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading && page === 1) {
    return <h1>Loading...</h1>;
  }

  return (
    <React.Fragment>
      {favData.length > 0 ? (
        <div className="dashboard-content-inner">
          <div id="fav_me_users_container" className="allUser row gx-3 row-cols-xxl-5">
            {favData.map((user) => (
              <article key={user.user_id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                <div className="card card-profile user" id={`user_${user.user_id}`}>
                  {user.verified && (
                    <span className="verify">
                      <img src="https://truetiesdating.com/assets/images/verified.png" alt="verified" />
                    </span>
                  )}
                  {user.vip && (
                    <span className="vip">
                      <img src="https://truetiesdating.com/assets/images/vip.png" alt="vip" />
                    </span>
                  )}
                  <div className="card-image">
                    <Link to={`/public-profile/${user.user_id}`}>
                      <img
                        src={
                          user.profile_pic
                            ? `${picLink}${user.profile_pic}`
                            : user.gender === 'M'
                            ? Mimage
                            : Fimage
                        }
                        alt="User"
                        className="card-img-top"
                      />
                    </Link>
                  </div>
                  <div className="card-body">
                    <h5>
                      <Link to={`/public-profile/${user.user_id}`}>
                        {user.name}, {user.age}
                      </Link>
                      <span className="offline-badge"></span>
                    </h5>
                    <p>
                      <i className="bi bi-geo-alt"></i>{' '}
                      {user.countyLive || 'Not Available'}
                    </p>
                    <ul className="action">
                      <li>
                        <a
                          onClick={() => sendInterest(user.user_id, user.is_interest_send)}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={
                            user.is_interest_send
                              ? 'Remove interest'
                              : 'Send interest'
                          }
                        >
                          {user.is_interest_send ? (
                            <i className="bi bi-hand-thumbs-up-fill"></i>
                          ) : (
                            <i className="bi bi-hand-thumbs-up"></i>
                          )}
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => addFav(user.user_id, user.is_fav)}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={
                            user.is_fav
                              ? 'Remove from favorite'
                              : 'Add to favorite'
                          }
                        >
                          {user.is_fav ? (
                            <i className="bi bi-heart-fill"></i>
                          ) : (
                            <i className="bi bi-heart"></i>
                          )}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!noMoreData && favData.length > 0 && (
            <div className="text-center mb-3" id="load_more_fav_me_users">
              <button
                className="btn btn-primary"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {/* {loadingMore ? 'Loading...' : 'Load More'} */}
                {allLanguageKey?.load_more}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="card-body">
        <div id="card-alert" className="not-result-found">
          <div className="noavatar">
            <img
              src="https://truetiesdating.com/assets/images/icon-girl.png"
              alt=""
              height="84"
              width="84"
            />
          </div>
          <p className="mb-2">{allLanguageKey?.no_users_found}</p>
          <p>
          {allLanguageKey?.interested_in_me_no}.
          </p>
          <Link to='/my-profile/edit/profile' className="btn btn-primary">
          {allLanguageKey?.update_profile}
          </Link>
        </div>
      </div>
      )}
    </React.Fragment>
  );
};

export default TheirFavourite;
