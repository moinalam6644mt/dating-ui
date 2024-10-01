import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import "../../../App.css";
import ScrollArea from "react-scrollbar";
import {
  BsBoxArrowInRight,
  BsArrowRightSquare,
  BsSunFill,
  BsMoonStarsFill,
  BsCircleHalf,
  BsPerson,
} from "react-icons/bs";
import {
  BsPlus,
  BsSpeedometer2,
  BsGift,
  BsBook,
  BsChatSquareHeart,
  BsHandThumbsUp,
  BsEye,
  BsHeart,
} from "react-icons/bs";
import { useLanguage } from "../LayoutContext/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import gbflag from "../../../assets/images/flags/gb.svg";
import aeflag from "../../../assets/images/flags/ae.svg";
import seflag from "../../../assets/images/flags/se.svg";
import logolight from "./image/logolight.png";
import logodark from "./image/logodark.png";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";
import AuthContext from "../../ContextApi/AuthProvider";

const Header = () => {
  const { setLanguage, setAllLanguageKey, allLanguageKey } =
    useContext(AuthContext);
  const { CallApi, Logout, isLogin } = AuthUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { changeLanguage } = useLanguage();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeNotification, setActiveNotification] = useState(false);
  const [activeMessage, setActiveMessage] = useState(false);
  const [activeUserMenu, setActiveUserMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [actData, setActData] = useState();
  const token = localStorage.getItem("user");
  const [userLogo, setUserLogo] = useState();
  const [userName, setUserName] = useState();
  const [balance,setBalance]=useState()

  const locanLang = localStorage.getItem("lang");

  useEffect(() => {
    FetchAllLanguageKey(locanLang);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (token) {
      setShow(true);
    }
    FetchNotificationData();
    FetchMessageData();
  }, [show]);

  const handleLogout = () => {
    Logout();
    navigate("/");
  };

  useEffect(() => {
    setActiveNotification(false);
    setActiveMessage(false);
    setActiveUserMenu(false);
  }, [location]);

  useEffect(() => {
    const wrapperDiv = document.getElementById("wrapper");
    document.documentElement.setAttribute("data-bs-theme", theme);
    if (!token) {
      wrapperDiv.classList.add("wrapper-with-transparent-header");
    }
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const loadNotification = () => {
    setActiveNotification(!activeNotification);
    setActiveMessage(false);
    setActiveUserMenu(false);
  };

  const loadMessage = () => {
    setActiveNotification(false);
    setActiveMessage(!activeMessage);
    setActiveUserMenu(false);
  };

  const showUserData = () => {
    setActiveNotification(false);
    setActiveMessage(false);
    setActiveUserMenu(!activeUserMenu);
  };

  const handleLanguageChange = (lang) => {
    //setLanguage(lang);
    changeLanguage(lang);
    localStorage.setItem("lang", lang);
  FetchAllLanguageKey(lang);
  };

  const FetchAllLanguageKey = async (lang) => {
    try {
      const response = await CallApi({
        api: `/get_all_language_key/`+(lang  ?lang :''),
        method: "GET",
      });
      if (response && response.status === 1) {
        setAllLanguageKey(response.data);
        
      }
    } catch (error) {
      console.error("Error fetching language keys", error);
    }
  };

  const FetchNotificationData = async () => {
    let response;
    try {
      response = await CallApi({
        api: "/load_notification_header",
        method: "GET",
      });
      if (response && response.status === 1) {
        setNotifications(response.notification_list);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log("data did not found");
    }
  };

  const FetchMessageData = async () => {
    let response;
    try {
      response = await CallApi({
        api: "/header",
        method: "GET",
      });
      if (response && response.status === 1) {
        setMessages(response.load_message_data);
        setUserLogo(response.logo);
        setUserName(response.name);
        setActData(response.act);
        setBalance(response.balance)
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log("data did not found");
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    // Extract formatted date
    const formattedDate = date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
    });

    // Extract formatted time
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
  };

  const ShowUserPofile = (activity_user_id, link) => {
    console.log(activity_user_id, link);

    if (link === "public_profile") {
      navigate(`/public-profile/${activity_user_id}`);
    } else if (link === "interest") {
      navigate(`/public-profile/${activity_user_id}`);
    } else if (link === "favourite") {
      navigate(`/public-profile/${activity_user_id}`);
    }
  };

  return (
    <div>
      <header
        id="header-container"
        className={`fullwidth ${
          show !== false ? "" : "transparent-header unsticky"
        }`}
        style={{ position: isMobile ? "relative" : "fixed" }}
      >
        <div id="header">
          <div className="container">
            <div className="start-side">
              <div id="logo">
                {isLogin() ? (
                  // User is logged in, render logo without Link
                  <Link to="/dashboard">
                    <img
                      src={logolight}
                      alt="Eroflirts"
                      className="logo-light"
                    />
                    <img src={logodark} alt="Eroflirts" className="logo-dark" />
                  </Link>
                ) : (
                  // User is not logged in, allow clicking the logo to go to the home page
                  <Link to="/">
                    <img
                      src={logolight}
                      alt="Eroflirts"
                      className="logo-light"
                    />
                    <img src={logodark} alt="Eroflirts" className="logo-dark" />
                  </Link>
                )}
              </div>

              {show === true && (
                <React.Fragment>
                  <nav id="navigation">
                    <ul id="responsive">
                      <li className="d-lg-none">
                        <span className="dropdown language">
                          <button
                            className="dropdown-toggle"
                            id="dropdownMenuLink"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <img
                              src="https://truetiesdating.com/assets/images/flags/gb.svg"
                              alt="English"
                              width="28"
                            />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="dropdownMenuLink"
                          >
                            <button
                              className="dropdown-item"
                              onClick={() => changeLanguage("english")}
                            >
                              <img
                                src="https://truetiesdating.com/assets/images/flags/gb.svg"
                                alt="English"
                                width="28"
                              />
                            </button>
                            <button
                              className="dropdown-item"
                              onClick={() => changeLanguage("arabic")}
                            >
                              <img
                                src="https://truetiesdating.com/assets/images/flags/ae.svg"
                                alt="Arabic"
                                width="28"
                              />
                            </button>
                            <button
                              className="dropdown-item"
                              onClick={() => changeLanguage("swedish")}
                            >
                              <img
                                src="https://truetiesdating.com/assets/images/flags/se.svg"
                                alt="Swedish"
                                width="28"
                              />
                            </button>
                          </div>
                        </span>
                      </li>
                      <li>
                        <Link to="/my-matches">
                          {allLanguageKey?.account_my_matches}
                        </Link>{" "}
                      </li>
                      <li>
                        <Link to="/search">{allLanguageKey?.search}</Link>{" "}
                      </li>
                      <li>
                        <Link to="">{allLanguageKey?.activity}{" "}
                          <span
                            className="badge text-bg-warning"
                            id="activity_count"
                            style={{ display: "inline" }}
                          >
                            {actData?.total}
                          </span>
                        </Link>
                        <ul className="dropdown-nav">
                          <li>
                            <Link to="">{allLanguageKey?.recent_activity}</Link>
                            <ul className="dropdown-nav">
                              <li>
                                <Link to="/interested-in-me">
                                  {allLanguageKey?.interested_in_me}{" "}
                                  <span
                                    className="badge text-bg-warning"
                                    id="interest_count"
                                    style={{ display: "inline" }}
                                  >
                                    {actData?.interested}
                                  </span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/viewed-my-profile">
                                  {allLanguageKey?.viewed_my_profile}
                                  <span
                                    className="badge text-bg-warning"
                                    id="profile_view_count"
                                    style={{ display: "inline" }}
                                  >
                                    {actData?.viewed_profile}
                                  </span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/their-favourite">
                                  {allLanguageKey?.Im_their_favorite}
                                  <span
                                    className="badge text-bg-warning"
                                    id="favorite_count"
                                    style={{ display: "inline" }}
                                  >
                                    {actData?.fav}
                                  </span>
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <Link to="">
                              {allLanguageKey?.activity_from_me}
                            </Link>
                            <ul className="dropdown-nav">
                              <li>
                                <Link to="/my-interest">
                                  {allLanguageKey?.my_interests}
                                </Link>
                              </li>
                              <li>
                                <Link to="/my-favourate">
                                  {allLanguageKey?.my_favorites}
                                </Link>
                              </li>
                              <li>
                                <Link to="/my-profile-view">
                                  {allLanguageKey?.profiles_I_viewed}
                                </Link>
                              </li>
                              <li>
                                <Link to="/block-list">
                                  {allLanguageKey?.block_list}
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a>{allLanguageKey?.trips}</a>
                        <ul className="dropdown-nav">
                          <li>
                            <Link to="/add-trip">
                              {allLanguageKey?.account_add_trip}{" "}
                            </Link>
                          </li>
                          <li>
                            <Link to="/my-trip">
                              {allLanguageKey?.account_my_planned_trips}{" "}
                            </Link>
                          </li>
                          <li>
                            <Link to="/search-trip">
                              {allLanguageKey?.account_search_trip}{" "}
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="d-lg-none">
                        <a>Notification</a>
                      </li>
                      <li className="d-lg-none">
                        <a>Message</a>
                      </li>
                    </ul>
                  </nav>
                </React.Fragment>
              )}
              <div className="clearfix"></div>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            ></button>

            <div className="end-side">
              <React.Fragment>
                {show === false && (
                  <nav id="navigation">
                    <ul id="responsive">
                      <li className="d-none d-lg-block me-2">
                        <Link to="/login">
                          <BsBoxArrowInRight fill="#df314d" size={20} />{" "}
                          {allLanguageKey?.login || "Login"}
                        </Link>
                      </li>
                      <li className="d-none d-lg-block">
                        <Link to="/register">
                          <BsPerson fill="#df314d" size={20} />{" "}
                          {allLanguageKey?.register || "Register"}
                        </Link>
                      </li>
                    </ul>
                  </nav>
                )}
              </React.Fragment>

              {show === true && (
                <React.Fragment>
                  <div className="header-widget">
                    <div className="text-center log-in-button">
                      <span className="total-coin sm">
                        <img
                          src="https://truetiesdating.com/assets/images/10693245.png"
                          alt="Coin"
                          height="20"
                          width="20"
                        />{" "}
                        {balance}{" "}
                        <Link to="/message_plan">
                          <BsPlus size={24} />
                        </Link>
                      </span>
                    </div>
                  </div>
                  <div className="header-widget">
                    <div
                      className={`header-notifications ${
                        activeNotification ? "active" : ""
                      }`}
                    >
                      <div className="header-notifications-trigger">
                        <a href="#" onClick={loadNotification}>
                          <i className="bi bi-bell"></i>
                        </a>
                      </div>
                      <div className="header-notifications-dropdown ">
                        <div className="header-notifications-headline">
                          <h4>{allLanguageKey?.notifications}</h4>
                        </div>
                        <div className="header-notifications-content">
                          <div
                            className="header-notifications-scroll"
                            style={{ height: "213px" }}
                            data-simplebar
                          >
                            <ul
                              id="notification_header"
                              style={{ cursor: "pointer" }}
                            >
                              {notifications.length > 0 ? (
                                notifications.map((notification, index) => (
                                  <li
                                    key={index}
                                    className={
                                      notification.read
                                        ? ""
                                        : "notifications-not-read"
                                    }
                                  >
                                    <a
                                      onClick={() =>
                                        ShowUserPofile(
                                          notification.activity_user_id,
                                          notification?.link
                                        )
                                      }
                                    >
                                      <span className="notification-avatar">
                                        <img
                                          src={notification.profile_pic_link}
                                        />
                                      </span>
                                      <span className="notification-text">
                                        {notification.activity_parse}
                                        <span className="color">
                                          {formatDateTime(notification.date)}
                                        </span>
                                      </span>
                                    </a>
                                  </li>
                                ))
                              ) : (
                                <li>No notifications</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="header-widget">
                    <div
                      className={`header-notifications ${
                        activeMessage ? "active" : ""
                      }`}
                    >
                      <div className="header-notifications-trigger">
                        <a href="#" onClick={loadMessage}>
                          <i className="bi bi-envelope"></i>
                        </a>
                      </div>
                      <div className="header-notifications-dropdown">
                        <div className="header-notifications-headline">
                          <h4>{allLanguageKey?.messages}</h4>
                        </div>
                        <div className="header-notifications-content">
                          <div
                            className="header-notifications-scroll"
                            style={{ height: "213px" }}
                            data-simplebar
                          >
                            <ul id="chat_message_header">
                              {messages && messages.length > 0 ? (
                                messages.map((messageData, index) => (
                                  <li
                                    key={index}
                                    className={
                                      messageData?.last_message?.read_status ===
                                      "N"
                                        ? "notifications-not-read"
                                        : ""
                                    }
                                  >
                                    <a href={`/message`}>
                                      <span className="notification-icon">
                                        <img
                                          src={messageData?.chat_user?.logo}
                                          alt={`${messageData?.chat_user?.name}'s profile`}
                                          style={{
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                          }}
                                        />
                                      </span>
                                      <span className="notification-text">
                                        <strong>
                                          {messageData?.chat_user?.name}
                                        </strong>{" "}
                                        {messageData?.last_message?.message}{" "}
                                        <span className="color">
                                          {
                                            messageData?.last_message
                                              ?.display_time
                                          }
                                        </span>
                                      </span>
                                    </a>
                                  </li>
                                ))
                              ) : (
                                <li>No messages</li>
                              )}
                            </ul>
                          </div>
                          <a
                            href="/message"
                            className="header-notifications-button ripple-effect button-sliding-icon"
                          >
                            {allLanguageKey?.view_all_messages}
                            <i className="icon-material-outline-arrow-right-alt"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="header-widget hide-under-992px">
                    <div
                      className={`header-notifications user-menu ${
                        activeUserMenu ? "active" : ""
                      }`}
                    >
                      <div className="header-notifications-trigger">
                        <a onClick={showUserData}>
                          <div className="user-avatar status-online">
                            <img src={userLogo} alt="User Avatar" />
                          </div>
                        </a>
                      </div>
                      <div className="header-notifications-dropdown">
                        <div className="user-status">
                          <div className="user-details">
                            <div className="user-avatar status-online">
                              <img src={userLogo} alt="User Avatar" />
                            </div>
                            <div className="user-name">{userName}</div>
                          </div>
                        </div>
                        <ul className="user-menu-small-nav">
                          <li>
                            <Link to="/my-profile">
                              <i className="bi bi-person"></i>
                              {allLanguageKey?.my_profile}
                            </Link>
                          </li>
                          <li>
                            <Link to="/my-profile/edit/profile">
                              <i className="bi bi-gear"></i>{allLanguageKey?.profile_settings}
                            </Link>
                          </li>
                          <li>
                            <Link to="/my-profile/edit/match">
                              <i className="bi bi-gear-wide"></i>{allLanguageKey?.match_settings}
                            </Link>
                          </li>
                          <li>
                            <Link to="/notification">
                              <i className="bi bi-bell"></i>{allLanguageKey?.notifications}
                            </Link>
                          </li>
                          <li>
                            <Link to="/billing">
                              <i className="bi bi-cash"></i>{allLanguageKey?.billing}
                            </Link>
                          </li>
                          <li>
                            <Link to="/message_plan">
                              <i className="bi bi-award"></i>{allLanguageKey?.buy_credit} 
                            </Link>
                          </li>
                          <li>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={handleLogout}
                            >
                              <i className="bi bi-box-arrow-left"></i>{allLanguageKey?.logout}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
              <div className="header-widget">
                <div className="dropdown language">
                  <a
                    className="dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src={gbflag} alt="English" width="28" />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <a
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("english")}
                    >
                      <img src={gbflag} alt="English" width="28" />
                    </a>
                    <a
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("arabic")}
                    >
                      <img src={aeflag} alt="Arabic" width="28" />
                    </a>
                    <a
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("swedish")}
                    >
                      <img src={seflag} alt="Swedish" width="28" />
                    </a>
                  </div>
                </div>
              </div>
              {/* Theme Toggle */}
              <div className="header-widget">
                <div className="dropdown log-in-button">
                  <button
                    className="btn btn-link nav-link dropdown-toggle"
                    id="bd-theme"
                    type="button"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    aria-label="Toggle theme"
                  >
                    {/* Render the appropriate theme icon */}
                    {theme === "light" && (
                      <BsSunFill
                        className="bi my-1 theme-icon-active"
                        fill="currentColor"
                      />
                    )}
                    {theme === "dark" && (
                      <BsMoonStarsFill
                        className="bi my-1 theme-icon-active"
                        fill="currentColor"
                      />
                    )}
                    {theme === "auto" && (
                      <BsCircleHalf
                        className="bi my-1 theme-icon-active"
                        fill="currentColor"
                      />
                    )}

                    <span className="d-none ms-2" id="bd-theme-text">
                      Toggle theme
                    </span>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="bd-theme-text"
                  >
                    <li>
                      <button
                        type="button"
                        className={`dropdown-item ${
                          theme === "light" ? "active" : ""
                        }`}
                        onClick={() => handleThemeChange("light")}
                      >
                        <BsSunFill className="bi me-2 opacity-50 theme-icon" />
                        Light
                        {theme === "light" && (
                          <svg className="bi ms-auto">
                            <use href="#check2"></use>
                          </svg>
                        )}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className={`dropdown-item ${
                          theme === "dark" ? "active" : ""
                        }`}
                        onClick={() => handleThemeChange("dark")}
                      >
                        <BsMoonStarsFill className="bi me-2 opacity-50 theme-icon" />
                        Dark
                        {theme === "dark" && (
                          <svg className="bi ms-auto">
                            <use href="#check2"></use>
                          </svg>
                        )}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className={`dropdown-item ${
                          theme === "auto" ? "active" : ""
                        }`}
                        onClick={() => handleThemeChange("auto")}
                      >
                        <BsCircleHalf className="bi me-2 opacity-50 theme-icon" />
                        System
                        {theme === "auto" && (
                          <svg className="bi ms-auto">
                            <use href="#check2"></use>
                          </svg>
                        )}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <a
                class="btn btn-link d-lg-none fs-4 p-0"
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
                style={{ marginTop: "0.875rem" }}
              >
                <i class="bi bi-three-dots-vertical"></i>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">
            Truetiesdating
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body p-0">
          <ul className="navbar-nav">
            {show === false && (
              <React.Fragment>
                <li className="nav-item d-lg-none">
                  <Link to="/login" className="nav-link">
                    <BsBoxArrowInRight fill="#df314d" size={20} /> Login
                  </Link>
                </li>
                <li className="nav-item d-lg-none">
                  <Link to="/register" className="nav-link">
                    <BsPerson fill="#df314d" size={20} /> Signup
                  </Link>
                </li>
              </React.Fragment>
            )}
            {show === true && (
              <React.Fragment>
                <li className="nav-item active">
                  <Link to="/dashboard" className="nav-link">
                    <BsSpeedometer2 fill="#df314d" size={18} />{" "}
                    <span className="text-only">Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-gift" className="nav-link">
                    <BsGift
                      fill="#df314d"
                      size={18}
                      style={{ verticalAlign: "-2px" }}
                    />{" "}
                    <span className="text-only">My Gifts</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-story" className="nav-link">
                    <BsBook fill="#df314d" size={18} />{" "}
                    <span className="text-only">My Success Story</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/message" className="nav-link">
                    <BsChatSquareHeart fill="#df314d" size={18} />{" "}
                    <span className="text-only">Messages</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-interest" className="nav-link">
                    <BsHandThumbsUp fill="#df314d" size={18} />{" "}
                    <span className="text-only">My interests</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-profile-view" className="nav-link">
                    <BsEye fill="#df314d" size={18} />{" "}
                    <span className="text-only">My profile views</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-favourite" className="nav-link">
                    <BsHeart fill="#df314d" size={18} />{" "}
                    <span className="text-only">My favorites</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/interested-in-me" className="nav-link">
                    <BsHandThumbsUp fill="#df314d" size={18} />{" "}
                    <span className="text-only">Interested In Me</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/viewed-my-profile" className="nav-link">
                    <BsEye fill="#df314d" size={18} />{" "}
                    <span className="text-only">Viewed my profile</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/their-favourite" className="nav-link">
                    <BsHeart fill="#df314d" size={18} />{" "}
                    <span className="text-only">I'm their favorite</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-interest" className="nav-link">
                    <BsHandThumbsUp fill="#df314d" size={18} />{" "}
                    <span className="text-only">My interests</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-favourite" className="nav-link">
                    <BsHeart fill="#df314d" size={18} />{" "}
                    <span className="text-only">My favorites</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-profile-view" className="nav-link">
                    <BsEye fill="#df314d" size={18} />{" "}
                    <span className="text-only">Profiles I viewed</span>
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
