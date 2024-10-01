import React, { useContext, useEffect, useState } from 'react'
import Register from '../Authentication/Register/Register'
import ProfileGalleryList from './child/ProfileGalleryList'
import Soulmate from './child/Soulmate'
import TabGalleryList from './child/TabGalleryList'
import StoryPage from './child/StoryPage'
import FactPart from './child/FactPart'
import toast from 'react-hot-toast'
import AuthUser from '../Authentication/AuthUser/AuthUser'
import AuthContext from '../ContextApi/AuthProvider'

const Home = () => {
 const {alluserData,setAlluserData}=useContext(AuthContext);

const {CallApi}=AuthUser();
  useEffect(()=>{
    fetchHomeDetails();
  },[])

  const fetchHomeDetails=async()=>{
    let response;
    try {
      response = await CallApi({
        api:'/home',
        method:'GET',
      })
      if(response && response.status===1){
        setAlluserData(response)
      }else{
        toast.error(response.message)
      }
    } catch (error) {
  console.error("response data did not find")
    }
  }


  return (
    <div >
      <Register/>
      <ProfileGalleryList/>
      <Soulmate/>
      <TabGalleryList/>
      <StoryPage/>
      <FactPart/>
      
    </div>
  )
}

export default Home
