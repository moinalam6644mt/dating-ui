import React, { useContext } from 'react'
import AuthContext from '../../ContextApi/AuthProvider'
import { Link } from 'react-router-dom';

const ProfileGalleryList = () => {
  const { alluserData } = useContext(AuthContext);
  const userData = alluserData?.data || [];

  const getFilteredUsers = () => {
    return userData.find(group => group.users_all)?.users_all || [];
  };

  const getProfileImage = (user) => {
    const imgPathIfExists = "http://localhost/eroflirts-credit/assets/uploads/";
    const imgPathIfNotExists = "http://localhost/eroflirts-credit/assets/images/no-image-male.png";

    return user.profile_image ? imgPathIfExists + user.profile_image : imgPathIfNotExists;
  };

  const filteredUsers = getFilteredUsers();

  return (
    <section className="sec profiles">
      <div className="balloon"></div>
      <div className="container">
        <h2 className="title text-center divider-2">Profiles</h2>
        <div className="allUser row row-cols-xl-5 gx-3">
          {filteredUsers.map((user) => (
            <article className="col-lg-3 col-md-4 col-sm-6 col-6" key={user.id}>
              <div className="card card-profile">
                <div className="card-image">
                  <Link to ='/login'>
                    <img src={getProfileImage(user)} alt={`${user.username}`} className="card-img-top" />
                  </Link>
                </div>
                <div className="card-body">
                  <h5>
                    <Link to ='/login'>
                      {user.username}, {user.age}
                    </Link>
                  </h5>
                  <p className="text-ellipsis-1">{user.country}, {user.city}&nbsp;</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfileGalleryList;
