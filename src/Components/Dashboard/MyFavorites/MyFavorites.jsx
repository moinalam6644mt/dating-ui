import React, { useState, useEffect } from 'react';
import AuthUser from '../../Authentication/AuthUser/AuthUser';
import toast from 'react-hot-toast';
import UserDirectChat from '../Message/UserDirectChat';
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';

const MyFavorites = () => {
  const { CallApi } = AuthUser();
  const [favData, setFavData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); 
  const [noMoreData, setNoMoreData] = useState(false); 
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState();
  const [imgPath, setImgPath] = useState("");
  const [maleImageLink, setMaleImageLink] = useState("");
  const [femaleImageLink, setFemaleImageLink] = useState("");


  useEffect(() => {
    FetchFavouriteData();
  }, [page]); // Fetch data when page changes

  const FetchFavouriteData = async () => {
    setLoading(true);
    try {
      const response = await CallApi({
        api: `/my_favourite`,
        method: 'GET',
        data: { per_page: page }, 
      });

      if (response ) {
        setFavData((prevData) => [...prevData, ...response.fav_users]);
        setImgPath(response.pic_link);
        setMaleImageLink(response.m_image);
        setFemaleImageLink(response.f_image);
        setHasMore(response.fav_users.length > 0);
        setNoMoreData(response.fav_users.length === 0);
      } else {
        toast.error(response.error || "Failed to load favorite users.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching favorite users.");
      console.error("FetchFavouriteData Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addFav = async (userId, isFav) => {
    const apiEndpoint = isFav ? "/removeFav" : "/addFav";

    setFavData((prevList) =>
      prevList.map((user) =>
        user.user_id === userId
          ? { ...user, is_fav: !isFav }
          : user
      )
    );

    try {
      const response = await CallApi({
        api: apiEndpoint,
        method: "POST",
        data: { user: userId },
      });

      if (response && response.status === 1) {
        toast.success(response.msg || "Favorite updated successfully");
      } else {
        toast.error(response.msg || "Failed to update favorites.");
        // Revert optimistic update
        setFavData((prevList) =>
          prevList.map((user) =>
            user.user_id === userId
              ? { ...user, is_fav: isFav }
              : user
          )
        );
      }
    } catch (error) {
      console.error("API request failed:", error);
      toast.error("Failed to update favorites.");
      // Revert optimistic update
      setFavData((prevList) =>
        prevList.map((user) =>
          user.user_id === userId
            ? { ...user, is_fav: isFav }
            : user
        )
      );
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const ShowMessageBox = (user_id) => {
    setUserId(user_id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <div className="dashboard-content-container">
      <div className="dashboard-content-inner">
        <div id="favorite_users_container" className="allUser row gx-3 row-cols-xxl-5">
          {favData.length > 0 ? (
            favData.map((user) => (
              <article key={user.user_id} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                <div className="card card-profile user" id={`user_${user.user_id}`}>
                  {user.isVip && (
                    <span className="vip">
                      <img
                        src="https://truetiesdating.com/assets/images/vip.png"
                        alt="VIP"
                      />
                    </span>
                  )}
                  {user.isVerified && (
                    <span className="verify">
                      <img
                        src="https://truetiesdating.com/assets/images/verified.png"
                        alt="Verified"
                      />
                    </span>
                  )}
                  <div className="card-image">
                  <Link to={`/public-profile/${user.user_id}`}>
                    {user.profile_pic ? (
                      <img
                        src={`${imgPath}${user.profile_pic}`}
                        alt="User pic"
                        className="card-img-top"
                      />
                    ) : user.gender === "M" ? (
                      <img src={maleImageLink} alt="Male Image" />
                    ) : (
                      <img src={femaleImageLink} alt="Female Image" />
                    )}
                  </Link>
                  </div>
                  <div className="card-body">
                    <h5>
                      <a href={user.profileUrl}>{user.name}</a>
                      <span className="offline-badge"></span>
                    </h5>
                    <p>
                      <i className="bi bi-geo-alt"></i> {user.location || 'Unknown location'}
                    </p>
                    <ul className="action">
                      <li>
                        <a
                          onClick={() => addFav(user.user_id, user.is_fav)}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={user.is_fav ? "Remove from favorite" : "Add to favorite"}
                        >
                          {user.is_fav ? (
                            <i className="bi bi-heart-fill"></i>
                          ) : (
                            <i className="bi bi-heart"></i>
                          )}
                        </a>
                      </li>
                      <li>
                        <a
                          className="btn-action"
                          onClick={() => ShowMessageBox(user.user_id)}
                          title="Send message"
                        >
                          <i className="bi bi-chat-square-heart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>No favorite users found</p>
          )}
        </div>
        {!noMoreData && favData.length > 0 && (
          <div className="text-center mb-3" id="load_more_favorite_users">
            <button className="btn btn-primary" onClick={handleLoadMore} disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <div className="user-details">
            <div className="user-avatar">
              <img
                src="https://truetiesdating.com/assets/uploads/cropped_195c266e100d2581c1cc76b18d5a26b0.png"
                alt="User Image"
                className="img-circle elevation-2"
              />
            </div>
            <div className="user-name">
              <b>Florencia</b>
            </div>
          </div>
          <button
            type="button"
            class="btn-close"
            onClick={handleClose}
            aria-label="Close"
          ></button>


        </Modal.Header>
        <Modal.Body className="modal-scrollable">
          <UserDirectChat userId={userId} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
    
  );
};

export default MyFavorites;
