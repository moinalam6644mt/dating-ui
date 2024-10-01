import React, { useState, useEffect } from "react";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import UserDirectChat from "../Message/UserDirectChat";
import Modal from "react-bootstrap/Modal";


const MyInterest = () => {
  const { CallApi ,GetMemberId} = AuthUser();
  const [interestData, setInterestData] = useState([]);
  const [imgPath, setImgPath] = useState("");
  const [maleImageLink, setMaleImageLink] = useState("");
  const [femaleImageLink, setFemaleImageLink] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); 
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState();
  
  const loginUser = GetMemberId();

  useEffect(() => {
    fetchInterestData();
  }, [page]); 

  const fetchInterestData = async () => {
    setLoading(true);
    try {
      const response = await CallApi({
        api: `/my_interest`,
        method: "GET",
        data: { per_page:page }, // Adjust per_page and page for pagination
      });

      if (response && response.status === 1) {
        setInterestData((prevData) => [...prevData, ...response.interest]);
        setImgPath(response.pic_link);
        setMaleImageLink(response.m_image);
        setFemaleImageLink(response.f_image);
        setHasMore(response.interest.length > 0); // Check if more data is available
      } else {
        toast.error(response.error || "Failed to load interest data");
        setHasMore(false); // No more data available
      }
    } catch (error) {
      toast.error("An error occurred while fetching interest data");
      console.error("FetchInterestData Error:", error);
      setHasMore(false); // No more data available in case of an error
    } finally {
      setLoading(false);
    }
  };


  const sendInterest = async (userId, isInterestSent) => {
    let response;
    const apiEndpoint = isInterestSent ? "/removeInterest" : "/addInterest";

    try {
      response = await CallApi({
        api: apiEndpoint,
        method: "UPLOAD",
        data: { user: userId },
      });

      if (response && response.status === 1) {
        toast.success(response.msg);
        setInterestData((prevList) =>
          prevList.map((user) =>
            user.user_id === userId
              ? { ...user, is_interest_send: !isInterestSent }
              : user
          )
        );
      } else {
        toast.error(response.msg || "Failed to update interest.");
      }
    } catch (error) {
      console.error("API request failed:", error);
      toast.error("Failed to update interest.");
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

<div className="dashboard-content-inner">
      <div id="interest_users_container" className="allUser row gx-3 row-cols-xxl-5">
        {interestData.length > 0 ? (
          interestData.map((user) => (
            <article
              className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
              key={user.user_id}
            >
              <div
                className="card card-profile user"
                id={`user_${user.user_id}`}
              >
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
                    <Link to={`/public-profile/${user.user_id}`}>{user.name}</Link>
                    <span
                      className={
                        user.onlineStatus ? "online-badge" : "offline-badge"
                      }
                    ></span>
                  </h5>
                  <p className="text-ellipsis-1">
                    <i className="bi bi-geo-alt"></i>{" "}
                    {user.countryLive || "Unknown location"}, {user.stateLive || "Unknown location"}
                  </p>
                  <ul className="action">
                    <li>
                      <a
                        title={
                          user.is_interest_send
                            ? "Withdraw interest"
                            : "Send interest"
                        }
                        onClick={() =>
                          sendInterest(user.user_id, user.is_interest_send)
                        }
                        className="btn-action"
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
                        onClick={() => ShowMessageBox(user.user_id)}
                        title="Send message"
                        className="btn-action"
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
          <p>No users found</p>
        )}
      </div>
      {hasMore && interestData.length > 0 && (
        <div className="text-center mb-3" id="load_more_interest_users">
          <button
            className="btn btn-primary"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
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
          <UserDirectChat userId={userId} loginUser={loginUser} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
    
  );
};

export default MyInterest;
