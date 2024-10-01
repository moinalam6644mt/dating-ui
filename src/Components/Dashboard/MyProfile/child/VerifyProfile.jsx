import React, { useEffect, useState, useContext } from 'react';
import AuthUser from '../../../Authentication/AuthUser/AuthUser';
import toast from 'react-hot-toast';
import AuthContext from '../../../ContextApi/AuthProvider';

const VerifyProfile = () => {
  const { CallApi } = AuthUser();
  const {allLanguageKey} =useContext(AuthContext)
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [documentData, setDocumentData] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [updatedDocument, setUpdatedDocument] = useState(null);

  useEffect(() => {
    FetchDocument();
  }, []);

  const handleChangeFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create a preview URL for the selected file
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const FetchDocument = async () => {
    try {
      const response = await CallApi({
        api: `/getDocument`,
        method: 'GET',
      });
      if (response && response.status === 1) {
        setDocumentData(response.data);
        setUpdatedDocument(response);
        setPreviewUrl(response?.doc_link +response?.user_document?.file)
      } else {
        setDocumentData(null);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please upload a document');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await CallApi({
        api: '/documentUpload',
        method: 'POST',
        data: formData,
      });
      if (response && response.status === 1) {
        toast.success('Document uploaded successfully. Verification is under process.');
        FetchDocument(); // Refresh document status after uploading
      } else {
        toast.error('Failed to upload document');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to upload document');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4><b>{allLanguageKey?.account_verification_status}</b></h4>
        <div className="alert alert-info">
        {allLanguageKey?.account_verification_status_des}.
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <h5><b>{allLanguageKey?.account_your_current_profile_verification_result}:</b></h5>
            {documentData ? (
              <>
                <p>Your profile is currently<b>{documentData.verify_status === 'P' ? 'pending verification' : 'verified'}</b>. The document you uploaded is:</p>
                <p>{documentData.org_file_name}</p>
                {documentData.verify_status === 'P' && <p>{allLanguageKey?.account_your_uploaded_document_verification_is_under_process}.</p>}
                <p>
                  <a
                    href={`${updatedDocument?.doc_link}${documentData?.data?.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Uploaded Document
                  </a>
                </p>
              </>
            ) : (
              <p>{allLanguageKey?.account_your_profile_is_not_verified_to_verify_your_profile_upload_a_copy_of_an_identification_document_that_contains_your_name_and_a_photo}.</p>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <img
              src="https://truetiesdating.com/assets/images/id_not_verified.png"
              alt="Verification Status"
              style={{ verticalAlign: 'middle' }}
            />
            <span>{allLanguageKey?.account_provide_more_evidence_to_get_badge}</span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card h-100-1">
              <div className="card-body">
                <p><b>{allLanguageKey?.account_upload_verification_document_image}</b></p>
                <div className="uploadButton mb-3">
                  <input
                    className="uploadButton-input"
                    type="file"
                    accept="image/*, application/pdf"
                    id="docFile"
                    name="docFile"
                    onChange={handleChangeFile}
                  />
                  <label className="uploadButton-button" htmlFor="docFile">
                  {allLanguageKey?.upload_documents}
                  </label>
                  &nbsp;<span id="filename">{file ? file.name : 'No file selected'}</span>
                </div>
                {error && <div className="error">{error}</div>}
                {/* Display the preview image if available */}
                {previewUrl && (
                  <div className="docPreview">
                    <img src={previewUrl} alt="Document Preview" className="img-thumbnail" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <p><b>{allLanguageKey?.account_why_verify_my_profile}?</b></p>
                <p>
                {allLanguageKey?.account_why_verify_my_profile_des}.
                </p>
                <ul className="list list-2">
                  <li>{allLanguageKey?.account_why_verify_my_profile_des1}</li>
                  <li>{allLanguageKey?.account_why_verify_my_profile_des2}</li>
                  <li>{allLanguageKey?.account_why_verify_my_profile_des3}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="d-grid d-md-block">
          <button className="btn btn-primary" type="submit">
          {allLanguageKey?.save}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyProfile;
