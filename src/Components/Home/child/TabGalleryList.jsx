import React, { useContext, useState } from 'react';
import AuthContext from '../../ContextApi/AuthProvider';

const TabGalleryList = () => {
  const { alluserData } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('users_all');

  const userData = alluserData?.data || [];

  const getFilteredUsers = () => {
    switch (activeTab) {
      case 'users_girls':
        return userData.find(group => group.users_girls)?.users_girls || [];
      case 'users_boys':
        return userData.find(group => group.users_boys)?.users_boys || [];
      case 'users_recent':
        return userData.find(group => group.users_recent)?.users_recent || [];
      default:
        return userData.find(group => group.users_all)?.users_all || [];
    }
  };

  const getProfileImage = (user) => {
    const imgPathIfExists = "http://localhost/eroflirts-credit/assets/uploads/";
    const imgPathIfNotExists = "http://localhost/eroflirts-credit/assets/images/no-image-male.png";
    return user.profile_image ? imgPathIfExists + user.profile_image : imgPathIfNotExists;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredUsers = getFilteredUsers();

  return (
    <section className="sec profiles">
      <div className="container">
        <h2 className="title text-center divider-2">Profiles</h2>
        <ul className="nav nav-underline justify-center mb-4" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${activeTab === 'users_all' ? 'active' : ''}`}
              id="all-tab"
              role="tab"
              onClick={() => handleTabChange('users_all')}
              style={{ cursor: 'pointer' }}
            >
              All
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${activeTab === 'users_girls' ? 'active' : ''}`}
              id="girls-tab"
              role="tab"
              onClick={() => handleTabChange('users_girls')}
              style={{ cursor: 'pointer' }}
            >
              Females
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${activeTab === 'users_boys' ? 'active' : ''}`}
              id="boys-tab"
              role="tab"
              onClick={() => handleTabChange('users_boys')}
              style={{ cursor: 'pointer' }}
            >
              Males
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              className={`nav-link ${activeTab === 'users_recent' ? 'active' : ''}`}
              id="recent-tab"
              role="tab"
              onClick={() => handleTabChange('users_recent')}
              style={{ cursor: 'pointer' }}
            >
              Last Added
            </a>
          </li>
        </ul>
        <div className="tab-content">
          {['users_all', 'users_girls', 'users_boys', 'users_recent'].map(tab => (
            <div
              key={tab}
              className={`tab-pane ${activeTab === tab ? 'active' : ''}`}
              id={`${tab}-content`}
              role="tabpanel"
              aria-labelledby={`${tab}-tab`}
            >
              <div className="allUser row row-cols-xl-5 gx-3">
                {filteredUsers.map(user => (
                  <article key={user.user_id} className="col-lg-3 col-md-4 col-sm-6 col-6">
                    <div className="card card-profile">
                      <div className="card-image">
                        <a>
                          <img
                            src={getProfileImage(user)}
                            alt={user.name}
                            className="card-img-top"
                          />
                        </a>
                      </div>
                      <div className="card-body">
                        <h5><a>{user.name}, {user.age}</a></h5>
                        <p className="text-ellipsis-1">{user.countryLive}, {user.stateLive}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TabGalleryList;
