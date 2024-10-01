import React from 'react'

const Contact = () => {
  return (
    <section className="sec">
  <div className="dark-wrapper">                      
      <div className="container">
      <div className="section-headline text-center mb-4">
        <h1 className="fs-2">Contact us</h1>
      </div>            
      	<div className="row center address">
        	<article className="col-md-4">
            <div className="card card-body address-item z-depth-1">
            	<i className="material-icons medium">location_on</i><br/>
            	<p><a className="nocolor">via zanata 1 monza</a>
			</p></div>
            </article>
            <article className="col-md-4">
            <div className="card card-body address-item z-depth-1">
            	<i className="material-icons medium">local_phone</i>
            	<p><a className="nocolor">3298063212 </a> </p>
			</div>
            </article>
            <article className="col-md-4">
            <div className="card card-body address-item z-depth-1">
            	<i className="material-icons medium">email</i>
            	<p><a className="nocolor">undici11undici@GMAIL.COM</a>
			</p></div>
            </article>
        </div>
		
          <div id="errorMessage" className="alert alert-danger" role="alert" style={{display:'none'}}>
              <button type="button" className="close white-text" data-bs-dismiss="alert" aria-label="Close">
            </button>
          </div>
          <div id="successMessage" className="alert alert-success" role="alert" style={{display:'none'}}>
              <button type="button" className="close white-text" data-bs-dismiss="alert" aria-label="Close">
            </button>
          </div>
        
        <div className="card">
        <div className="card-content">  
          <form onsubmit="ajaxSubmit(this, event)">
            <div className="row">
              <div className="col-md-6">
                  <div className="form-floating mb-4">
                  <input id="name" type="text" className="form-control" name="name" placeholder=""/>
				          
                  <label for="name">Name</label>
                  <div className="error" id="nameError"></div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-4">
                  <input id="email" type="email" className="form-control" name="email" placeholder=""/>
				          
          		    <label for="email" data-error="wrong" data-success="right">Email</label>
                  <div className="error" id="emailError"></div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-4">                  
                  <input id="subject" type="text" className="form-control" name="subject" placeholder=""/>
				          
                  <label for="subject">Subject</label>
                  <div className="error" id="subjectError"></div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-4">                  
                  <input id="mobile" type="text" className="form-control" name="mobile" placeholder=""/>
				          
                  <label for="mobile">Phone number</label>
                  <div className="error" id="mobileError"></div>
                </div>
              </div>
              <div className="col-12">                  
				        <div className="form-floating mb-4">
                  <textarea id="textarea1" className="form-control" name="message" placeholder="" style={{minHeight:'100px'}}></textarea>
                  <label for="textarea1">Messages</label>
                
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Send</button>
			</form>
            
        </div>
        </div>
        <div className="spacer-20"></div>
	  </div>

      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2252.217347018316!2d12.570953581883836!3d55.6330329416354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465254bb99a47afd%3A0x674f567708bafe32!2sEdvard%20Thomsens%20Vej%2039%2C%20floor%2C%202300%2C%202300%20K%C3%B8benhavn%2C%20Denmark!5e0!3m2!1sen!2sin!4v1712767297447!5m2!1sen!2sin" height="400" frameborder="0" style={{border:'0',width:'100%'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
</section>
  )
}

export default Contact
