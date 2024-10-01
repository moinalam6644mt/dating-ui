import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import BasicModal from "./BasicModal";
import AppearanceModal from "./AppearanceModal";
import LifeStyleModal from "./LifeStyleModal";
import CulturalModal from "./CulturalModal";
import CommunicationModal from "./CommunicationModal";
import ContactModal from "./ContactModal";
import OwnWordModal from "./OwnWordModal";
import AuthUser from "../../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";
import AuthContext from "../../../ContextApi/AuthProvider";

const ProfileEdit = () => {
  const { CallApi } = AuthUser();
  const { allLanguageKey } = useContext(AuthContext)
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("");
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    FetchProfileData();
  }, []);

  const handleClose = () => {
    setShow(false);
    setModalType("");
  };

  const handleShow = (type) => {
    setModalType(type);
    setShow(true);
  };

  const FetchProfileData = async () => {
    let response;
    try {
      response = await CallApi({
        api: `/profile_details`,
        method: "GET",
      });

      if (response) {
        setProfileData(response.profile_data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("data did not found");
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If the current month and day are before the birth month and day, subtract one from age
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <React.Fragment>
      <div className="dashboard-content-inner">
        {/* basic info */}
        <div className="row">
          <aside className="col-md-8 col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> {allLanguageKey?.basic} </h4>
                <a
                  className="editInfo"
                  onClick={() => handleShow("basic")}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-pencil-square"></i>
                </a>
              </div>
              <div className="card-body">
                <h4>{profileData?.name}</h4>
                <p>
                  {profileData?.dob && `${calculateAge(profileData?.dob)} Yrs`},
                  {profileData?.gender === "M" ? "Male" : "Female"}
                  <p>
                    {profileData?.countryLive === "0"
                      ? "Not Available "
                      : profileData?.countryLive}{" "}
                    ,
                    {profileData?.stateLive === "0"
                      ? "Not Available "
                      : profileData?.stateLive}
                    ,
                    {profileData?.cityLive === "0"
                      ? "Not Available "
                      : profileData?.cityLive}
                  </p>
                </p>
              </div>
            </div>
          </aside>
        </div>
        {/* apperance */}
        <div className="row">
          <aside className="col-md-8 col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> {allLanguageKey?.appearance}</h4>
                <a
                  classNameName="editInfo"
                  onClick={() => handleShow("appearance")}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-pencil-square"></i>
                </a>
              </div>
              <div className="card-body">
                <ul className="list-info">
                  <li>
                    <b> {allLanguageKey?.hair_color}:</b>
                    {profileData?.hairColor === "0"
                      ? "Not Available "
                      : profileData?.hairColor}
                  </li>
                  <li>
                    <b> {allLanguageKey?.hair_length}:</b> {profileData?.hairLength === "0"
                      ? "Not Available " : profileData?.hairLength}
                  </li>
                  <li>
                    <b> {allLanguageKey?.hair_type}:</b> {profileData?.hairType || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.eye_color}:</b> {profileData?.eyeColor || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.eye_wear}:</b> {profileData?.eyeWear || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.height}:</b> {profileData?.height || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.weight}:</b> {profileData?.weight || " Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.body_type}:</b> {profileData?.bodyType || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.ethnicity}:</b> {profileData?.ethnicity || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.facial_hair}:</b>
                    {profileData?.facialHair || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.best_feature}:</b>
                    {profileData?.bestFeature || "My Arms"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.body_art}:</b>
                    {profileData?.bodyArt || "Branding"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.appearance}:</b>
                    {profileData?.apperance || "Below average"}
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
        {/* lifestyle */}
        <div className="row">
          <aside className="col-md-8 col-12">
            <div className="card d-none-sm">
              <div className="card-header">
                <h4 className="card-title"> {allLanguageKey?.lifestyle}</h4>
                <a
                  classNameName="editInfo"
                  onClick={() => handleShow("lifestyle")}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-pencil-square"></i>
                </a>
              </div>
              <div className="card-body">
                <ul className="list-info">
                  <li></li>
                  <li>
                    <b> {allLanguageKey?.drink}:</b>
                    {profileData?.drink || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.smoke}:</b>
                    {profileData?.smoke || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.marital_status}:</b>
                    {profileData?.maritalStatus || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.have_children}:</b>
                    {profileData?.children || "No"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.occupation}:</b>
                    {profileData?.occupation || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.employment_status}:</b>
                    {profileData?.employmentStatus || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.home_type}:</b>
                    {profileData?.homeType || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.living_situation}:</b>
                    {profileData?.livingSituation || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.willing_to_relocate}:</b>{" "}
                    {profileData?.willingToRelocate || "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.looking_for}:</b>{" "}
                    {profileData?.relationship ||
                      "Any"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.income}:</b>{" "}
                    {profileData?.income ||
                      "Any"}
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* cultural value */}
        <div className="row">
          <aside className="col-md-8 col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> {allLanguageKey?.background_cultural_values}</h4>
                <a
                  className="editInfo"
                  onClick={() => handleShow("cultural")}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-pencil-square"></i>
                </a>
              </div>
              <div className="card-body">
                <ul className="list-info">
                  <li>
                    <b> {allLanguageKey?.nationality}:</b>
                    {profileData?.nationality || ""}
                  </li>
                  <li>
                    <b> {allLanguageKey?.religion}:</b> {profileData?.religion || "Not Available"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.star_sign}:</b>
                    {profileData?.starSign || "Not Available"}
                  </li>
                  <li>
                    <b> {allLanguageKey?.education}:</b>{" "}
                    {profileData?.education || " Not Available"}
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
        {/* communication language */}
        <div className="row">
          <aside className="col-md-8 col-12">
            <div className="card d-none-sm">
              <div className="card-header">
                <h4 className="card-title"> {allLanguageKey?.language}</h4>
                <a
                  className="editInfo"
                  onClick={() => handleShow("communication")}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-pencil-square"></i>
                </a>
              </div>
              <div className="card-body">
                <ul className="list-info">
                  {profileData?.communication_language?.length > 0 ? (
                    profileData.communication_language.map((language, index) => (
                      <li key={index}>
                        <strong> {allLanguageKey?.language}:</strong> {language.lang_name} |{" "}
                        <strong> {allLanguageKey?.income}:</strong> {language.ability_name}
                      </li>
                    ))
                  ) : (
                    <li> {allLanguageKey?.not_available}</li>
                  )}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* contact */}
        <div className="row">
          <aside className="col-md-8 col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> {allLanguageKey?.contacts}</h4>
                <a
                  className="editInfo"
                  onClick={() => handleShow("contact")}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-pencil-square"></i>
                </a>
              </div>
              <div className="card-body">
                <ul className="list-info">
                  <li>
                    <b> {allLanguageKey?.phone_number}:</b> {profileData?.contactNo || 'Not Available'}
                  </li>
                  <li>
                    <b> {allLanguageKey?.viver_id}:</b> {profileData?.viverId || 'Not Available'}
                  </li>
                  <li>
                    <b> {allLanguageKey?.skype_id}:</b> {profileData?.skypeId || 'Not Available'}
                  </li>
                  <li>
                    <b> {allLanguageKey?.facebook_id}:</b> {profileData?.facebookId || 'Not Available'}
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* own words */}
        <div className="row">
          <aside className="col-md-8 col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> {allLanguageKey?.own_words}</h4>
                <a
                  className="editInfo"
                  onClick={() => handleShow("word")}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-pencil-square"></i>
                </a>
              </div>
              <div className="card-body">
                <p>
                  <b> {allLanguageKey?.heading}:</b>
                </p>
                <p>{profileData?.profileHeading || 'Not Available'}</p>
                <div className="spacer-20"></div>
                <p>
                  <b> {allLanguageKey?.about_me}:</b>
                </p>
                <p>{profileData?.about || 'Not Available'}</p>
                <div className="spacer-20"></div>
                <p>
                  <b> {allLanguageKey?.what_i_prefer_in_my_partner}:</b>
                </p>
                <p>{profileData?.partnerPreference || 'Not Available'}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalType === "basic" && "Edit Basic Information"}
              {modalType === "appearance" && "Edit Appearance"}
              {modalType === "lifestyle" && "Edit Lifestyle"}
              {modalType === "cultural" && "Edit Cultural Values"}
              {modalType === "communication" && "Edit Communication Values"}
              {modalType === "contact" && "Edit Contact Details"}
              {modalType === "word" && "Edit Own Words"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalType === "basic" && <BasicModal handleClose={handleClose} FetchProfileData={FetchProfileData} />}
            {modalType === "appearance" && <AppearanceModal handleClose={handleClose} FetchProfileData={FetchProfileData} />}
            {modalType === "lifestyle" && <LifeStyleModal handleClose={handleClose} FetchProfileData={FetchProfileData} />}
            {modalType === "cultural" && <CulturalModal handleClose={handleClose} FetchProfileData={FetchProfileData} />}
            {modalType === "communication" && <CommunicationModal handleClose={handleClose} FetchProfileData={FetchProfileData} />}
            {modalType === "contact" && <ContactModal handleClose={handleClose} FetchProfileData={FetchProfileData} />}
            {modalType === "word" && <OwnWordModal handleClose={handleClose} FetchProfileData={FetchProfileData} />}
          </Modal.Body>
        </Modal>
      </>
    </React.Fragment>
  );
};

export default ProfileEdit;
