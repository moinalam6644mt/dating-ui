import React, { useContext, useEffect, useState } from 'react'
import AuthUser from '../../Authentication/AuthUser/AuthUser'
import AuthContext from '../../ContextApi/AuthProvider';

const FooterDetails = () => {
const {CallApi}=AuthUser();
const {language,selectedValue}=useContext(AuthContext)
const [DetailsData,setDetailsData]=useState()

useEffect(()=>{
    FooterDetailsData()
},[])


const FooterDetailsData=async()=>{
    let response;
    try {
        response = await CallApi({
            api:`/footer_content?slug=${selectedValue}&lang=${language}`,
            method:'GET'
        })
        if(response){
            setDetailsData(response.content_list)
        }
    } catch (error) {
        console.error('data not found')
    }
}

  return (
    <section className="sec sub-banner">
    <div className="dark-wrapper">
    <h2 className="center">{selectedValue || 'Value'}</h2>
                                        
    <div className="container"><h2>Where can I get some?</h2>
    
    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
    </div>
            
    </div>
    </section>
  )
}

export default FooterDetails
