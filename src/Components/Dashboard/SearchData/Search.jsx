import React, { useState, useEffect, useRef , useContext } from "react";
import BasicFilter from "./Child/BasicFilter";
import AppearanceFilter from "./Child/AppearanceFilter";
import LifeStyleFilter from "./Child/LifeStyleFilter";
import CulturalFilter from "./Child/CulturalFilter";
import PersonalFilter from "./Child/PersonalFilter";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import { useSearchParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "react-bootstrap/Modal";
import UserDirectChat from "../Message/UserDirectChat";
import AuthContext from "../../ContextApi/AuthProvider";

const Search = () => {
  const { CallApi ,GetMemberId} = AuthUser();

  const [data, setData] = useState({});
  const {allLanguageKey} =useContext(AuthContext)
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchList, setSearchList] = useState([]);
  const [imgPath, setImgPath] = useState("");
  const [maleImageLink, setMaleImageLink] = useState("");
  const [femaleImageLink, setFemaleImageLink] = useState("");
  const [show, setShow] = useState(false);
  const [countries, setCountries] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(false);
  const [option, setOption] = useState({ hairColor: [] });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState();
  const resultsContainerRef = useRef(null);

  const loginUser = GetMemberId();

  useEffect(() => {
    FetchSearchList();
  }, [page]);

  const addFav = async (userId, isFav) => {
    const apiEndpoint = isFav ? "/removeFav" : "/addFav";
    try {
      const response = await CallApi({
        api: apiEndpoint,
        method: "POST",
        data: { user: userId },
      });

      if (response && response.status === 1) {
        toast.success(response.msg);
        setSearchList((prevList) =>
          prevList.map((user) =>
            user.user_id === userId ? { ...user, is_fav: !isFav } : user
          )
        );
      } else {
        toast.error(response.msg || "Failed to update favorites.");
      }
    } catch (error) {
      console.error("API request failed:", error);
      toast.error("Failed to update favorites.");
    }
  };

  const sendInterest = async (userId, isInterestSent) => {
    const apiEndpoint = isInterestSent ? "/removeInterest" : "/addInterest";
    try {
      const response = await CallApi({
        api: apiEndpoint,
        method: "POST",
        data: { user: userId },
      });

      if (response && response.status === 1) {
        toast.success(response.msg);
        setSearchList((prevList) =>
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


  const objectToQueryString = (obj) => {
    const params = new URLSearchParams();
    for (const section in obj) {
      const sectionData = obj[section];
      for (const key in sectionData) {
        const value = sectionData[key];
        if (Array.isArray(value)) {
          value.forEach((item) => params.append(key, item));
        } else if (value !== undefined && value !== null && value !== "-1") {
          params.append(key, value);
        }
      }
    }
    return params.toString();
  };

  const FetchSearchList = async () => {
    try {
      const response = await CallApi({
        api: `/search`,
        method: "POST",
        data: {
          per_page: page,
          type: onlineUsers ? "online" : undefined,
        },
      });

      if (response && response.status === 1) {
        setTotalUser(response.totalUsers);
        setSearchList((prevList) => [...prevList, ...response.userList]);
        setOption(response.options);
        setCountries(response.countries);
        setImgPath(response.pic_link);
        setMaleImageLink(response.m_image);
        setFemaleImageLink(response.f_image);
        setHasMore(response.userList.length > 0);
      } else {
        toast.error(response.msg || "Data not found");
        setHasMore(false);
      }
    } catch (error) {
      console.error("Data not found", error);
      setHasMore(false);
    }
  };

  const parseQueryString = (queryString) => {
    const params = new URLSearchParams(queryString);
    const obj = {};
    for (const [key, value] of params.entries()) {
      obj[key] = value;
    }
    return obj;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    setSearchList([]); // Clear existing results
    const queryString = objectToQueryString(data);
    setSearchParams(new URLSearchParams(queryString));

    const filterData = parseQueryString(queryString);
    const filter = JSON.stringify(filterData);

    try {
      const response = await CallApi({
        api: `/search`,
        method: "UPLOAD",
        data: {
          per_page: page,
          filterData: filter,
          type: onlineUsers ? "online" : undefined,
        },
      });

      if (response && response.status === 1) {
        setSearchList(response.userList);

        // Scroll to top after applying filter and loading results
        if (resultsContainerRef.current) {
          resultsContainerRef.current.scrollTop = 0;
        }

        if (resultsContainerRef.current) {
          window.scrollTo({
            top: resultsContainerRef.current.offsetTop,
            behavior: "smooth",
          });
        }
      } else {
        toast.error(response.msg || "No results found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch search results");
    }
  };

  const handleClose = () => {
    setShow(false);
    setShowModal(false);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const ShowMessageBox = (user_id) => {
    setUserId(user_id);
    setShowModal(true);
  };

  const updateFilter = () => {
    setOnlineUsers((prev) => !prev);
  };

  return (
    <React.Fragment>
      <div className="sec">
        <div className="container-fluid">
          <div className="row">
            <aside className="col-lg-3">
              <form onSubmit={handleSubmit}>
                <h4 className="mb-3">Filter</h4>
                <BasicFilter setData={setData} countries={countries} />
                <AppearanceFilter setData={setData} option={option} />
                <LifeStyleFilter setData={setData} option={option} />
                <CulturalFilter setData={setData} option={option} />
                <PersonalFilter setData={setData} option={option} />

                <div className="d-grid">
                  <button className="btn btn-primary" type="submit">
                    Search
                  </button>
                </div>
              </form>
            </aside>

            <aside className="col-lg-9">
              <div
                className="d-flex justify-content-between mb-3"
                id="card-alert"
              >
                <h4 id="results_count">
                  <b>{searchList.length} </b>{allLanguageKey?.results_found}
                </h4>
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

              <div
                id="results_users_container"
                className="allUser row gx-3"
                ref={resultsContainerRef}
              >
                {searchList.length > 0 ? (
                  searchList.map((user) => (
                    <article
                      className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
                      key={user.user_id}
                    >
                      <div
                        className="card card-profile user"
                        id={`user_${user.user_id}`}
                      >
                        <span className="verify">
                          <img
                            src="https://truetiesdating.com/assets/images/verified.png"
                            alt="Verified"
                          />
                        </span>
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
                            <a href={`/${user.user_id}`}>{user.name}</a>
                            <span
                              className={
                                user.onlineStatus
                                  ? "online-badge"
                                  : "offline-badge"
                              }
                            ></span>
                          </h5>
                          <p className="text-ellipsis-1">
                            <i className="bi bi-geo-alt"></i>{" "}
                            {user.countryLive || "Unknown location"},{" "}
                            {user.stateLive || "Unknown location"}
                          </p>
                          <ul className="action">
                            <li>
                              <a
                                href="#"
                                title={
                                  user.is_fav
                                    ? "Remove from favorite"
                                    : "Add to favorite"
                                }
                                onClick={() =>
                                  addFav(user.user_id, user.is_fav)
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
                                href="#"
                                title={
                                  user.is_interest_send
                                    ? "Withdraw interest"
                                    : "Send interest"
                                }
                                onClick={() =>
                                  sendInterest(
                                    user.user_id,
                                    user.is_interest_send
                                  )
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
                    <h3>No users found</h3>
                    <p class="mx-auto">
                      Don't worry, we have so many members, there are bound to
                      be many people interested in you. The best way to increase
                      your chance of receiving interest is to add a photo.
                    </p>
                    <a class="btn btn-outline-primary">Get Matches</a>
                  </div>
                )}
              </div>

              {hasMore && searchList.length >= 20 && (
                <div className="text-center mb-3" id="load_more_results_users">
                  <button className="btn btn-primary" onClick={loadMore}>
                    Load More
                  </button>
                </div>
              )}
            </aside>
          </div>
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
        <UserDirectChat userId={userId} loginUser={loginUser} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Search;
