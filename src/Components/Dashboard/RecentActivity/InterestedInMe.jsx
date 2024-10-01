import React,{useState, useContext} from "react";
import Modal from "react-bootstrap/Modal";
import UploadProfile from "../MyProfile/child/UploadProfile";
import AuthContext from "../../ContextApi/AuthProvider";

const InterestedInMe = () => {
const {allLanguageKey} =useContext(AuthContext)

	const [show,setShow]=useState(false)

	const handleClose=()=>{
		setShow(false)
	  }
	
	  const handleShow=()=>{
		setShow(true)
	  }

  return (
    <React.Fragment>
      <div className="dashboard-content-inner">
        <div
          id="interest_me_users_container"
          className="allUser row gx-3 row-cols-xxl-5"
        >
          {" "}
          <article className="col-xxl-12">
            <div id="card-alert" className="not-result-found">
              <h3>{allLanguageKey?.account_no_user_shown_interest_on_you}.</h3>
              <p className="mx-auto">
              {allLanguageKey?.account_interest_me_para}.
              </p>
              <div className="noavatar">
                <img
                  src="https://truetiesdating.com/assets/images/icon-girl.png"
                  alt=""
                  height="84"
                  width="84"
                />
              </div>
              <a className="btn btn-outline-primary" onClick={handleShow} style={{ minWidth: "200px" }}>
                <span>{allLanguageKey?.account_upload_profile_photo}</span> <i className="bi bi-person"></i>
              </a>
            </div>
          </article>
        </div>
        <div className="text-center mb-3" id="load_more_interest_me_users">
          <a
            href="#"
            className="btn btn-primary ajax_pagination"
            data-bs-target="#interest_me_users_container"
            style={{ display: "none" }}
          >
            Load More
          </a>
        </div>

        <div className="clearfix"></div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Profile Picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UploadProfile />
          </Modal.Body>
        </Modal>
      </>
    </React.Fragment>
  );
};

export default InterestedInMe;
