import React ,{useContext} from 'react';
import AuthContext from '../../ContextApi/AuthProvider';

const MyGift = ({ data }) => {
const {allLanguageKey} =useContext(AuthContext)
  return (
    <React.Fragment>
      {data ? (
        <div className="dashboard-content-inner">
          <div id="gifts_container" className="allUser row gx-3 row-cols-xxl-5">
            <article className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
              <div className="card card-gift" id="user_10">
                {/* Avatar */}
                <div className="card-image text-center">
                  <a href="#">
                    <img
                      src="http://localhost/eroflirts-credit/admin/assets/images/5779a3373369492f22e313a179e31e8f.png"
                      alt="pic"
                      height="150"
                      width="150"
                    />
                  </a>
                  <p>name1</p>
                </div>
                <div className="card-body">
                  <div className="d-flex">
                    <a href="http://localhost/eroflirts-credit/account/public_profile/38/Cristian">
                      <img
                        src="http://localhost/eroflirts-credit/assets/uploads/cropped_170776da1b6b00c8c4fe12358f7c8db2.png"
                        alt="pic"
                        className="rounded-circle"
                        height="50"
                        width="50"
                      />
                    </a>
                    <div className="flex-grow-1 ps-2">
                      <h5>
                        <a href="http://localhost/eroflirts-credit/account/public_profile/38/name1">
                          Cristian, 34{' '}
                        </a>
                        <span className="offline-badge"></span>
                      </h5>
                      <p>
                        <i className="bi bi-geo-alt"></i> al-Aghwat, Algeria
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div className="text-center mb-3" id="load_more_gifts">
            <a
              href="#"
              className="btn btn-primary ajax_pagination"
              data-bs-target="#gifts_container"
              style={{ display: 'none' }}
            >
              Load More
            </a>
          </div>

          {/* Footer */}
          <div className="dashboard-footer-spacer" style={{ paddingTop: '1px' }}></div>
          <div className="small-footer" hidden="" style={{}}>
            <div className="small-footer-copyrights">
              <p>
                © Copyright 2024{' '}
                <a href="http://localhost/eroflirts-credit/">datingscript.com</a>. All rights are
                reserved. Powered by{' '}
                <a href="https://originatesoft.com/">originatesoft.com</a>
              </p>
            </div>
            <ul className="social-icon">
              <li>
                <a href="https://www.facebook.com/" target="_blank">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/login" target="_blank">
                  <i className="bi bi-twitter-x"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/accounts/login/">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://in.linkedin.com/">
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
            </ul>
            <div className="clearfix"></div>
          </div>
          <div className="small-footer d-lg-none">
            <ul>
              <li>
                <a href="http://localhost/eroflirts-credit/" className="active">
                  <i className="bi bi-house bi-inactive"></i>
                  <i className="bi bi-house-fill bi-active"></i>Home
                </a>
              </li>
              <li>
                <a href="http://localhost/eroflirts-credit/search/people" className="">
                  <i className="bi bi-search-heart bi-inactive"></i>
                  <i className="bi bi-search-heart-fill bi-active"></i>Search
                </a>
              </li>
              <li>
                <a href="http://localhost/eroflirts-credit/account/myprofile" className="">
                  <i className="bi bi-person bi-inactive"></i>
                  <i className="bi bi-person-fill bi-active"></i>Profile
                </a>
              </li>
              <li>
                <a href="http://localhost/eroflirts-credit/chat" className="">
                  <i className="bi bi-chat-text bi-inactive"></i>
                  <i className="bi bi-chat-text-fill bi-active"></i>Message
                </a>
              </li>
            </ul>
          </div>
          {/* Footer / End */}
        </div>
      ) : (
        <div className="dashboard-content-inner">
          <div id="gifts_container" className="allUser row gx-3 row-cols-xxl-5">
            <article className="col-xxl-12">
              <div id="card-alert" className="not-result-found">
                <h3>{allLanguageKey?.account_no_gift}</h3>
                <p className="mx-auto">
                {allLanguageKey?.account_gift_para}
                </p>
              </div>
            </article>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MyGift;
