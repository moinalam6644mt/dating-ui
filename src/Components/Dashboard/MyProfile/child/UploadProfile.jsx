import React, { useState, useRef } from "react";
import AuthUser from "../../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const UploadProfile = ({handleClose ,setImgLink}) => {
  const { CallApi } = AuthUser();
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);


  // Handle file input change and load the image
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Crop the image and set the cropped image as a Data URL
  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const cropped = cropper.getCroppedCanvas().toDataURL("image/jpeg");
      setCroppedImage(cropped);
    }
  };

  const handleSubmit = async (e) => {
    handleCrop();
    e.preventDefault();
    if (!croppedImage) {
      toast.error("No image cropped");
      return;
    }

    try {
      await UploadFile(croppedImage);
    } catch (error) {
      toast.error("Error uploading data");
    }
  };

  const UploadFile = async (base64) => {
    try {
      const response = await CallApi({
        api: "/uploadProfilePic",
        method: "UPLOAD",
        data:{
          picture:base64
        }
      });

      if (response && response.status === 1) {
        setImgLink(response.image_url)
        toast.success("Image uploaded successfully");
        handleClose();
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      toast.error("Error uploading data");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="custom-file file-with-border">
        <input
          type="file"
          className="custom-file-input"
          id="profile_pic_file"
          onChange={handleChangeFile}
          accept="image/*"
        />
        <label className="custom-file-label" htmlFor="profile_pic_file">
          <img
            src="https://truetiesdating.com/assets/images/camera_icon_96.png"
            alt="pic"
          />
          <h4>Add photo</h4>
        </label>
      </div>

      <p
        className="error text-center"
        style={{ display: "none" }}
        id="file_type_error"
      >
        Invalid file type
      </p>
      <div
        className="progress"
        id="profile_pic_progress"
        style={{ display: "none" }}
      >
        <div className="determinate" style={{ width: "0%" }}></div>
      </div>

      {image && (
        <div>
          <Cropper
            src={image}
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            ref={cropperRef}
          />
          <button
            type="hidden"
            className="btn btn-primary mt-2"
            onClick={handleCrop}
          >
            Upload
          </button>
        </div>
      )}

      {/* <button
        type="submit"
        className="btn btn-danger p-1 justify-content-center mt-3"
      >
        Upload
      </button> */}
    </form>
  );
};

export default UploadProfile;
