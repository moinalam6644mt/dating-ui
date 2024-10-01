import React, { useEffect, useState, useCallback, useContext } from "react";
import gbflag from "../../assets/images/flags/gb.svg";
import aeflag from "../../assets/images/flags/ae.svg";
import seflag from "../../assets/images/flags/se.svg";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import UploadProfile from "../Dashboard/MyProfile/child/UploadProfile";
import AuthUser from "../Authentication/AuthUser/AuthUser";
import AuthContext from "../ContextApi/AuthProvider";
import { BsBook, BsChatSquareHeart, BsEye, BsGift, BsHandThumbsUp, BsPencilSquare, BsPlus, BsSpeedometer2, BsClockHistory, BsActivity, BsHeart } from "react-icons/bs";

const Sidebar = () => {
  const { CallApi } = AuthUser();
  const {allLanguageKey} =useContext(AuthContext)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [recentMenu, setRecentMenu] = useState(false);
  const [activetMenu, setActiveMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [userProfileData, setUserProfileData] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    changeMenu();
    if(isSidebarOpen){
      changeMenu();
    }else{
      RemoveMenuClass();
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const ShowRecentMenu = () => {
    setRecentMenu(!recentMenu);
    setActiveMenu(false); // Close other menu when this opens
  };

  const ShowActiveMenu = () => {
    setActiveMenu(!activetMenu);
    setRecentMenu(false); // Close other menu when this opens
  };

  const FetchUserDetails = useCallback(async () => {
    try {
      const response = await CallApi({
        api: `/common_profile_details`,
        method: "GET",
      });
      if (response && response.status === 1) {
        setUserProfileData(response);
      }
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  }, [CallApi]);

  useEffect(() => {
    FetchUserDetails();
  }, []);

  const changeMenu = () => {
    document.documentElement.className = "js cssanimations mm-opened mm-blocking mm-background mm-opening";
    document.body.className="sidebar-collapse"
  } 

  const RemoveMenuClass=()=>{
    document.documentElement.className = "js cssanimations mm-opened mm-blocking mm-background mm-opening";
    document.body.className=""
  }

  return (
    <React.Fragment>
      <style>
        {`
          .photo {
            position: relative;
            width: 163px;
            margin: 10px auto;
            padding: 5px;
            border: 1px solid #ece5e5;
            border-radius: 3px;
          }
          .photo img {
            object-fit: cover;
          }
          span.remove_uploaded {
            position: absolute;
            right: 15px;
            top: 10px;
            padding: 5px 11px 4px 11px;
            background-color: black;
            color: white;
            border-radius: 50%;
            opacity: 0.7;
            cursor: pointer;
          }
          .dashboard-sidebar.collapsed {
            width: 80px;
            transition: width 0.3s ease;
          }
          .btn-toggle-sidebar {
            cursor: pointer;
          }
          .bi-arrow-left,
          .bi-arrow-right {
            font-size: 24px;
          }
          .responsive-img {
            object-fit: cover;
          }
        `}
      </style>
      <div
        className={`dashboard-sidebar d-none d-lg-block ${
          isSidebarOpen ? "" : "collapsed"
        }`}
      >
        <div className="dashboard-sidebar-inner">
          <a className="btn-toggle-sidebar" onClick={toggleSidebar}>
            {isSidebarOpen ? (
              <i className="bi bi-arrow-left"></i>
            ) : (
              <i className="bi bi-arrow-right"></i>
            )}
          </a>
          <div className="dashboard-nav-container">
            <div className="dashboard-nav">
              <div className="dashboard-nav-inner">
                <div className="profile">
                  <span className="profilePic">
                    <img
                      src={
                        userProfileData?.data?.logo ||
                        "https://truetiesdating.com/assets/images/no_img_male.png"
                      }
                      alt="User Profile"
                      className="rounded-circle responsive-img"
                      height="120"
                      width="120"
                    />
                    <a
                      className="cam_icon"
                      onClick={handleShow}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="bi bi-image"></i>
                    </a>
                  </span>                                  
                  <div className="text-center">
                    <h4 className="text-capitalize mb-3">
                      {userProfileData?.data?.name || "User"}
                      <Link to="/my-profile/edit/profile" className="ms-3 ">
                        <svg className="bi">
                          <BsPencilSquare />
                        </svg>
                      </Link>
                    </h4>
                    <span className="total-coin sm">
                      <img
                        src="https://truetiesdating.com/assets/images/10693245.png"
                        alt="Coin"
                        height="20"
                        width="20"
                      />{" "}
                      {userProfileData?.data?.balance || 0}
                      <Link to="/message_plan">
                        <BsPlus size={24} />
                      </Link>
                    </span>
                  </div>
                </div>

                <ul className="listMenu">
                  <li className="active">
                    <Link to="/dashboard">
                      <BsSpeedometer2 fill="#df314d" size={18} />{" "}
                      <span className="text-only">{allLanguageKey?.dashboard}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-gift">
                      <BsGift fill="#df314d" size={18} style={{verticalAlign: '-2px'}} />{" "}
                      <span className="text-only">{allLanguageKey?.my_gifts}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-story">
                      <BsBook fill="#df314d" size={18} />{" "}
                      <span className="text-only">{allLanguageKey?.success_stories}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/message">
                      <BsChatSquareHeart fill="#df314d" size={18} />{" "}
                      <span className="text-only">{allLanguageKey?.message}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-interest">
                      <BsHandThumbsUp fill="#df314d" size={18} />{" "}
                      <span className="text-only">{allLanguageKey?.my_interests}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-profile-view">
                      <BsEye fill="#df314d" size={18} />{" "}
                      <span className="text-only">{allLanguageKey?.my_profile_views}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-favourite">
                      <BsHeart fill="#df314d" size={18} />{" "}
                      <span className="text-only">{allLanguageKey?.my_favorites}</span>
                    </Link>
                  </li>

                  <li className={recentMenu ? "active-submenu" : ""}>
                    <a onClick={ShowRecentMenu}>
                    <BsActivity fill="#df314d" size={18} />{" "}
                      <span className="text-only">{allLanguageKey?.recent_activity}</span>
                    </a>
                    <ul className="dropdown-nav">
                      <li>
                        <Link to="/interested-in-me">
                          <BsHandThumbsUp fill="#df314d" size={18} />{" "}
                          <span className="text-only">{allLanguageKey?.interested_in_me}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/viewed-my-profile">
                          <BsEye fill="#df314d" size={18} />{" "}
                          <span className="text-only">{allLanguageKey?.viewed_my_profile}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/their-favourite">
                          <BsHeart fill="#df314d" size={18} />{" "}
                          <span className="text-only">{allLanguageKey?.Im_their_favorite}</span>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className={activetMenu ? "active-submenu" : ""}>
                    <a onClick={ShowActiveMenu}>
                      <BsClockHistory fill="#df314d" size={18} />{" "}
                      <span className="text-only">{allLanguageKey?.activity_from_me}</span>
                    </a>
                    <ul className="dropdown-nav">
                      <li>
                        <Link to="/my-interest">
                        <BsHandThumbsUp fill="#df314d" size={18} />{" "}
                          <span className="text-only">{allLanguageKey?.my_interests}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/my-favourite">
                          <BsHeart fill="#df314d" size={18} />{" "}
                          <span className="text-only">{allLanguageKey?.my_favorites}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/my-profile-view">
                          <BsEye fill="#df314d" size={18} />{" "}
                          <span className="text-only">{allLanguageKey?.profiles_I_viewed}</span>
                        </Link>
                      </li>
                      
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Upload Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadProfile onClose={handleClose} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Sidebar;
