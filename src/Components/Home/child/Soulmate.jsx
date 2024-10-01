import React from 'react'
import img1 from './image/001.png'
import img2 from './image/002.png'
import img3 from './image/003.png'
import { Link } from 'react-router-dom'

const Soulmate = () => {
  return (
    <section className="sec works">
  <div className="container">
    <div className="section-headline text-center">
      <h4 className="subtitle">How It Works?</h4>
      <h2 className="title divider-2">Step To Find Your Soul Mate</h2>
    </div>
    <div className="row">
      
      <aside className="col-md-4 col-sm-6 col-12">
        <div className="widget text-center"> <img src={img1} alt="icon" height="84" width="84"/>
          <h4 className="divider-3">Create A Profile</h4>
          <p>Create a personalized profile, add photos and describe your ideal partner</p>
        </div>
      </aside>
      <aside className="col-md-4 col-sm-6 col-12">
        <div className="widget text-center"> <img src={img2} alt="icon" height="84" width="84"/>
          <h4 className="divider-3">Find Matches</h4>
          <p>Find members based on location, special interests and lifestyle preferences</p>
        </div>
      </aside>
      <aside className="col-md-4 col-sm-6 col-12">
        <div className="widget text-center"> <img src={img3} alt="icon" height="84" width="84"/>
          <h4 className="divider-3">Start Dating</h4>
          <p>Show interest in the members you like and let the journey begin</p>
        </div>
      </aside>
     
    </div>
    <div className="text-center">
      <Link to='/login' className="btn btn-primary">Find your match</Link>
    </div>
  </div>
</section>
  )
}

export default Soulmate
