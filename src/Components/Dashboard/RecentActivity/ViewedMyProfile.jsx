import React, { useEffect, useState, useContext } from "react";
import AuthUser from "../../Authentication/AuthUser/AuthUser";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthContext from "../../ContextApi/AuthProvider";

const ViewedMyProfile = () => {
  const { CallApi } = AuthUser();
const {allLanguageKey} =useContext(AuthContext)
  const [users, setUsers] = useState([]);
  const [picLink, setPicLink] = useState("");
  const [Fimage, setFimage] = useState("");
  const [Mimage, setMimage] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);

  useEffect(() => {
    FetchProfileView();
  }, [page]);

  const FetchProfileView = async () => {
    if (loadingMore) return;

    setLoading(page === 1);
    setLoadingMore(page > 1);

    try {
      const response = await CallApi({
        api: `/profile_views_me`,
        method: "GET",
        params: {
          per_page: page, // Use params for GET requests
        },
      });

      if (response) {
        if (response.views.length === 0) {
          setNoMoreData(true);
        }
        setUsers((prevUsers) => [...prevUsers, ...response.views]);
        setPicLink(response.pic_link || "");
        setFimage(response.f_image || "");
        setMimage(response.m_image || "");
      } else {
        toast.error("Data not fetched");
      }
    } catch (error) {
      setError(error);
      toast.error("Data not found");
      setNoMoreData(true);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const addFav = async (userId, isFav) => {
    const apiEndpoint = isFav ? "/removeFav" : "/addFav";

    setUsers((prevList) =>
      prevList.map((user) =>
        user.user_id === userId ? { ...user, is_fav: !isFav } : user
      )
    );

    try {
      const response = await CallApi({
        api: apiEndpoint,
        method: "UPLOAD",
        data: { user: userId },
      });

      if (response && response.status === 1) {
        toast.success(response.msg || "Favorite updated successfully");
      } else {
        toast.error(response.msg || "Failed to update favorites.");
        setUsers((prevList) =>
          prevList.map((user) =>
            user.user_id === userId ? { ...user, is_fav: isFav } : user
          )
        );
      }
    } catch (error) {
      console.error("API request failed:", error);
      toast.error("Failed to update favorites.");
      setUsers((prevList) =>
        prevList.map((user) =>
          user.user_id === userId ? { ...user, is_fav: isFav } : user
        )
      );
    }
  };

  const sendInterest = async (userId, isInterestSent) => {
    const apiEndpoint = isInterestSent ? "/removeInterest" : "/addInterest";

    setUsers((prevList) =>
      prevList.map((user) =>
        user.user_id === userId
          ? { ...user, is_interest_send: !isInterestSent }
          : user
      )
    );

    try {
      const response = await CallApi({
        api: apiEndpoint,
        method: "UPLOAD",
        data: { user: userId },
      });

      if (response && response.status === 1) {
        toast.success(response.msg || "Interest updated successfully");
      } else {
        toast.error(response.msg || "Failed to update interest.");
        setUsers((prevList) =>
          prevList.map((user) =>
            user.user_id === userId
              ? { ...user, is_interest_send: isInterestSent }
              : user
          )
        );
      }
    } catch (error) {
      console.error("API request failed:", error);
      toast.error("Failed to update interest.");
      setUsers((prevList) =>
        prevList.map((user) =>
          user.user_id === userId
            ? { ...user, is_interest_send: isInterestSent }
            : user
        )
      );
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && !noMoreData) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (loading && page === 1) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="dashboard-content-inner">
      <div id="online_users_container" className="allUser row gx-3 row-cols-xxl-5">
        {users.length > 0 ? (
          users.map((user) => (
            <article
              key={user.user_id}
              className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
            >
              <div className="card card-profile user" id={`user_${user.user_id}`}>
                {user.verified && (
                  <span className="verify">
                    <img
                      src="https://truetiesdating.com/assets/images/verified.png"
                      alt="verified"
                    />
                  </span>
                )}
                {user.vip && (
                  <span className="vip">
                    <img
                      src="https://truetiesdating.com/assets/images/vip.png"
                      alt="vip"
                    />
                  </span>
                )}

                <div className="card-image">
                  <Link to={`/public-profile/${user.user_id}`}>
                    <img
                      src={
                        user.imgSrc
                          ? user.imgSrc
                          : user.gender === "M"
                          ? Mimage
                          : Fimage
                      }
                      alt={`${user.name}'s profile`}
                      className="card-img-top"
                    />
                  </Link>
                </div>
                <div className="card-body">
                  <h5>
                    <a href={user.profileUrl}>{`${user.name}, ${user.age}`}</a>
                    <span
                      className={user.online ? "online-badge" : "offline-badge"}
                    ></span>
                  </h5>
                  <p title={`${user.country}, ${user.city}`}>
                    <i className="bi bi-geo-alt"></i>{" "}
                    {`${user.country}, ${user.city}`}
                  </p>
                  <ul className="action">
                    <li>
                      <a
                        href="#!"
                        title={
                          user.is_interest_send
                            ? "Withdraw interest"
                            : "Send interest"
                        }
                        onClick={() => sendInterest(user.user_id, user.is_interest_send)}
                      >
                        {user.is_interest_send ? (
                          <i className="bi bi-hand-thumbs-up-fill"></i>
                        ) : (
                          <i className="bi bi-hand-thumbs-up"></i>
                        )}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#!"
                        title={
                          user.is_fav
                            ? "Remove from favorite"
                            : "Add to favorite"
                        }
                        onClick={() => addFav(user.user_id, user.is_fav)}
                      >
                        {user.is_fav ? (
                          <i className="bi bi-heart-fill"></i>
                        ) : (
                          <i className="bi bi-heart"></i>
                        )}
                      </a>
                    </li>
                    <li>
                      <a href="https://truetiesdating.com/chat" title="Send message">
                        <i className="bi bi-chat-square-heart"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="card-body">
            <div id="card-alert" className="not-result-found">
              <div className="noavatar">
                <img
                  src="https://truetiesdating.com/assets/images/icon-girl.png"
                  alt=""
                  height="84"
                  width="84"
                />
              </div>
              <p className="mb-2">{allLanguageKey?.no_users_found}</p>
              <p>{allLanguageKey?.interested_in_me_no}.</p>
              <Link to="/my-profile/edit/profile" className="btn btn-primary">
              {allLanguageKey?.update_profile}
              </Link>
            </div>
          </div>
        )}
      </div>

      {!noMoreData && users.length > 0 && (
        <div className="text-center mb-3" id="load_more_online_users">
          <button
            className="btn btn-primary"
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewedMyProfile;
