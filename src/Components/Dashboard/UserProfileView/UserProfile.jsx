import React, { useEffect, useState } from "react";
import About from "./UserAbout";
import Photos from "./UserPhoto";
import UserInfo from "./UserInfo";
import LookingFor from "./UserLooking";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import GiftCardModal from "./GiftCardModal";

const UserProfile = () => {
  const {profile_user_id}=useParams();
const {CallApi}=AuthUser();
const [showModal, setShowModal] = useState(false);
const [publicProfileData,setPublicProfileData]=useState({});


useEffect(()=>{
  FetchPublicProfile();
},[])

const FetchPublicProfile=async()=>{
  try {
    const response = await CallApi({
      api:`/public_profile/${profile_user_id}`,
      method:'GET'
    })
    if(response && response.status===1){
      setPublicProfileData(response)
    }else{
      toast.error(response.msg)
    }
  } catch (error) {
    console.error('data not founds')
  }
}

const addFav = async (userId, isFav) => {
  let response;
  const apiEndpoint = isFav ? "/removeFav" : "/addFav";

  try {
    response = await CallApi({
      api: apiEndpoint,
      method: "UPLOAD",
      data: { user: userId },
    });

    if (response && response.status === 1) {
      toast.success(response.msg);
      publicProfileData();
    } else {
      toast.error(response.msg || "Failed to update favorites.");
    }
  } catch (error) {
    console.error("API request failed:", error);
    toast.error("Failed to update favorites.");
  }
};

const sendInterest = async (userId, isInterestSent) => {
  let response;
  const apiEndpoint = isInterestSent ? "/removeInterest" : "/addInterest";

  try {
    response = await CallApi({
      api: apiEndpoint,
      method: "UPLOAD",
      data: { user: userId },
    });

    if (response && response.status === 1) {
      toast.success(response.msg);
      publicProfileData();
    } else {
      toast.error(response.msg || "Failed to update interest.");
    }
  } catch (error) {
    console.error("API request failed:", error);
    toast.error("Failed to update interest.");
  }
};

const addBlock = async (userId, isBlock) => {
  let response;
  const apiEndpoint = isBlock ? "/block" : "/unblock";

  try {
    response = await CallApi({
      api: apiEndpoint,
      method: "UPLOAD",
      data: { user: userId },
    });

    if (response && response.status === 1) {
      toast.success(response.msg);
      publicProfileData();
    } else {
      toast.error(response.msg || "Failed to update Block.");
    }
  } catch (error) {
    console.error("API request failed:", error);
    toast.error("Failed to update Block.");
  }
}

const handleClose = () => {
  setShowModal(false);
};

const GiftCard=()=>{
  setShowModal(true)
}

console.log(publicProfileData?.user_profile_data?.name)

  return (
    <React.Fragment>
      <div className="dashboard-content-inner">
        <div className="card mb-4 profileCard">
          <div className="card-content">
            <div className="d-md-flex align-items-center user text-center text-md-start">
              <img
                src="https://truetiesdating.com/assets/uploads/cropped_195c266e100d2581c1cc76b18d5a26b0.png"
                alt="Profile"
                className="avatar circle me-md-4 mb-2 mb-md-0"
              />
              <div className="flex-grow-1 mb-2 mb-md-0">
                <h3>
                  <b>{publicProfileData?.user_profile_data?.name}, {publicProfileData?.user_profile_data?.age}</b>
                  <a className="ms-1">
                    <i className="zmdi zmdi-circle grey-text f12"></i>
                  </a>
                  <a hidden={true} className="ms-3">
                    <i className="zmdi zmdi-comment-alt text-green"></i>
                  </a>
                  <a className="ms-3">
                    <i className="zmdi zmdi-comment-alt grey-text"></i>
                  </a>
                </h3>
                <p>{publicProfileData?.user_profile_data?.countryLive}, {publicProfileData?.user_profile_data?.stateLive}</p>
                <ul className="action" style={{ overflow: "visible"}}>
                  <li><a title="Send interest" onClick={()=>sendInterest(profile_user_id)}><i className="bi bi-hand-thumbs-up"></i></a></li>
                  <li><a onClick={() => addFav(profile_user_id )} title="Add to favorite"><i className="bi bi-heart"></i></a></li>
                  <li><a title="Block" onClick={() => addBlock(profile_user_id )}><i className="bi bi-lock-fill"></i></a></li>
                  <li>
                    <a onClick={GiftCard} title="Send gift" style={{ width: "auto", height: "auto", border: "none", marginTop: "-1rem" }}>
                      <img src="https://truetiesdating.com/assets/images/12516571.png" alt="Send gift" height="48" width="48" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0">
                <h2 className="mb-0">{publicProfileData?.percent_match}<small>% <span className="uppercase">Match</span></small></h2>
              </div>
            </div>
          </div>
        </div>

        <ul className="nav nav-underline mb-3" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link active" id="about-tab" data-bs-toggle="tab" href="#about" role="tab" aria-controls="about" aria-selected="true">
              About
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="photos-tab" data-bs-toggle="tab" href="#photos" role="tab" aria-controls="photos" aria-selected="false">
              Photos
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="user-info-tab" data-bs-toggle="tab" href="#user-info" role="tab" aria-controls="user-info" aria-selected="false">
              User Info
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" id="looking-for-tab" data-bs-toggle="tab" href="#looking-for" role="tab" aria-controls="looking-for" aria-selected="false">
              Looking for
            </a>
          </li>
        </ul>

        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="about" role="tabpanel" aria-labelledby="about-tab">
            <About publicProfileData={publicProfileData}/>
          </div>
          <div className="tab-pane fade" id="photos" role="tabpanel" aria-labelledby="photos-tab">
            <Photos publicProfileData={publicProfileData} />
          </div>
          <div className="tab-pane fade" id="user-info" role="tabpanel" aria-labelledby="user-info-tab">
            <UserInfo publicProfileData={publicProfileData}/>
          </div>
          <div className="tab-pane fade" id="looking-for" role="tabpanel" aria-labelledby="looking-for-tab">
            <LookingFor publicProfileData={publicProfileData}/>
          </div>
        </div>
      </div>


      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header>
          <div className="">
            <div className="text-center">
              <b>Send a gift</b>
            </div>
          </div>
          <button
            type="button"
            class="btn-close"
            onClick={handleClose}
            aria-label="Close"
          ></button>


        </Modal.Header>
        <Modal.Body className="modal-scrollable">
          <GiftCardModal userId={profile_user_id} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default UserProfile;
