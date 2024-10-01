import React, { useState, useEffect,useContext } from 'react';
import AuthUser from '../../../Authentication/AuthUser/AuthUser';
import toast from 'react-hot-toast';
import Modal from 'react-bootstrap/Modal';
import UploadProfile from './UploadProfile';
import AuthContext from '../../../ContextApi/AuthProvider';

const EditPhoto = () => {
  const { CallApi } = AuthUser();
  const {allLanguageKey} =useContext(AuthContext)
  const [show, setShow] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const imageBasePath = 'http://localhost/eroflirts-credit/assets/uploaded_gallery/';
  const [imgLink,setImgLink]=useState();
  const [profileLogo,setProfileLogo]=useState()

  useEffect(() => {
    fetchGalleryImage();
  }, []);

  const handleClose = () => setShow(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    if (files.length === 0) {
      toast.error('Please choose some files first');
      return;
    }

    try {
      const uploadPromises = files.map(file => uploadFile(file));
      const responses = await Promise.all(uploadPromises);

      // Extract new image URLs from the API responses and update gallery
      const newImages = responses.flatMap(response => 
        response.files.map(file => ({ image: file.data.image, id: file.data.id }))
      );
      setGalleryImages(prev => [...prev, ...newImages]);

      setSelectedFiles([]); // Clear selected files after upload
      toast.success('Images uploaded successfully');
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    }
  };

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('files[]', file);

      const response = await CallApi({
        api: '/galleryImageUpload',
        method: 'POST',
        data: formData,
      });

      if (response?.status === 1) {
        return response;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  };

  const fetchGalleryImage = async () => {
    try {
      const response = await CallApi({
        api: '/galleryImages',
        method: 'GET',
      });
      if (response && response.status === 1) {
        setGalleryImages(response.galary_data);
        setProfileLogo(response.profile_logo)
      }
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
    }
  };

  const deleteImg = async (id) => {
    try {
      const formData = new FormData();
      formData.append('imageId', id);

      const response = await CallApi({
        api: '/deleteGalleryImg',
        method: 'POST',
        data: formData,
      });

      if (response?.status === 1) {
        setGalleryImages(prev => prev.filter(img => img.id !== id));
        toast.success('Image deleted successfully');
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete image');
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-xl-6">
                  <h5 className="mb-3">{allLanguageKey?.account_upload_profile_photo}</h5>
                  <form encType="multipart/form-data" method="post">
                    <div className="center-block mb-3">
                      <img
                        src={profileLogo}
                        alt="Profile"
                        className="rounded"
                        width="200"
                        height="200"
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-primary camera"
                      style={{ minWidth: '200px' }}
                      onClick={() => setShow(true)}
                    >
                      <span>{allLanguageKey?.account_upload_profile_photo}</span>
                      <i className="bi bi-person"></i>
                    </button>
                  </form>
                </div>
                <div className="col-xl-6"></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">{allLanguageKey?.account_upload_gallery_photo}</h5>
              <div className="file-with-border mb-3">
                <input
                  type="file"
                  className="custom-file-input"
                  id="img_glry"
                  name="glry_img"
                  multiple
                  onChange={handleFileUpload}
                />
                <label
                  className="custom-file-label"
                  htmlFor="img_glry"
                >
                  Upload one or more files
                </label>
              </div>
              <ul className="gallery" id="user_uploaded_gallery">
                {selectedFiles.length > 0 && selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>

              <h5 className="mb-3">{allLanguageKey?.account_previous_uploaded}</h5>
              <div className="grid row row-cols-xxl-5 gx-3">
                {galleryImages.map((img, index) => (
                  <div
                    key={index}
                    className="col-lg-4 col-md-3 col-sm-4 col-6 grid-item mb-3"
                  >
                    <div className="position-relative">
                      <img
                        src={`${imageBasePath}${img.image}`}
                        alt="Gallery"
                        className="rounded img-fluid"
                      />
                      <i
                        onClick={() => deleteImg(img.id)}
                        className="bi bi-trash3-fill deleteImg position-absolute top-0 end-0"
                        style={{ cursor: 'pointer' }}
                      ></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4" hidden>
          <div className="card">
            <div className="card-content">
              <h5 className="uppercase">{allLanguageKey?.account_upload_a_photo}</h5>
              <button
                type="button"
                className="btn btn-block join fb"
                onClick={() => console.log('Fetch Facebook album')}
              >
                <i className="zmdi zmdi-facebook-box"></i>Connect with Facebook
              </button>
              <form action="#">
                <div className="row-5">
                  <ul className="gallery" id="facebook_gallery"></ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{allLanguageKey?.account_upload_profile_picture}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadProfile handleClose={handleClose} setImgLink={setImgLink}/>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default EditPhoto;
