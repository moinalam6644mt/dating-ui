import React, { useState, useEffect,useContext } from 'react';
import AuthUser from '../Authentication/AuthUser/AuthUser';
import toast from 'react-hot-toast';
import AuthContext from '../ContextApi/AuthProvider';

const NotificationList = () => {
  const { CallApi } = AuthUser();
  const {allLanguageKey} =useContext(AuthContext)
  const [notificationData, setNotificationData] = useState([]);
  const [activeUser, setActiveUser] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    FetchNotificationList();
  }, [page]); // Add `page` as a dependency so that it fetches when the page changes

  const FetchNotificationList = async () => {
    try {
      const response = await CallApi({
        api: '/notification_list',
        method: 'GET',
        data: {
          per_page: page,
        },
      });
      if (response && response.status === 1) {
        setNotificationData((prevNotifications) => [
          ...prevNotifications,
          ...response.activity,
        ]);
        setActiveUser(response.current_page);
      } else {
        toast.error(response.error || 'Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('An error occurred while fetching notifications');
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="dashboard-content-inner">
      <div className="card">
        <div className="card-content">
          <h4> {allLanguageKey?.account_activity_log}</h4>
          <ul className="list-group">
            {notificationData.length > 0 ? (
              notificationData.map((notification) => (
                <li
                  key={notification.id}
                  className="list-group-item avatar"
                  style={{ minHeight: '46px', paddingLeft: '60px' }}
                >
                  <img
                    src={notification.profile_pic_link}
                    alt={notification.alt}
                    title={notification.alt}
                    className="circle"
                    style={{ maxWidth: '30px', maxHeight: '30px' }}
                  />
                  <span className="title">{notification.activity_parse} </span>
                  <a className="secondary-content">
                    <span className="title">{notification.date}</span>
                  </a>
                </li>
              ))
            ) : (
              <p> No notifications available</p>
            )}
          </ul>
        </div>
      </div>
      {activeUser !== 0 && (
        <div className="text-center mb-3" id="load_more_online_users">
          <button className="btn btn-primary ajax_pagination" onClick={loadMore}>
          {allLanguageKey?.load_more}
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
