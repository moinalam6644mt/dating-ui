import React ,  { useContext } from 'react'
import AuthUser from '../../Authentication/AuthUser/AuthUser'
import AuthContext from '../../ContextApi/AuthProvider';

const BlockList = () => {
const {CallApi}=AuthUser();
const {allLanguageKey} =useContext(AuthContext)

try {
  
} catch (error) {
  
}

  return (
    <div class="dashboard-content-inner">
                <div id="block_users_container" class="allUser row gx-3 row-cols-xxl-5">            <article class="col-xxl-12">
                <div id="card-alert" class="not-result-found">			
                    <div class="noavatar">
                                                <img src="https://truetiesdating.com/assets/images/icon-girl.png" alt="" height="84" width="84"/>
                                            </div>
                    <h3>{allLanguageKey?.account_no_blocked_users}</h3>       
                    <p class="mx-auto">{allLanguageKey?.account_interest_me_para}.</p>                     
                    <a href="https://truetiesdating.com/account/get_matches" class="btn btn-outline-primary" style={{minWidth:'150px'}}>Get Matches</a>
                </div> 					  
            </article>
              </div>
		<div class="text-center mb-3" id="load_more_block_users">
			<a href="#" class="btn btn-primary ajax_pagination" data-bs-target="#block_users_container" style={{display:'none'}}>Load More</a>
		</div>
        
      </div>
  )
}

export default BlockList
