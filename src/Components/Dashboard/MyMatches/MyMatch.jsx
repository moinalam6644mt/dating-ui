import React, { useEffect, useState , useContext } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";
import UserDirectChat from "../Message/UserDirectChat";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../../ContextApi/AuthProvider";

const MyMatch = () => {
  const { CallApi,GetMemberId } = AuthUser();
const {allLanguageKey} =useContext(AuthContext)
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState();

  const loginUser = GetMemberId();

  useEffect(() => {
    MyMatchData();
  }, [page, onlineUsers]);

  const MyMatchData = async () => {
    if (isLoading) return; // Prevent fetching if already loading

    setIsLoading(true);
    const params = {
      per_page: page,
      type: onlineUsers ? "online" : undefined,
    };

    try {
      const response = await CallApi({
        api: "/my_matches",
        method: "GET",
        data: params,
      });

      if (response && response.status === 1) {
        if (response.matches.length > 0) {
          setUsers((prevUsers) => [...prevUsers, ...response.matches]);
        } else {
          setHasMore(false); // No more data to load
        }
      } else {
        toast.error("No matches found");
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch matches");
    } finally {
      setIsLoading(false);
    }
  };

  const addFav = async (userId, isFav) => {
    const apiEndpoint = isFav ? "/removeFav" : "/addFav";

    setUsers((prevList) =>
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
        setUsers((prevList) =>
          prevList.map((user) =>
            user.user_id === userId ? { ...user, is_fav: isFav } : user
          )
        );
      }
    } catch (error) {
      console.error("API request failed:", error);
      toast.error("Failed to update favorites.");
      setUsers((prevList) =>
        prevList.map((user) =>
          user.user_id === userId ? { ...user, is_fav: isFav } : user
        )
      );
    }
  };

  const sendInterest = async (userId, isInterestSent) => {
    const apiEndpoint = isInterestSent ? "/removeInterest" : "/addInterest";

    setUsers((prevList) =>
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
        setUsers((prevList) =>
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
      setUsers((prevList) =>
        prevList.map((user) =>
          user.user_id === userId
            ? { ...user, is_interest_send: isInterestSent }
            : user
        )
      );
    }
  };

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const updateFilter = () => {
    setOnlineUsers((prev) => !prev);
    setUsers([]); // Clear users when switching filters
    setPage(1); // Reset the page to 1
    setHasMore(true); // Reset hasMore state
  };

  const noRecordsFound = !isLoading && !users.length && !hasMore;

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
      <div className="d-flex justify-content-between mb-3">
        <h4>{allLanguageKey?.account_my_matches}</h4>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            onChange={updateFilter}
            checked={onlineUsers}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
          {allLanguageKey?.account_online_users}
          </label>
        </div>
      </div>

      <div
        id="online_users_container"
        className="allUser row gx-3 row-cols-xxl-5"
      >
        {users.length > 0 ? (
          users.map((user) => (
            <article
              key={user.user_id}
              className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
            >
              <div
                className="card card-profile user"
                id={`user_${user.user_id}`}
              >
                {user.doc_verify_status === "Y" && (
                  <span className="verify">
                    <img
                      src="https://truetiesdating.com/assets/images/verified.png"
                      alt="verified"
                    />
                  </span>
                )}
                {user.vip && (
                  <span className="vip">
                    <img
                      src="https://truetiesdating.com/assets/images/vip.png"
                      alt="vip"
                    />
                  </span>
                )}

                <div className="card-image">
                  <Link to={`/public-profile/${user.user_id}`}>
                    <img
                      src={user.profile_pic || "default-pic.jpg"}
                      alt={`${user.name}'s profile`}
                      className="card-img-top"
                    />
                  </Link>
                </div>

                <div className="card-body">
                  <h5>
                    <Link to={`/public-profile/${user.user_id}`}>
                      {`${user.name}, ${user.age}`}
                    </Link>
                    <span
                      className={
                        user.onlineStatus ? "online-badge" : "offline-badge"
                      }
                    ></span>
                  </h5>
                  <p>
                    <i className="bi bi-geo-alt"></i>{" "}
                    {`${user.countryLive || "N/A"}`}
                  </p>
                  <ul className="action">
                    <li>
                      <a
                        href="#!"
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
                        href="#!"
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
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Send message"
                        onClick={() => ShowMessageBox(user?.user_id)}
                      >
                        <i className="bi bi-chat-square-heart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          ))
        ) : noRecordsFound ? (
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
        ) : (
          isLoading && <p className="text-center">Loading...</p>
        )}
      </div>

      {users.length > 0 && (
        <div className="text-center mb-3" id="load_more_online_users">
          <button
            className="btn btn-primary"
            onClick={loadMore}
            disabled={isLoading || !hasMore}
          >
            {isLoading
              ? "Loading..."
              : hasMore
              ? "Load More"
              : "No More Matches"}
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

export default MyMatch;
