import React, {useContext} from "react";
import AuthContext from "../../ContextApi/AuthProvider";
import { Link } from "react-router-dom";
import {
  BsTwitterX,
  BsFacebook,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";


const Footer = () => {
  const {setSelectedValue}=useContext(AuthContext)
  const navigate = useNavigate();

  const ShowFooterData = (value) => {
    setSelectedValue(value);
    navigate(`/cms?content=${value}`);
  };

  return (
    <footer>
      <div className="container">
        <div className="row">
          <article className="col-md-4 col-sm-6">
            <div className="mb-3">
              <img
                src="https://truetiesdating.com/assets/images/logo-dark.png"
                alt="Eroflirts"
                className="logo-dark"
                height="48"
              />
            </div>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable.
            </p>
          </article>

          <article className="col-md-3 col-sm-6">
            <h4>Company</h4>
            <ul className="foot-nav" style={{ cursor: "pointer" }}>
              <li>
                <a onClick={() => ShowFooterData("success-story")}>
                  Success stories
                </a>
              </li>
              <li>
                <a onClick={() => ShowFooterData("dating-safety")}>
                  Dating safety
                </a>
              </li>
              <li>
                <a onClick={() => ShowFooterData("site-map")}>Site map</a>
              </li>
              <li>
                <a onClick={() => ShowFooterData("about-us")}>About us</a>
              </li>
              <li>
                <a onClick={() => ShowFooterData("terms-conditions")}>
                  Terms and conditions
                </a>
              </li>
              <li>
                <a onClick={() => ShowFooterData("privacy-policy")}>
                  Privacy policy
                </a>
              </li>
            </ul>
          </article>

          <article className="col-md-3 col-sm-6">
            <h4>Share love</h4>
            <ul className="social-icon mb-4">
              <li>
                <a href="#" target="_blank">
                  <BsTwitterX />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <BsFacebook />{" "}
                </a>
              </li>
              <li>
                <a href="#">
                  <BsInstagram />
                </a>
              </li>
              <li>
                <a href="#">
                  <BsLinkedin />
                </a>
              </li>
            </ul>
          </article>

          <article className="col-md-2 col-sm-6">
            <h4>Help</h4>
            <ul className="foot-nav">
              <li>
                <Link to ='/contact'>Contact us</Link>
              </li>
              <li>
                <Link to ='/feedback'>Feedback</Link>
              </li>
              <li>
                <Link to ='/faq'>FAQ's</Link>
              </li>
            </ul>
          </article>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
