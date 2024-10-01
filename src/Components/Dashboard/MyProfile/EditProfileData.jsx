import React, { useState, useContext } from "react";
import EditPhoto from "./child/EditPhoto";
// Import other components as needed for each section
import ProfileEdit from "./child/ProfileEdit";
import MatchEdit from "./child/MatchEdit";
import InterestEdit from "./child/InterestEdit";
import PersonalityEdit from "./child/PersonalityEdit";
import VerifyProfile from "./child/VerifyProfile";
import { useParams } from "react-router-dom";
import AuthContext from "../../ContextApi/AuthProvider";


const EditProfileData = () => {
  const { name } = useParams();
  const [activeTab, setActiveTab] = useState(name);
  const { allLanguageKey } = useContext(AuthContext)

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "photos":
        return <EditPhoto />;
      case "profile":
        return <ProfileEdit />;
      case "match":
        return <MatchEdit />;
      case "interest":
        return <InterestEdit />;
      case "personality":
        return <PersonalityEdit />;
      case "verify":
        return <VerifyProfile />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-content-inner">
      <ul className="nav nav-underline mb-3" style={{ cursor: "pointer" }}>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "photos" ? "active" : ""}`}
            onClick={() => handleTabClick("photos")}
          >
            {allLanguageKey?.photos}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => handleTabClick("profile")}
          >
            {allLanguageKey?.profile}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "match" ? "active" : ""}`}
            onClick={() => handleTabClick("match")}
          >
            {allLanguageKey?.match}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "interest" ? "active" : ""}`}
            onClick={() => handleTabClick("interest")}
          >
            {allLanguageKey?.interest}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "personality" ? "active" : ""}`}
            onClick={() => handleTabClick("personality")}
          >
            {allLanguageKey?.personality}
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "verify" ? "active" : ""}`}
            onClick={() => handleTabClick("verify")}
          >
            {allLanguageKey?.verify_profile}
          </a>
        </li>
      </ul>

      {/* Render the content based on the active tab */}
      {renderTabContent()}
    </div>
  );
};

export default EditProfileData;
