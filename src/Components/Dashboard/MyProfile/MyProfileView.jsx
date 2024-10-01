import React, { useState, useEffect, useContext } from "react";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import UserDirectChat from "../Message/UserDirectChat";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../../ContextApi/AuthProvider";

const MyProfileView = () => {
  const { CallApi } = AuthUser();
const {allLanguageKey} =useContext(AuthContext)

  const [profileList, setProfileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [picLink, setPicLink] = useState("");
  const [Fimage, setFimage] = useState("");
  const [Mimage, setMimage] = useState("");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const [userId, setUserId] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, [page]);

  const fetchProfileData = async () => {
    if (loadingMore) return; // Prevent fetch if already loading more

    setLoading(page === 1); // Set loading only for the initial load
    setLoadingMore(page > 1); // Loading state for "Load More"

    try {
      const response = await CallApi({
        api: `/profile_views`,
        method: "GET",
        data: {
          per_page: page,
        },
      });

      if (response && response.status === 1) {
        setPicLink(response.pic_link || "");
        setFimage(response.f_image || "");
        setMimage(response.m_image || "");
        setProfileList((prevList) =>
          page === 1 ? response.views : [...prevList, ...response.views]
        );

        if (response.views.length === 0) {
          setNoMoreData(true); // No more data to load
        }
      } else {
        toast.error(response.error || "Failed to fetch profile data.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching profile data.");
      setError(error);
      setNoMoreData(true); // No more data to load in case of an error
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && !noMoreData) {
      setPage((prevPage) => prevPage + 1);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const addFav = async (userId, isFav) => {
    const apiEndpoint = isFav ? "/removeFav" : "/addFav";

    setProfileList((prevList) =>
      prevList.map((user) =>
        user.user_id === userId ? { ...user, is_fav: !isFav } : user
      )
    );

    try {
      const response = await CallApi({
        api: apiEndpoint,
        method: "UPLOAD",
        data: { user: userId },
      });

      if (response && response.status === 1) {
        toast.success(response.msg || "Favorite updated successfully");
      } else {
        toast.error(response.msg || "Failed to update favorites.");
        setProfileList((prevList) =>
          prevList.map((user) =>
            user.user_id === userId ? { ...user, is_fav: isFav } : user
          )
        );
      }
    } catch (error) {
      console.error("API request failed:", error);
      toast.error("Failed to update favorites.");
      setProfileList((prevList) =>
        prevList.map((user) =>
          user.user_id === userId ? { ...user, is_fav: isFav } : user
        )
      );
    }
  };

  const sendInterest = async (userId, isInterestSent) => {
    const apiEndpoint = isInterestSent ? "/removeInterest" : "/addInterest";

    setProfileList((prevList) =>
      prevList.map((user) =>
        user.user_id === userId
          ? { ...user, is_interest_send: !isInterestSent }
          : user
      )
    );

    try {
      const response = await CallApi({
        api: apiEndpoint,
        method: "UPLOAD",
        data: { user: userId },
      });

      if (response && response.status === 1) {
        toast.success(response.msg || "Interest updated successfully");
      } else {
        toast.error(response.msg || "Failed to update interest.");
        setProfileList((prevList) =>
          prevList.map((user) =>
            user.user_id === userId
              ? { ...user, is_interest_send: isInterestSent }
              : user
          )
        );
      }
    } catch (error) {
      console.error("API request failed:", error);
      toast.error("Failed to update interest.");
      setProfileList((prevList) =>
        prevList.map((user) =>
          user.user_id === userId
            ? { ...user, is_interest_send: isInterestSent }
            : user
        )
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const ShowMessageBox = (user_id) => {
    setUserId(user_id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <div className="dashboard-content-inner">
        <div
          id="profile_view_users_container"
          className="allUser row gx-3 row-cols-xxl-5"
        >
          {profileList.length > 0 ? (
            profileList.map((user) => (
              <article
                key={user.user_id}
                className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
              >
                <div
                  className="card card-profile user"
                  id={`user_${user.user_id}`}
                >
                  {user.vip && (
                    <span className="vip">
                      <img
                        src="https://truetiesdating.com/assets/images/vip.png"
                        alt="VIP badge"
                      />
                    </span>
                  )}
                  <div className="card-image">
                    <Link to={`/public-profile/${user.user_id}`}>
                      <img
                        src={
                          user.profile_pic
                            ? `${picLink}${user.profile_pic}`
                            : user.gender === "M"
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
                      <a href={`/public-profile/${user.user_id}`}>
                        {user.name}
                      </a>
                      <span className="offline-badge"></span>
                    </h5>
                    <p>
                      <i className="bi bi-geo-alt"></i>{" "}
                      {user.location || "Unknown location"}
                    </p>
                    <ul className="action">
                      <li>
                        <a
                          href="#"
                          title={
                            user.is_interest_send
                              ? "Withdraw interest"
                              : "Send interest"
                          }
                          onClick={() =>
                            sendInterest(user.user_id, user.is_interest_send)
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
                          href="#"
                          title={
                            user.is_fav
                              ? "Remove from favorite"
                              : "Add to favorite"
                          }
                          onClick={() => addFav(user.user_id, user.is_fav)}
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
                          onClick={() => ShowMessageBox(user?.user_id)}
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
                <p>{allLanguageKey?.interested_in_me_no}.</p>
                <Link to="/my-profile/edit/profile" className="btn btn-primary">
                {allLanguageKey?.update_profile}
                </Link>
              </div>
            </div>
          )}
        </div>
        {!noMoreData && profileList.length > 0 && (
          <div className="text-center mb-3" id="load_more_profile_view_users">
            <button
              className="btn btn-primary"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
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

export default MyProfileView;
