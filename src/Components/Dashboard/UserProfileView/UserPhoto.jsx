import React, { useEffect, useState } from 'react';
import GalleryList from '../GalleryList/GalleryList';

const UserPhoto = ({ publicProfileData }) => {
  const [show, setShow] = useState(false);
  const [allImageData, setAllImageData] = useState([]);
  const [imgPath,setImgPath]=useState()

  useEffect(() => {
    setAllImageData(publicProfileData?.galary_data || []);
    setImgPath(publicProfileData?.pic_link)
  }, [publicProfileData]);

  const ShowGalleryData = () => {
    setShow(true);
  };

  return (
    <>
      <div
        className="tab-pane fade active show"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <div className="card">
          <div className="card-body">
            {allImageData.length>0 ?
            <div className="row row-cols-xl-5 gx-3 gallery" id="gallery-pics">
              {allImageData?.map((img, index) => (
                <div
                  className="col-xxl-2 col-lg-3 col-md-3 col-sm-4 col-6 mb-3"
                  key={index}
                >
                  <a onClick={ShowGalleryData} title="">
                    <img
                      src={`${imgPath}${img.image}`}
                      alt="profile pic"
                      className="img-fluid"
                    />
                  </a>
                </div>
              ))}
            </div>
            : <div class="col-12 text-center w-100"><p><i>No Images !!!</i></p></div>
}
          </div>
        </div>
      </div>

      {show === true && <GalleryList setShow={setShow} imgPath={imgPath} allImageData={allImageData}/>}
    </>
  );
};

export default UserPhoto;
