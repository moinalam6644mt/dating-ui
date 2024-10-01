import React from 'react'
import Header from '../Header/Header'

const AdditionalLayout = ({children}) => {
  return (
    <div>
     <Header/>
     <div className='dashboard-container message-page'>
      <div className='dashboard-content-container'>
        {children}
        </div>
      </div>
  
    </div>
  )
}

export default AdditionalLayout
