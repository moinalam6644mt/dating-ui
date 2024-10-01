import React, { useEffect, useState , useContext } from "react";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";
import AuthContext from "../../ContextApi/AuthProvider";

const MyStory = () => {
const {allLanguageKey} =useContext(AuthContext)

  const { CallApi } = AuthUser();
  const [formData, setFormData] = useState({
    couple_name: "",
    story: "",
    pre_picture: "",
    file: "",
  });
  const [imgPath, setImgPath] = useState();
  const [errors, setErrors] = useState({});
  const [reviewImg, setReviewImg] = useState(); 

  useEffect(() => {
    FetchSuccessStory();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.couple_name)
      newErrors.coupleNameError = "Couple name is required";
    if (!formData.story) newErrors.storyError = "Story is required";
    if (!formData.picture && !reviewImg)
      newErrors.fileError = "Image file is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const FetchSuccessStory = async () => {
    try {
      const response = await CallApi({
        api: `/edit_success_story`,
        method: "GET",
      });
      if (response && response.success_story) {
        const storyData = response.success_story;
        setFormData({
          couple_name: storyData.couple_name || "",
          story: storyData.story || "",
          pre_picture: storyData.picture || "",
        });
        setImgPath(response.pic_link);
      } else {
        toast.error("Data not found");
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await CallApi({
          api: "/update_success_story",
          method: "UPLOAD",
          data: formData,
        });
        if (response) {
          toast.success("Data updated successfully");
          setReviewImg('')
          FetchSuccessStory();
        }
      } catch (error) {
        toast.error("An error occurred while updating the story");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
      setReviewImg(URL.createObjectURL(file));
    }
  };

  const uploadFile = async (file) => {
    let response;
    try {
      const formData = new FormData();
      formData.append("fileinput", file);

      response = await CallApi({
        api: "/upload_couple_image",
        method: "POST",
        data: formData,
      });

      if (response) {
        setFormData((prevData) => ({
          ...prevData,
          file: response.file_name,
        }));
        
        toast.success("File uploaded successfully");
      } else {
        toast.error(response.message || "File upload failed");
      }
    } catch (error) {
      toast.error("An error occurred during file upload");
    }
  };


  return (
    <div className="dashboard-content-inner">
      <div className="row">
        <aside className="col-xl-9 col-lg-8 col-12">
          <div className="card">
            <div className="card-header">
              <h4>
                <b>{allLanguageKey?.success_story}</b>
              </h4>
            </div>
            <div className="card-body">
              <form id="story_form" onSubmit={handleSubmit}>
                <input type="hidden" name="ID" value="38" />

                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    name="couple_name"
                    value={formData.couple_name}
                    onChange={handleInputChange}
                    placeholder="Couple Name"
                  />
                  <label htmlFor="couple_name">Couple Name</label>
                  {errors.coupleNameError && (
                    <div className="error">{errors.coupleNameError}</div>
                  )}
                </div>

                <div className="form-floating mb-3">
                  <textarea
                    name="story"
                    className="form-control"
                    placeholder="Your Story"
                    style={{ minHeight: "100px" }}
                    value={formData.story}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="story">Story</label>
                  {errors.storyError && (
                    <div className="error">{errors.storyError}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label d-block" htmlFor="name">
                    Previous Couple Image
                  </label>
                  {formData.pre_picture && imgPath && (
                    <img
                      src={`${imgPath}${formData.pre_picture}`}
                      height="96"
                      alt="Previous Couple"
                    />
                  )}
                </div>

                <div className="file-with-border mb-3">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                  />
                  <label className="custom-file-label" htmlFor="file">
                    Upload file
                  </label>
                </div>

                {errors.fileError && (
                  <div className="error">{errors.fileError}</div>
                )}

                {/* Image preview of the newly uploaded file */}
                {reviewImg && (
                  <div className="mb-3">
                    <label className="form-label d-block" htmlFor="name">
                      New Uploaded Image Preview
                    </label>
                    <img src={reviewImg} height="96" alt="New Preview" />
                  </div>
                )}

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MyStory;
