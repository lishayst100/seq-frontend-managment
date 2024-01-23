import React, { useState } from 'react'
import Links from './Links'
import logo from '../../images/logo2.png'
import './Navbar.scss'
import { NavLink } from 'react-router-dom'

const OtherNavbar = () => {
  
  


  return (
  
    <div className='otherNavbar' 
    style={{position: 'fixed'}}
    >
        <NavLink to={'/'}>
            <img src={logo} alt="" style={{width:90}} />
        </NavLink>
        <Links/>
        
    </div>
   
  )
}

export default OtherNavbar