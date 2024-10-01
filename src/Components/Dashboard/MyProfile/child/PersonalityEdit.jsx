import React, { useEffect, useState } from "react";
import AuthUser from "../../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";

const PersonalityEdit = () => {
  const { CallApi } = AuthUser();
  const [personalityData, setPersonalityData] = useState({});
  const [formData, setFormData] = useState({
    favoriteMovie: "",
    favoriteBook: "",
    favoriteFoodType: "",
    favoriteMusicType: "",
    favoriteHobbis: "",
    physicalAppearance: "",
    senseofHumor: "",
    liktoTravel: "",
    personality: "",
    howRomanticWeekSpand: "",
    perfectMatchPartner: "",
    adaptiveWhenDiffCulture: ""
  });

  useEffect(() => {
    FetchPersonalityData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const FetchPersonalityData = async () => {
    try {
      const response = await CallApi({
        api: `/profilePersonality`,
        method: "GET",
      });

      if (response && response.status === 1) {
        setPersonalityData(response?.personality_data);
        setFormData(response?.personality_data); // Initialize form data with fetched data
      } else {
        toast.error(response?.message || 'Failed to fetch personality data');
      }
    } catch (error) {
      console.error("Error fetching personality data:", error);
      toast.error('Failed to fetch personality data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CallApi({
        api: `/profilePersonalitySave`,
        method: "UPLOAD", 
        data: formData
      });

      if (response && response.status === 1) {
        toast.success(response.msg);
        FetchPersonalityData();
      } else {
        toast.error(response.message || 'Failed to save data');
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error('Failed to save data');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          id="defaultsubmitbypostpersonality"
          name="defaultsubmitbypostpersonality"
          value="defaultsubmitbypostpersonality"
        />
        <h4 className="mb-4">
          <b>Personality profile</b>
        </h4>
        <div className="card">
          <div className="card-body">
            <div className="row mb-4">
              {/** Form fields */}
              {[
                { id: "favoriteMovie", label: "What is your favorite movie?" },
                { id: "favoriteBook", label: "What is your favorite book?" },
                { id: "favoriteFoodType", label: "What is your favorite food?" },
                { id: "favoriteMusicType", label: "What sort of music do you like?" },
                { id: "favoriteHobbis", label: "What are your hobbies and interests?" },
                { id: "physicalAppearance", label: "How would you describe your style and appearance?" },
                { id: "senseofHumor", label: "How would you describe your sense of humor?" },
                { id: "liktoTravel", label: "Where have you traveled or would like to travel to?" },
                { id: "personality", label: "How would you describe your personality?" },
                { id: "howRomanticWeekSpand", label: "How would you spend a perfect romantic weekend?" },
                { id: "perfectMatchPartner", label: "What sort of person would be your perfect match?" },
                { id: "adaptiveWhenDiffCulture", label: "How open are you to having a partner from a different culture?"}
              ].map((field, index) => (
                <div className="col-md-6" key={index}>
                  <div className="form-floating mb-4">
                    <textarea
                      id={field?.id}
                      name={field?.id}
                      className="form-control"
                      value={formData[field?.id] || ''}
                      onChange={handleInputChange}
                      placeholder=""
                      style={{ minHeight: "100px" }}
                    />
                    <label htmlFor={field?.id}>{field?.label}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="d-grid d-md-block">
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalityEdit;
