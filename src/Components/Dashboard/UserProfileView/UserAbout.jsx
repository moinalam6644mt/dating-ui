import React from 'react'

const UserAbout = ({publicProfileData}) => {
  return (
    <div class="tab-content mb-3" id="myTabContent">
    <div class="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">
      <div class="row">
        <div class="col-md-6"> 
            <table class="table table-bordered">
               <tbody>                    
                                     <tr>
                      <th>My Favorite Movie</th>				   	
                    <td>{publicProfileData?.user_interest?.favoriteMovie || 'Not Available'}</td>
                  </tr>
                                        <tr>
                      <th>My Favorite Book</th>				   	
                    <td>{publicProfileData?.user_interest?.favoriteBook || 'Not Available'}</td>
                  </tr>
                                        <tr>
                      <th>My Favorite Food</th>				   	
                    <td>{publicProfileData?.user_interest?.favoriteFoodType || 'Not Available'}</td>
                  </tr>
                                        <tr>
                      <th>Music I Like</th>				   	
                    <td>{publicProfileData?.user_interest?.favoriteMusicType || 'Not Available'}</td>
                  </tr>
                                        <tr>
                      <th>My Hobbies &amp; Interest</th>				   	
                    <td><span>{publicProfileData?.user_interest?.favoriteHobbis || 'Not Available'}</span></td>
                  </tr>
                                        <tr>
                      <th>My Dressing Sense &amp; Physical Appereance</th>				   	
                    <td><span>{publicProfileData?.user_interest?.physicalAppearance || 'Not Available'}</span></td>
                  </tr>
                                        <tr>
                      <th>My Sense Of Homor</th>				   	
                    <td><span>{publicProfileData?.user_interest?.senseofHumor || 'Not Available'}</span></td>
                  </tr>
                                        <tr>
                      <th>I want to travel</th>				   	
                    <td><span>{publicProfileData?.user_interest?.liktoTravel || 'Not Available'}</span></td>
                  </tr>
                                        <tr>
                      <th>My Personality</th>				   	
                    <td><span>{publicProfileData?.user_interest?.personality || 'Not Available'}</span></td>
                  </tr>
                                        <tr>
                      <th>My Weekend Plan</th>				   	
                    <td><span>{publicProfileData?.user_interest?.howRomanticWeekSpand || 'Not Available'}</span></td>
                  </tr>
                                        <tr>
                      <th>My Matching Preference</th>				   	
                    <td><span>{publicProfileData?.user_interest?.perfectMatchPartner || 'Not Available'}</span></td>
                  </tr>
                                        <tr>
                      <th>My Partner From Different Culture</th>				   	
                    <td><span>{publicProfileData?.user_interest?.adaptiveWhenDiffCulture || 'Not Available'}</span></td>
                  </tr>
                                     </tbody>
            </table>                
        </div>
        <div class="col-md-6">
          <div class="table-responsive">
            <table class="table table-bordered">
            <tbody>
                <tr>
                  <th>Sex</th>
                  <td>{publicProfileData?.user_profile_data?.gender ||'Not Available'}</td>
                </tr>
                <tr>
                  <th>Language</th>
                  <td>{publicProfileData?.user_profile_data?.language ||'Not Available'}</td>
                </tr>
                <tr>
                  <th>Nationality:</th>
                  <td>{publicProfileData?.user_profile_data?.nationality ||'Not Available'}</td>
                </tr>
                <tr>
                  <th>Religion:</th>
                  <td>{publicProfileData?.user_profile_data?.religion ||'Not Available'}</td>
                </tr>
                <tr>
                  <th>Looking for</th>
                  <td>{publicProfileData?.user_profile_data?.looking_for ||'Not Available'}</td>
                </tr>
                <tr>
                  <th>Occupation</th>
                  <td>{publicProfileData?.user_profile_data?.occupation ||'Not Available'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
      <div class="card">
        <div class="card-body">
            <div class="row row-cols-xl-5 gx-3 gallery" id="gallery-pics">                
                                  <div class="col-xxl-2 col-lg-3 col-md-3 col-sm-4 col-6 mb-3">
                                    <a href="https://truetiesdating.com/assets/uploaded_gallery/cd4b87191ab03b3eec6bae7c72cad2da.jpg" title="">
                                  <img src="https://truetiesdating.com/assets/uploaded_gallery/cd4b87191ab03b3eec6bae7c72cad2da.jpg" alt="" class="img-fluid"/>
                                  </a></div>
                                  <div class="col-xxl-2 col-lg-3 col-md-3 col-sm-4 col-6 mb-3">
                                    <a href="https://truetiesdating.com/assets/uploaded_gallery/02bc22e445b8bc0680d083f20a0749f5.jpg" title="">
                                  <img src="https://truetiesdating.com/assets/uploaded_gallery/02bc22e445b8bc0680d083f20a0749f5.jpg" alt="" class="img-fluid"/>
                                  </a></div>
            
              </div>
                      </div>
      </div>
    </div>
   
  
 

</div>
  )
}

export default UserAbout
