import React, { useState } from 'react';

const GalleryList = ({ setShow, imgPath, allImageData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const PreviousValue = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allImageData.length - 1 : prevIndex - 1
    );
  };

  const NextValue = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === allImageData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <React.Fragment>
      <div className="mfp-bg mfp-ready"></div>
      <div
        className="mfp-wrap mfp-gallery mfp-close-btn-in mfp-auto-cursor mfp-ready"
        tabIndex="-1"
        style={{ overflow: 'hidden auto' }}
      >
        <div className="mfp-container mfp-s-ready mfp-image-holder">
          <div className="mfp-content">
            <div className="mfp-figure">
              <button
                title="Close (Esc)"
                type="button"
                className="mfp-close"
                onClick={() => setShow(false)}
              >
                ×
              </button>
              <figure>
                <img
                  className="mfp-img"
                  src={`${imgPath}${allImageData[currentIndex].image}`}
                  style={{ maxHeight: '953px' }}
                  alt={`Gallery Item ${currentIndex + 1}`}
                />
                <figcaption>
                  <div className="mfp-bottom-bar">
                    <div className="mfp-title"></div>
                    <div className="mfp-counter">
                      {currentIndex + 1} of {allImageData.length}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="mfp-preloader">Loading...</div>
          <button
            title="Previous (Left arrow key)"
            type="button"
            className="mfp-arrow mfp-arrow-left mfp-prevent-close"
            onClick={PreviousValue}
          >
            ←
          </button>
          <button
            title="Next (Right arrow key)"
            type="button"
            className="mfp-arrow mfp-arrow-right mfp-prevent-close"
            onClick={NextValue}
          >
            →
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default GalleryList;
