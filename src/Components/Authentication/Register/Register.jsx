import React from "react";
import FormComponent from "./FormComponent";
import banner from '../../../assets/images/banner.jpg'
import dark from '../../Home/child/image/banner.jpg'


const Register = () => {
  return (
    <section className="banner home intro-banner">
      <div className="container">
        <div className="row valign">
          <aside
            className="col-12 col-lg-7 hide-under-768px"
            data-valign-overlay="middle"
          >
            <h1 className="banner_caption white-text">
              Choose Your Soul Mate
              <br />
              From 100,000+ Lonely Hearts
            </h1>
          </aside>
          <FormComponent/>
        </div>
      </div>

      {/* Dark Background Image */}
      <div
        className="background-image-container dark"
        style={{
         backgroundImage: "url(https://truetiesdating.com/assets/banners/banner.jpg)"
        }}
      ></div>

      {/* Light Background Image */}
      <div
        className="background-image-container light"
        style={{
          backgroundImage: "url(https://truetiesdating.com/assets/banners/light-banner.jpg)"
        }}
      ></div>
    </section>
  );
};

export default Register;
