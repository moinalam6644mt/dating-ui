import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";
import AuthContext from "../../ContextApi/AuthProvider";

const MyTrip = () => {
  const { CallApi } = AuthUser();
  const {allLanguageKey} =useContext(AuthContext)
  const [tripList, setTripList] = useState([]);
  const [imgPath, setImgPath] = useState("");
  const [maleImageLink, setMaleImageLink] = useState("");
  const [femaleImageLink, setFemaleImageLink] = useState("");

  useEffect(() => {
    FetchMyTripData();
  }, []);

  const FetchMyTripData = async () => {
    try {
      const response = await CallApi({
        api: `/trips_list`,
        method: "GET",
      });
      if (response && response.status === 1) {
        setTripList(response.trip_list);
        setImgPath(response.img_path_if_exists);
        setMaleImageLink(response.m_image);
        setFemaleImageLink(response.f_image);
      } else {
        toast.error(response.message || "Failed to fetch trips.");
      }
    } catch (error) {
      console.error("Error fetching trips", error);
      toast.error("Failed to fetch trips.");
    }
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      const response = await CallApi({
        api: `/delete_trip/${tripId}`,
        method: "UPLOAD",
        data: { trip_id: tripId },
      });
      if (response && response.status === 1) {
        toast.success("Trip deleted successfully.");
        setTripList((prevList) =>
          prevList.filter((trip) => trip.trip_id !== tripId)
        );
      } else {
        toast.error(response.message || "Failed to delete trip.");
      }
    } catch (error) {
      console.error("Error deleting trip", error);
      toast.error("Failed to delete trip.");
    }
  };

  const formatDateRange = (fromDate, toDate) => {
    const formatDate = (date) => {
      const d = new Date(date);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };
    return `${formatDate(fromDate)} - ${formatDate(toDate)}`;
  };

  const formatLocation = (fromCity, fromCountry, toCity, toCountry) => {
    return `${fromCity}, ${fromCountry} to ${toCity}, ${toCountry}`;
  };

  return (
    <div className="dashboard-content-inner">
      <div className="card">
        <div className="card-header d-flex align-items-center">
          <h4> {allLanguageKey?.account_my_planned_trips}</h4>
          <Link
            to="/add-trip"
            className="btn btn-primary btn-sm ms-auto"
          >
            <i className="bi bi-plus-lg"></i> {allLanguageKey?.account_add_trip}
          </Link>
        </div>
        <div className="card-body">
          {tripList.length === 0 ? (
            <p className="text-muted text-center">No trips found</p>
          ) : (
            tripList?.map((trip) => (
              <div key={trip.trip_id} className="d-flex border-box mb-4">
                <div className="flex-shrink-0 me-3">
                  <img
                    src={
                      trip.profile_pic
                        ? `${imgPath}${trip.profile_pic}`
                        : trip.gender === "M"
                        ? maleImageLink
                        : femaleImageLink
                    }
                    alt={trip.name}
                    height="64"
                    width="64"
                    className="rounded-circle"
                  />
                </div>
                <div className="flex-grow-1">
                  <div className="d-lg-flex justify-content-between">
                    <h4 className="title-name">
                      <Link to={`/public-profile/${trip.user_id}`}>
                        {trip.name}
                      </Link>
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
                      {formatDateRange(trip.from_date, trip.to_date)}
                    </p>
                  </div>
                  <p className="mb-2">
                    <i className="bi bi-geo-alt"></i>{" "}
                    {formatLocation(
                      trip.from_country,
                      trip.from_city,
                      trip.to_country,
                      trip.to_city,
                    )}
                  </p>
                  <p className="card-text">{trip.note}</p>
                  <div className="task-tags mb-2">
                    <div className="task-tags mb-2">
                      {trip.trip_purpose_name &&
                      trip.trip_purpose_name.length > 0 ? (
                        <div>
                          <strong>Trip Purpose:</strong>
                          {trip.trip_purpose_name.map((tag, index) => (
                            <span key={index} className="task-tags mb-2">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="task-tags mb-2">
                          No purpose specified
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="d-flex">
                    <Link
                      to={`/trip-details/${trip.trip_id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                    <span className="ms-auto">
                      <Link
                        to={`/edit-trip/${trip.trip_id}`}
                        className="btn btn-outline-primary btn-sm me-2"
                        title="Edit"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteTrip(trip.trip_id)}
                        title="Delete"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className="text-center mb-3" id="load_more_trip_users">
            {/* Load More Button (If Pagination is Required) */}
            {/* Uncomment if pagination is implemented */}
            {/* <button className="btn btn-primary" style={{ display: 'none' }}>
              Load More
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTrip;
