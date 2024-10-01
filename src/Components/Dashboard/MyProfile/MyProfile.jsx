import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyGalleryList from "../GalleryList/MyGalleryList";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import AuthContext from "../../ContextApi/AuthProvider";

const MyProfile = () => {
  const { CallApi } = AuthUser();
  const {allLanguageKey} =useContext(AuthContext)
  const { myGalleryData ,setMyGalleryData}=useContext(AuthContext)
  const [profileData, setProfileData] = useState();
  const [show, setShow] = useState(false);
  const [galleryPath, setGalleryPath] = useState();
  const [imgPath,setImgPath]=useState()

  useEffect(() => {
  }, []);

  useEffect(() => {
    FetchProfileData();
  }, []);

  const ShowAllImage = (id) => {
    console.log(id)
    setShow(true);
  };

  const FetchProfileData = async () => {
    try {
      const response = await CallApi({
        api: `/myProfile`,
        method: "GET",
      });
      if (response && response.status === 1) {
        setProfileData(response);
        setImgPath(response.galary_img_link)
        setMyGalleryData(response.galary_data)
        setGalleryPath(response.galary_img_link);
      }
    } catch (error) {}
  };


  return (
    <React.Fragment>
      <div className="dashboard-content-inner">
        <div className="card mb-4">
          <div className="card-body">
            <div className="media user">
              <img
                src="https://truetiesdating.com/assets/uploads/cropped_2aaa81d5272416412ac05b74ce0d9b2d.jpg"
                alt=""
                className="avatar circle me-4"
              />
              <div className="media-body action">
                <h3>
                  <b>
                    {profileData?.profile_data?.name},{" "}
                    {profileData?.profile_data?.age}
                    <span className="text-muted ms-2">
                      <i className="zmdi zmdi-circle grey-text f12"></i>
                    </span>
                  </b>
                </h3>
                <p>
                  {profileData?.profile_data?.countryLive} ,
                  {profileData?.profile_data?.stateLive} ,
                  {profileData?.profile_data?.cityLive}
                </p>

                <Link to={`/my-profile/edit`} className="btn btn-primary">
                  <i className="zmdi zmdi-account"></i> {allLanguageKey?.update_info}
                </Link>
              </div>
              <div className="media-right text-end" hidden>
                <h2>
                  95 <small>%</small>
                </h2>
                <h5 className="uppercase">{allLanguageKey?.match}</h5>
                <ul className="pagination action">
                  <li className="page-item">
                    <button className="page-link" title="Send interest">
                      <i className="zmdi zmdi-thumb-up"></i>
                    </button>
                  </li>
                  <li className="page-item">
                    <button
                      className="page-link active"
                      title="Remove from favorite"
                    >
                      <i className="zmdi zmdi-favorite"></i>
                    </button>
                  </li>
                  <li className="page-item">
                    <button className="page-link" title="Send message">
                      <i className="zmdi zmdi-email"></i>
                    </button>
                  </li>
                </ul>
                <a href="#">{allLanguageKey?.report}</a>
              </div>
            </div>
          </div>
        </div>

        <ul className="nav nav-underline mb-3" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              {allLanguageKey?.about}
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              {allLanguageKey?.photos}
            </a>
          </li>
          <li className="nav-item" hidden role="presentation">
            <a
              className="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              href="#contact"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Questions
            </a>
          </li>
        </ul>

        <div className="tab-content mb-3" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5>{allLanguageKey?.account_my_personality}</h5>
                    {profileData?.user_interest?.personality || "Not Available"}
                    <div className="spacer-20"></div>
                    <h5>{allLanguageKey?.account_my_favorite_movie}</h5>
                    {profileData?.user_interest?.favoriteMovie ||
                      "Not Available"}{" "}
                    <div className="spacer-20"></div>
                    <h5>{allLanguageKey?.account_my_favorite_book}</h5>
                    {profileData?.user_interest?.favoriteBook ||
                      "Not Available"}{" "}
                    <div className="spacer-20"></div>
                    <h5>{allLanguageKey?.account_my_favorite_food}</h5>
                    <i>
                      {profileData?.user_interest?.favoriteFood ||
                        "Not Available"}
                    </i>{" "}
                    <div className="spacer-20"></div>
                    <h5>{allLanguageKey?.account_music_i_like}</h5>
                    {profileData?.user_interest?.favoriteMusic ||
                      "Not Available"}{" "}
                    <div className="spacer-20"></div>
                    <h5>{allLanguageKey?.account_my_hobbies_interest}</h5>
                    <i>
                      {profileData?.user_interest?.favoriteHobbis ||
                        "Not Available"}
                    </i>{" "}
                    <div className="spacer-20"></div>
                    <h5>{allLanguageKey?.account_my_dressing_sense}</h5>
                    <i>
                      {profileData?.user_interest?.physicalAppearance ||
                        "Not Available"}
                    </i>{" "}
                    <div className="spacer-20"></div>
                    <h5>{allLanguageKey?.account_my_sense_of_homor}</h5>
                    {profileData?.user_interest?.senseofHumor ||
                      "Not Available"}{" "}
                    <div className="spacer-20"></div>
                    <h5>{allLanguageKey?.account_i_want_to_travel}</h5>
                    {profileData?.user_interest?.liktoTravel ||
                      "Not Available"}{" "}
                    <div className="spacer-20"></div>
                    <h5>{allLanguageKey?.account_my_weekend_plan}</h5>
                    <i>
                      {profileData?.user_interest?.howRomanticWeekSpand ||
                        "Not Available"}
                    </i>{" "}
                    <div className="spacer-20"></div>
                    <h5>{allLanguageKey?.account_my_matching_preference}</h5>
                    <i>
                      {profileData?.user_interest?.perfectMatchPartner ||
                        "Not Available"}
                    </i>{" "}
                    <div className="spacer-20"></div>
                    <h5>{allLanguageKey?.account_my_partner_from_different_culture}</h5>
                    <i>
                      {profileData?.user_interest?.adaptiveWhenDiffCulture ||
                        "Not Available"}
                    </i>{" "}
                    <div className="spacer-20"></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="table-responsive">
                  <table className="table table-bordered bg-white">
                    <tbody>
                      <tr>
                        <th>{allLanguageKey?.sex}</th>
                        <td>
                          {profileData?.profile_data?.gender === "M"
                            ? "Male"
                            : "Female"}
                        </td>
                      </tr>
                      <tr>
                        <th>{allLanguageKey?.language}</th>
                        <td>
                          {profileData?.profile_data?.language ||
                            "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <th>{allLanguageKey?.nationality}</th>
                        <td>
                          {profileData?.profile_data?.nationality ||
                            "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <th>{allLanguageKey?.religion}</th>
                        <td>
                          {profileData?.profile_data?.religion ||
                            "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <th>{allLanguageKey?.looking_for}</th>
                        <td>
                          {profileData?.profile_data?.relationship ||
                            "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <th>{allLanguageKey?.occupation}</th>
                        <td>
                          {profileData?.profile_data?.occupation ||
                            "Not Available"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="card">
              <div className="card-body">
                <div className="row-5">
                  <ul className="gallery" id="gallery-pics">
                    {myGalleryData.map((img, index) => (
                      <li key={index}>
                        <a onClick={()=>ShowAllImage(img.id)} title="">
                          <img
                            src={`${galleryPath}${img.image}`}
                            alt={img.alt || `Gallery image ${index + 1}`}
                            className="responsive-img"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="center">
                  <a className="btn btn-primary btn-small">{allLanguageKey?.view_more}</a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="card">
              <div className="card-body">
                <h4>
                  <b>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium?
                  </b>
                </h4>
                <p>
                  Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                  et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                {/* Add more content as necessary */}
              </div>
            </div>
          </div>
        </div>

        <div
          className="dashboard-footer-spacer"
          style={{ paddingTop: "1px" }}
        ></div>
        <div className="small-footer" hidden>
          <div className="small-footer-copyrights">
            <p>
              © Copyright 2024 <a>datingscript.com</a>. All rights reserved.
              Powered by{" "}
              <a href="https://originatesoft.com/">originatesoft.com</a>
            </p>
          </div>
          <ul className="social-icon">
            <li>
              <a target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook"></i>
              </a>
            </li>
            {/* Add more social icons */}
          </ul>
        </div>

        <div className="small-footer d-lg-none">
          <ul>
            <li>
              <a className="active">
                <i className="bi bi-house bi-inactive"></i>
                <i className="bi bi-house-fill bi-active"></i>Home
              </a>
            </li>
            {/* Add more footer links */}
          </ul>
        </div>
      </div>

      {show === true && <MyGalleryList setShow={setShow} myGalleryData={myGalleryData} imgPath={imgPath}/>}
    </React.Fragment>
  );
};

export default MyProfile;
