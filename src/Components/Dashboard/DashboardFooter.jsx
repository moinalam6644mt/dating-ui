import React from 'react'
import { Link } from 'react-router-dom'

const DashboardFooter = () => {
  return (
    <>
    {/* FIRST  */}
    <div className="small-footer" hidden>
      <div className="small-footer-copyrights">
        <p>
          © Copyright 2024{' '}
          <a href="http://localhost/matrimonial/">datingscript.com</a>. All rights are reserved. Powered by{' '}
          <a href="https://originatesoft.com/">originatesoft.com</a>
        </p>
      </div>
      <ul className="social-icon">
        <li>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/login" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-twitter-x"></i>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/accounts/login/">
            <i className="bi bi-instagram"></i>
          </a>
        </li>
        <li>
          <a href="https://in.linkedin.com/">
            <i className="bi bi-linkedin"></i>
          </a>
        </li>
      </ul>
      <div className="clearfix"></div>
    </div>

    {/* SECOND DIV  */}
        <div className="small-footer d-lg-none">
      <ul>
        <li>
          <Link to="/" className="active">
            <i className="bi bi-house bi-inactive"></i>
            <i className="bi bi-house-fill bi-active"></i>
            Home
          </Link>
        </li>
        <li>
          <Link to="/message/chat">
            <i className="bi bi-chat-text bi-inactive"></i>
            <i className="bi bi-chat-text-fill bi-active"></i>
            Message
          </Link>
        </li>
        <li>
          <Link to="/account/myprofile">
            <i className="bi bi-person bi-inactive"></i>
            <i className="bi bi-person-fill bi-active"></i>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/search/people">
            <i className="bi bi-search-heart bi-inactive"></i>
            <i className="bi bi-search-heart-fill bi-active"></i>
            Search
          </Link>
        </li>
      </ul>
    </div>
    </>
  
)}

export default DashboardFooter

