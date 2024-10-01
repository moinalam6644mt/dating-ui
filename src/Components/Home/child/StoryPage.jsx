import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import './storypage.css';
// Sample images
import storyboy from './image/storyboy.jpg';
import storygirl from './image/storygirl.jpg';

const StoryPage = () => {
  // Define carousel options
  const options = {
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      768: {
        items: 3,
        nav: false,
      },
      992: {
        items: 4,
        nav: true,
        loop: false,
        dots: false,
        margin: 20,
      },
    },
  };

  return (
    <section className="sec">
      <div className="container-fluid">
        <h2 className="title text-center divider-2">Successful Love Stories</h2>
        <OwlCarousel className="owl-theme owl-carousel-story" {...options}>
          <div className="item">
            <div className="card border-0">
              <div className="card-image">
                <img src={storyboy} alt="Story Boy" />
              </div>
              <div className="card-body">
                <h4 className="card-title">Leen Example</h4>
                <p>
                  I have gotten my soulmate here after registering, thanks to
                  this site.
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="card border-0">
              <div className="card-image">
                <img src={storygirl} alt="Story Girl" />
              </div>
              <div className="card-body">
                <h4 className="card-title">Cate</h4>
                <p>
                  Amazing successful stories tests, amazing successful stories tests amazing successful stories tests amazing successful stories tests amazing successful stories tests
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="card border-0">
              <div className="card-image">
                <img src={storyboy} alt="Story Boy" />
              </div>
              <div className="card-body">
                <h4 className="card-title">Leen Example</h4>
                <p>
                  I have gotten my soulmate here after registering, thanks to
                  this site.
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="card border-0">
              <div className="card-image">
                <img src={storygirl} alt="Story Girl" />
              </div>
              <div className="card-body">
                <h4 className="card-title">Cate</h4>
                <p>
                  Amazing successful stories tests, amazing successful stories tests amazing successful stories tests amazing successful stories tests amazing successful stories tests
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="card border-0">
              <div className="card-image">
                <img src={storyboy} alt="Story Boy" />
              </div>
              <div className="card-body">
                <h4 className="card-title">Leen Example</h4>
                <p>
                  I have gotten my soulmate here after registering, thanks to
                  this site.
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="card border-0">
              <div className="card-image">
                <img src={storygirl} alt="Story Girl" />
              </div>
              <div className="card-body">
                <h4 className="card-title">Cate</h4>
                <p>
                  Amazing successful stories tests, amazing successful stories tests amazing successful stories tests amazing successful stories tests amazing successful stories tests
                </p>
              </div>
            </div>
          </div>
          {/* Add more items here */}
        </OwlCarousel>
      </div>
    </section>
  );
};

export default StoryPage;
