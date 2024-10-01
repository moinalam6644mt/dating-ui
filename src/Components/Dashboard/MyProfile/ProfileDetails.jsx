import React from "react";

const ProfileDetails = () => {
  return (
    <div className="dashboard-content-inner">
      <div className="card mb-4 profileCard">
        <div className="card-content">
          <div className="d-md-flex align-items-center user text-center text-md-start">
            <img
              src="https://truetiesdating.com/assets/uploads/cropped_195c266e100d2581c1cc76b18d5a26b0.png"
              alt=""
              className="avatar circle me-md-4 mb-2 mb-md-0"
            />
            <div className="flex-grow-1 mb-2 mb-md-0">
              <h3>
                <b>Florencia, 28 </b>
                <a className="ms-1">
                  <i className="zmdi zmdi-circle grey-text f12"></i>
                </a>

                <a className="ms-3">
                  <i className="zmdi zmdi-comment-alt grey-text "></i>
                </a>
              </h3>
              <p>Chile, Tarapaca </p>

              <ul className="action" style={{ overflow: "visible" }}>
                <li>
                  <a title="Send interest">
                    <i className="bi bi-hand-thumbs-up"></i>
                  </a>
                </li>

                <li>
                  <a title="Add to favorite">
                    <i className="bi bi-heart"></i>
                  </a>{" "}
                </li>
                <li>
                  <a title="Block">
                    <i className="bi bi-lock-fill"></i>
                  </a>{" "}
                </li>
                <li>
                  <a
                    type="button"
                    title="Send gift"
                    style={{
                      width: "auto",
                      height: "auto",
                      border: "none",
                      marginTop: "-1rem",
                    }}
                  >
                    <img
                      src="https://truetiesdating.com/assets/images/12516571.png"
                      alt="Send gift"
                      height="48"
                      width="48"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex-shrink-0">
              <h2 className="mb-0">
                98
                <small>
                  % <span className="uppercase">Match</span>
                </small>
              </h2>
              <ul className="pagination action hide">
                <li className="page-item">
                  <a className="page-link" title="Send interest">
                    <i className="zmdi zmdi-thumb-up"></i>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link active" title="Remove from favorite">
                    <i className="zmdi zmdi-favorite"></i>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" title="Send message">
                    <i className="zmdi zmdi-email"></i>
                  </a>
                </li>
              </ul>
              <a href="#" hidden="">
                Report
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
      <ul className="nav nav-underline mb-3" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          {" "}
          <a
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            href="#home"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            About
          </a>{" "}
        </li>
        <li className="nav-item" role="presentation">
          {" "}
          <a
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            href="#profile"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
            tabindex="-1"
          >
            Photos
          </a>{" "}
        </li>
        <li className="nav-item" role="presentation">
          {" "}
          <a
            className="nav-link"
            id="contact-tab"
            data-bs-toggle="tab"
            href="#contact"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
            tabindex="-1"
          >
            User Info
          </a>{" "}
        </li>
        <li className="nav-item" role="presentation">
          {" "}
          <a
            className="nav-link"
            id="looking-for-tab"
            data-bs-toggle="tab"
            href="#looking_for"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
            tabindex="-1"
          >
            Looking for
          </a>{" "}
        </li>
      </ul>

      <div className="tab-content mb-3" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div className="row">
            <div className="col-md-6">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>My Favorite Movie</th>
                    <td>bajirao</td>
                  </tr>
                  <tr>
                    <th>My Favorite Book</th>
                    <td>Wings Of Fire</td>
                  </tr>
                  <tr>
                    <th>My Favorite Food</th>
                    <td>Chinese</td>
                  </tr>
                  <tr>
                    <th>Music I Like</th>
                    <td>piano</td>
                  </tr>
                  <tr>
                    <th>My Hobbies &amp; Interest</th>
                    <td>
                      <span>Not Available</span>
                    </td>
                  </tr>
                  <tr>
                    <th>My Dressing Sense &amp; Physical Appereance</th>
                    <td>
                      <span>Not Available</span>
                    </td>
                  </tr>
                  <tr>
                    <th>My Sense Of Homor</th>
                    <td>
                      <span>Not Available</span>
                    </td>
                  </tr>
                  <tr>
                    <th>I want to travel</th>
                    <td>
                      <span>Not Available</span>
                    </td>
                  </tr>
                  <tr>
                    <th>My Personality</th>
                    <td>
                      <span>Not Available</span>
                    </td>
                  </tr>
                  <tr>
                    <th>My Weekend Plan</th>
                    <td>
                      <span>Not Available</span>
                    </td>
                  </tr>
                  <tr>
                    <th>My Matching Preference</th>
                    <td>
                      <span>Not Available</span>
                    </td>
                  </tr>
                  <tr>
                    <th>My Partner From Different Culture</th>
                    <td>
                      <span>Not Available</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Sex</th>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <th>Language</th>
                      <td>English</td>
                    </tr>
                    <tr>
                      <th>Nationality:</th>
                      <td>Brazil</td>
                    </tr>
                    <tr>
                      <th>Religion:</th>
                      <td>Bahá'í</td>
                    </tr>
                    <tr>
                      <th>Looking for</th>
                      <td>Friendship</td>
                    </tr>
                    <tr>
                      <th>Occupation</th>
                      <td>IT / Communications</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div className="card">
            <div className="card-body">
              <div className="row row-cols-xl-5 gx-3 gallery" id="gallery-pics">
                <div className="col-xxl-2 col-lg-3 col-md-3 col-sm-4 col-6 mb-3">
                  <a
                    href="https://truetiesdating.com/assets/uploaded_gallery/cd4b87191ab03b3eec6bae7c72cad2da.jpg"
                    title=""
                  >
                    <img
                      src="https://truetiesdating.com/assets/uploaded_gallery/cd4b87191ab03b3eec6bae7c72cad2da.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="col-xxl-2 col-lg-3 col-md-3 col-sm-4 col-6 mb-3">
                  <a
                    href="https://truetiesdating.com/assets/uploaded_gallery/02bc22e445b8bc0680d083f20a0749f5.jpg"
                    title=""
                  >
                    <img
                      src="https://truetiesdating.com/assets/uploaded_gallery/02bc22e445b8bc0680d083f20a0749f5.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          <div className="card">
            <div className="card-content">
              <div className="table-responsive">
                <table className="table table-match bordered hide-on-small-only">
                  <thead>
                    <tr>
                      <th style={{ width: "45%" }}>Type</th>
                      <th colspan="2" className="right-align">
                        Match my criteria
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th colspan="3">Basic</th>
                    </tr>
                    <tr>
                      <td>Gender:</td>
                      <td>Female</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Age:</td>
                      <td>28</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Lives in:</td>
                      <td>Chile, Tarapaca, Pozo Almonte</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Relocate:</td>
                      <td>Willing to relocate within my country</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <th colspan="5">Appearance</th>
                    </tr>
                    <tr>
                      <td>Hair color:</td>
                      <td>Blonde</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Hair length:</td>
                      <td>Short</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Hair type:</td>
                      <td className="ag_26">Wavy</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Eye color:</td>
                      <td>Black</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Eye wear:</td>
                      <td>Contacts</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Height:</td>
                      <td>5'</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Weight:</td>
                      <td>50-55</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Body type:</td>
                      <td>Petite</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Ethnicity:</td>
                      <td>Asian</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr className="collapsable">
                      <td>Facial hair:</td>
                      <td>Clean Shaven</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Best feature:</td>
                      <td>My Arms</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Body art:</td>
                      <td>Branding</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Appearance:</td>
                      <td>Below average</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <th colspan="5">Lifestyle</th>
                    </tr>
                    <tr>
                      <td>Drink:</td>
                      <td>Occasionally drink</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Smoke:</td>
                      <td className="ag_51">Do smoke</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Marital status:</td>
                      <td>Single</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Have Children:</td>
                      <td>No</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>

                    <tr>
                      <td>Occupation:</td>
                      <td className="ag_40">IT / Communications</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Employment status:</td>
                      <td className="ag_17">Student</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Income:</td>
                      <td className="ag_29">$0 - $30,000 (USD)</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Home type:</td>
                      <td className="ag_28">Apartment / Flat</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Living situation:</td>
                      <td>Live Alone</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <th colspan="5">Background / Cultural Values</th>
                    </tr>
                    <tr>
                      <td>Nationality::</td>
                      <td className="ag_38">Brazil</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Education::</td>
                      <td>Primary (Elementary) School</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Languages spoken:</td>
                      <td>English</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>English ability:</td>
                      <td>Good</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Russian ability:</td>
                      <td>Fluent</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Religion::</td>
                      <td>Bahá'í</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Star sign:</td>
                      <td>Aquarius</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <th colspan="5">Personal</th>
                    </tr>
                    <tr>
                      <td>Bust cup size:</td>
                      <td>AA</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Bust From:</td>
                      <td>25 " </td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Waist From:</td>
                      <td>29 "</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Hips measurement:</td>
                      <td>32 "</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <th colspan="5">Hobbies &amp; Interests</th>
                    </tr>
                    <tr>
                      <td>Entertainment:</td>
                      <td colspan="4">
                        Art / Painting, Bars / Pubs / Nightclubs, Camping /
                        Nature
                      </td>
                    </tr>
                    <tr>
                      <td>Food:</td>
                      <td colspan="4">Indian</td>
                    </tr>
                    <tr>
                      <td>Music:</td>
                      <td colspan="4">Rock, Soft Rock</td>
                    </tr>
                    <tr>
                      <td>Sport:</td>
                      <td colspan="4">Aerobics, Athletics, Biking</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div
          className="tab-pane fade"
          id="looking_for"
          role="tabpanel"
          aria-labelledby="looking-for-tab"
        >
          <div className="card">
            <div className="card-content">
              <div className="table-responsive">
                <table className="table table-match bordered hide-on-small-only">
                  <thead>
                    <tr>
                      <th style={{ width: "45%" }}>Type</th>
                      <th>He's/She's looking for</th>
                      <th className="right-align">I match their criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th colspan="3">Basic</th>
                    </tr>
                    <tr>
                      <td>Gender:</td>

                      <td>Male</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Age:</td>

                      <td>26 - 28</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Lives in:</td>

                      <td>Australia, , </td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Relocate:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <th colspan="5">Appearance</th>
                    </tr>
                    <tr>
                      <td>Hair color:</td>

                      <td>Black</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Hair length:</td>

                      <td>Shaved</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Hair type:</td>

                      <td>Curly</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Eye color:</td>

                      <td>Black</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Eye wear:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Height:</td>

                      <td>5'5" - 6'</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Weight:</td>

                      <td>60-65 - 65-70</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Body type:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Ethnicity:</td>

                      <td>Black</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr className="collapsable">
                      <td>Facial hair:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Best feature:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Body art:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Appearance:</td>

                      <td>Below average</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <th colspan="5">Lifestyle</th>
                    </tr>
                    <tr>
                      <td>Drink:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Smoke:</td>

                      <td className="ag_51">Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Marital status:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Have Children:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>

                    <tr>
                      <td>Occupation:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Employment status:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Income:</td>

                      <td>$0 - $30,000 (USD)</td>
                      <td>
                        <i className="zmdi zmdi-close-circle text-red"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Home type:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Living situation:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <th colspan="5">Background / Cultural Values</th>
                    </tr>
                    <tr>
                      <td>Nationality::</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Education:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Languages spoken:</td>

                      <td>English</td>
                      <td>
                        <i className="zmdi zmdi-close-circle text-red"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>English ability:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Russian ability:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Religion::</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Star sign:</td>

                      <td>Any</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <th colspan="5">Personal</th>
                    </tr>
                    <tr>
                      <td>Bust cup size:</td>

                      <td>N/A</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Bust From:</td>

                      <td>N/A - N/A</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Waist From:</td>

                      <td>N/A - N/A</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Hips measurement:</td>

                      <td>N/A - N/A</td>
                      <td>
                        <i className="zmdi zmdi-check-circle text-green"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="spacer-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
