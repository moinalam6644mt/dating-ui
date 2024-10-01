import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";

const TripDetails = () => {
  const { CallApi } = AuthUser();
  const [userDetails, setUserDetails] = useState(null);
  const [upcomingTrip, setUpcomingTrip] = useState(null);
  const [completedTrip,setCompletedTrip]=useState(null);
  const [suggestedUsers,setSuggestedUsers]=useState([]);
  const { trip_id } = useParams();

  useEffect(() => {
    FetchTripDetails();
    SuggestedProfileData();
  }, [trip_id]);

  console.log(completedTrip)

  const FetchTripDetails = async () => {
    try {
      const response = await CallApi({
        api: `/trip_details/${trip_id}`,
        method: "GET",
      });

      if (response && response.status === 1) {
        setUserDetails(response.trip_details);
        setUpcomingTrip(response.upcoming_trips);
        setCompletedTrip(response.completed_trips)
      } else {
        toast.error("No trips found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch trips");
    }
  };

  const SuggestedProfileData = async () => {
    try {
      const response = await CallApi({
        api: `/suggested_profile/${trip_id}`,
        method: "GET",
      });

      if (response ) {
        setSuggestedUsers(response.matching_profiles);
      } else {
        toast.error("No trips found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch trips");
    }
  };

  return (
    <div className="dashboard-content-inner">
      <div className="d-flex align-items-center">
        <h4 className="mb-3">Matching Trips</h4>
      </div>

      <div className="row">
        <aside className="col-xl-9 col-12">
          {/* Result wrapper */}
          {userDetails && userDetails?.length > 0 ? (
            userDetails?.map((trip, index) => (
              <div key={index} className="d-flex border-box mb-3">
                <div className="flex-shrink-0 me-3">
                  <img
                    src={trip.profile_pic}
                    height="64"
                    width="64"
                    className="rounded-circle"
                    alt={trip.name}
                  />
                </div>
                <div className="flex-grow-1">
                  <div className="d-lg-flex justify-content-between">
                    <h4 className="title-name">
                      <Link to={`/public-profile/${trip.user_id}`}>
                        {trip.name}, {trip.age}
                      </Link>
                      <span className="online-badge"></span>
                      {trip.doc_verify_status === "Y" && (
                        <span className="verify">
                          <img
                            src="https://truetiesdating.com/assets/images/verified.png"
                            alt="Verified"
                            height="24"
                            width="24"
                          />
                        </span>
                      )}
                    </h4>
                    <p className="mb-2 text-muted">
                      <i className="bi bi-calendar-range"></i>{" "}
                      {`${new Date(
                        trip.from_date
                      ).toLocaleDateString()} - ${new Date(
                        trip.to_date
                      ).toLocaleDateString()}`}
                    </p>
                  </div>
                  <p className="mb-2">
                    <i className="bi bi-geo-alt"></i>{" "}
                    {`${trip.from_city}, ${trip.from_state}, ${
                      trip.from_country
                    } → ${trip.to_city || "Unknown"}, ${trip.to_state}, ${
                      trip.to_country
                    }`}
                  </p>
                  <p className="card-text">{trip.note}</p>
                  <div className="task-tags mb-2">
                    {trip.purpose.map((purpose, idx) => (
                      <span key={idx} className="task-tags mb-2">
                        {purpose.purpose_id}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/public-profile/${trip.user_id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="not-result-found">
              <h3>No planned trip found</h3>
              <p className="mx-auto">
                Itaque earum rerum hic tenetur a sapiente delectus ut aut
                reiciendis voluptatibus maiores alias consequatur aut
                perferendis doloribus asperiores repellat.
              </p>
              <div className="noavatar">
                <img
                  src="https://truetiesdating.com/assets/images/5333434.png"
                  alt="No trips"
                  height="84"
                  width="84"
                />
              </div>
              <Link to="/account/add_trips" className="btn btn-outline-primary">
                Add Trip
              </Link>
            </div>
          )}

          <div class="mb-3">
            <h4 class="mb-3">Upcoming Trips</h4>
            {upcomingTrip && upcomingTrip?.length > 0 ? (
              upcomingTrip?.map((trip, index) => (
                <div key={index} className="d-flex border-box mb-3">
                  <div className="flex-shrink-0 me-3">
                    <img
                      src={trip.profile_pic}
                      height="64"
                      width="64"
                      className="rounded-circle"
                      alt={trip.name}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-lg-flex justify-content-between">
                      <h4 className="title-name">
                        <Link to={`/public-profile/${trip.user_id}`}>
                          {trip.name}, {trip.age}
                        </Link>
                        <span className="online-badge"></span>
                        {trip.doc_verify_status === "Y" && (
                          <span className="verify">
                            <img
                              src="https://truetiesdating.com/assets/images/verified.png"
                              alt="Verified"
                              height="24"
                              width="24"
                            />
                          </span>
                        )}
                      </h4>
                      <p className="mb-2 text-muted">
                        <i className="bi bi-calendar-range"></i>{" "}
                        {`${new Date(
                          trip.from_date
                        ).toLocaleDateString()} - ${new Date(
                          trip.to_date
                        ).toLocaleDateString()}`}
                      </p>
                    </div>
                    <p className="mb-2">
                      <i className="bi bi-geo-alt"></i>{" "}
                      {`${trip.from_city}, ${trip.from_state}, ${
                        trip.from_country
                      } → ${trip.to_city || "Unknown"}, ${trip.to_state}, ${
                        trip.to_country
                      }`}
                    </p>
                    <p className="card-text">{trip.note}</p>
                    <div className="task-tags mb-2">
                      {trip.purpose.map((purpose, idx) => (
                        <span key={idx} className="task-tags mb-2">
                          {purpose.purpose_id}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/public-profile/${trip.user_id}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="not-result-found">
                <h3>No planned trip found</h3>
                <p className="mx-auto">
                  Itaque earum rerum hic tenetur a sapiente delectus ut aut
                  reiciendis voluptatibus maiores alias consequatur aut
                  perferendis doloribus asperiores repellat.
                </p>
                <div className="noavatar">
                  <img
                    src="https://truetiesdating.com/assets/images/5333434.png"
                    alt="No trips"
                    height="84"
                    width="84"
                  />
                </div>
                <Link
                  to="/account/add_trips"
                  className="btn btn-outline-primary"
                >
                  Add Trips
                </Link>
              </div>
            )}
          </div>

          <div class="mb-3">
            <h4 class="mb-3">Trip Completed</h4>
            {completedTrip && completedTrip?.length > 0 ? (
              completedTrip?.map((trip, index) => (
                <div key={index} className="d-flex border-box mb-3">
                  <div className="flex-shrink-0 me-3">
                    <img
                      src={trip.profile_pic}
                      height="64"
                      width="64"
                      className="rounded-circle"
                      alt={trip.name}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-lg-flex justify-content-between">
                      <h4 className="title-name">
                        <Link to={`/public-profile/${trip.user_id}`}>
                          {trip.name}, {trip.age}
                        </Link>
                        <span className="online-badge"></span>
                        {trip.doc_verify_status === "Y" && (
                          <span className="verify">
                            <img
                              src="https://truetiesdating.com/assets/images/verified.png"
                              alt="Verified"
                              height="24"
                              width="24"
                            />
                          </span>
                        )}
                      </h4>
                      <p className="mb-2 text-muted">
                        <i className="bi bi-calendar-range"></i>{" "}
                        {`${new Date(
                          trip.from_date
                        ).toLocaleDateString()} - ${new Date(
                          trip.to_date
                        ).toLocaleDateString()}`}
                      </p>
                    </div>
                    <p className="mb-2">
                      <i className="bi bi-geo-alt"></i>{" "}
                      {`${trip.from_city}, ${trip.from_state}, ${
                        trip.from_country
                      } → ${trip.to_city || "Unknown"}, ${trip.to_state}, ${
                        trip.to_country
                      }`}
                    </p>
                    <p className="card-text">{trip.note}</p>
                    <div className="task-tags mb-2">
                      {trip.purpose.map((purpose, idx) => (
                        <span key={idx} className="task-tags mb-2">
                          {purpose.purpose_id}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="not-result-found">
                <h3>No planned trip found</h3>
                <p className="mx-auto">
                  Itaque earum rerum hic tenetur a sapiente delectus ut aut
                  reiciendis voluptatibus maiores alias consequatur aut
                  perferendis doloribus asperiores repellat.
                </p>
                <div className="noavatar">
                  <img
                    src="https://truetiesdating.com/assets/images/5333434.png"
                    alt="No trips"
                    height="84"
                    width="84"
                  />
                </div>
                <Link
                  to="/account/add_trips"
                  className="btn btn-outline-primary"
                >
                  Add Trip
                </Link>
              </div>
            )}
          </div>

          {/* completed trip */}

          {/* Suggested users */}
          <h4 className="mb-3">Suggested</h4>
          <div
            id="suggested_container"
            className="allUser row gx-3 row-cols-xxl-5"
          >
            {suggestedUsers.map((user) => (
              <article
                key={user.id}
                className="col-xl-3 col-lg-4 col-sm-6 col-12"
              >
                <div className="card card-profile user">
                  <div className="card-image">
                    <Link to={`/public-profile/${user.user_id}`}>
                      <img
                        src={user.profile_pic}
                        alt={user.name}
                        className="card-img-top"
                      />
                    </Link>
                  </div>
                  <div className="card-body">
                    <h5>
                    <Link to={`/public-profile/${user.user_id}`}>{user.name}, {user.age} </Link>
                    {user.onlineStatus===false?<span className="offline-badge"></span>:<span className="online-badge"></span>}
                    </h5>
                    <ul className="action">
                      <li>
                        <a
                          onClick={() => sendQuickMessage(user.id)}
                          title="Send message"
                        >
                          <i className="bi bi-chat-square-heart"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mb-3" id="load_more_suggested_users">
            <button className="btn btn-primary" style={{ display: "none" }}>
              Load More
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

// Dummy function to simulate sending a message
const sendQuickMessage = (userId) => {
  console.log(`Sending quick message to user ${userId}`);
};

export default TripDetails;
