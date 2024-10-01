import React, { useEffect, useState ,useContext } from "react";
import toast from "react-hot-toast";
import AuthUser from "../Authentication/AuthUser/AuthUser";
import { Link } from "react-router-dom";
import UserDirectChat from "./Message/UserDirectChat";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../ContextApi/AuthProvider";

const Dashboard = () => {
  const { CallApi } = AuthUser();
  const {allLanguageKey} =useContext(AuthContext)
  const [onlineUsers, setOnlineUsers] = useState(false);
  const [dashboardList, setDashboardList] = useState([]);
  const [activeUser, setActiveUser] = useState();
  const [picLink, setPicLink] = useState();
  const [Fimage, setFimage] = useState();
  const [Mimage, setMimage] = useState();
  const [per_page, setPage] = useState(1);
  const [dashSide, setDashSide] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState();
  const [loginUser,setLoginUser]=useState();
  const [profileData,setProfileData]=useState()

  console.log(profileData)

  useEffect(() => {
    fetchDashboardData();
    FetchDashboardSideBar();
  }, [onlineUsers, per_page]);

  const fetchDashboardData = async () => {
    setIsLoading(true); 
    const params = {
      per_page: per_page,
      type: onlineUsers ? "online" : undefined,
    };

    try {
      const response = await CallApi({
        api: "/dashboard_list",
        method: "GET",
        data: params,
      });
      if (response && response.status === 1) {
        setActiveUser(response.current_count_list);
        setPicLink(response.pic_link);
        setFimage(response.f_image);
        setMimage(response.m_image);
        setDashboardList((prevList) =>
          per_page === 1
            ? response.online_users
            : [...prevList, ...response.online_users]
        );
      } else {
        toast.error("Data not fetched successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch data.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilter = () => {
    setOnlineUsers((prev) => !prev);
  };

  const loadMore = () => {
    if (isLoading) return;
    setPage((prevPage) => prevPage + 1);
  };

  const addFav = async (userId, isFav) => {
    let response;
    const apiEndpoint = isFav ? "/removeFav" : "/addFav";

    try {
      response = await CallApi({
        api: apiEndpoint,
        method: "UPLOAD",
        data: { user: userId },
      });

      if (response && response.status === 1) {
        toast.success(response.msg);
        fetchDashboardData(); // Refresh dashboard data
      } else {
        toast.error(response.msg || "Failed to update favorites.");
      }
    } catch (error) {
      console.error("API request failed:", error);
      toast.error("Failed to update favorites.");
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
        fetchDashboardData(); // Refresh dashboard data
      } else {
        toast.error(response.msg || "Failed to update interest.");
      }
    } catch (error) {
      console.error("API request failed:", error);
      toast.error("Failed to update interest.");
    }
  };

  const FetchDashboardSideBar = async () => {
    try {
      const response = await CallApi({
        api: "/dashboard_side_list",
        method: "GET",
      });
      if (response && response.status === 1) {
        setDashSide(response);
        setLoginUser(response.login_user)
      } else {
        toast.error("Data not fetched successfully");
      }
    } catch (error) {
      console.error(error);
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
        <div className="row">
          <aside className="col-xxl-9 col-lg-8 col-12">
            <div className="d-flex justify-content-end mb-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  onClick={updateFilter}
                  checked={onlineUsers}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                >
                  {allLanguageKey?.account_online_users}
                </label>
              </div>
            </div>
            {dashboardList.length > 0 ? (
              <div id="online_users_container" className="allUser row gx-3">
                {dashboardList.map((user, index) => (
                  <article
                    className="col-xxl-3 col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6"
                    key={index}
                  >
                    <div className="card card-profile user">
                      <span className="verify">
                        <img
                          src="https://truetiesdating.com/assets/images/verified.png"
                          alt="Verified"
                        />
                      </span>
                      <span className="vip" hidden>
                        <img
                          src="https://truetiesdating.com/assets/images/vip.png"
                          alt="VIP"
                        />
                      </span>
                      <div className="card-image">
                        <Link to={`/public-profile/${user?.user_id}`}>
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
                        <h5 className="text-ellipsis-1">
                          <a href="#" className="me-1">
                            {user.name}, {user.age}
                          </a>
                          <div
                            className={
                              user.onlineStatus
                                ? "online-badge"
                                : "offline-badge"
                            }
                          ></div>
                        </h5>
                        <p className="text-ellipsis-1">
                          <i className="bi bi-geo-alt"></i>{" "}
                          {user.countryLive || "N/A"} , {user.stateLive}
                        </p>
                        <ul className="action">
                          <li>
                            <a
                              onClick={() =>
                                sendInterest(
                                  user.user_id,
                                  user.is_interest_send
                                )
                              }
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title={
                                user.is_interest_send
                                  ? "remove interest"
                                  : "Send interest"
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
                                  ? "Remove from favorite"
                                  : "Add to favorite"
                              }
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
                ))}
              </div>
            ) : (
              <div id="card-alert" class="not-result-found">			
                    <div class="noavatar">
                        
                    <img
                          src="https://truetiesdating.com/assets/images/icon-girl.png"
                          alt=""
                          height="84"
                          width="84"
                        />
                        
                    </div>
                    <h3>{allLanguageKey?.no_users_found}</h3>       
                    <p class="mx-auto">{allLanguageKey?.account_interest_me_para}</p>                     
                    <a class="btn btn-outline-primary">{allLanguageKey?.update_profile}</a>
                </div>
            )}

            {activeUser !== 0 && !isLoading && (
              <div className="text-center mb-3" id="load_more_online_users">
                <a
                  className="btn btn-primary ajax_pagination"
                  onClick={loadMore}
                >
                  Load More
                </a>
              </div>
            )}
            {isLoading && (
              <div className="text-center mb-3">
                <span>Loading...</span>
              </div>
            )}
          </aside>

          <aside className="col-xxl-3 col-lg-4 col-12">
            {/* Fun facts section */}
            {/* My Matches section */}
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="mb-0">{allLanguageKey?.account_my_matches}</h5>
              </div>
              <div className="card-media">
                {dashSide?.matching_list?.length > 0 ? (
                  dashSide.matching_list.map((user) => (
                    <a href={user.profileUrl} className="media" key={user.id}>
                      <img
                        src={user.imageUrl}
                        alt={user.name}
                        height="48"
                        width="48"
                        className="rounded-circle me-3"
                      />
                      <div className="media-body">
                        <h5>
                          {user.name}, {user.age}
                        </h5>
                        <p>
                          <i className="bi bi-geo-alt"></i>{" "}
                          {user.location || "Location not provided"}
                        </p>
                      </div>
                    </a>
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
                      <p>
                      {allLanguageKey?.interested_in_me_no}.
                      </p>
                      <a href="#" className="btn btn-primary">
                        {allLanguageKey?.update_profile}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Interested in Me section */}
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="mb-0">{allLanguageKey?.interested_in_me}</h5>
              </div>
              <div className="card-media">
                {dashSide?.interest_in_me_list?.length > 0 ? (
                  dashSide.interest_in_me_list.slice(0, 5).map((user) => (
                    <a href={user.profileUrl} className="media" key={user.id}>
                      <img
                        src={user.imageUrl}
                        alt={user.name}
                        height="48"
                        width="48"
                        className="rounded-circle me-3"
                      />
                      <div className="media-body">
                        <h5>
                          {user.name}, {user.age}
                        </h5>
                        <p>
                          <i className="bi bi-geo-alt"></i>{" "}
                          {user.location || "Location not provided"}
                        </p>
                      </div>
                    </a>
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
                      <p>
                      {allLanguageKey?.interested_in_me_no}.
                      </p>
                      <a href="#" className="btn btn-primary">
                      {allLanguageKey?.update_profile}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recently Viewed My Profile section */}
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="mb-0">{allLanguageKey?.recently_viewed_my_profile}</h5>
              </div>
              <div className="card-media">
                {dashSide?.viewed_profile_list?.length > 0 ? (
                  dashSide.viewed_profile_list.slice(0, 5).map((user) => (
                    <a href={user.profileUrl} className="media" key={user.id}>
                      <img
                        src={user.profile_pic}
                        alt={user.name}
                        height="48"
                        width="48"
                        className="rounded-circle me-3"
                      />
                      <div className="media-body">
                        <h5>
                          {user.name}, {user.age}
                        </h5>
                        <p>
                          <i className="bi bi-geo-alt"></i>{" "}
                          {user.location || "Location not provided"}
                        </p>
                      </div>
                    </a>
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
                      <p>
                      {allLanguageKey?.interested_in_me_no}.
                      </p>
                      <a href="#" className="btn btn-primary">
                      {allLanguageKey?.update_profile}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <div className="user-details">
            <div className="user-avatar">
              <img
                src={profileData?.user_logo}
                alt="User Image"
                className="img-circle elevation-2"
              />
            </div>
            <div className="user-name">
              <b>{profileData?.name}</b>
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
          <UserDirectChat userId={userId} loginUser={loginUser} setProfileData={setProfileData}/>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Dashboard;
