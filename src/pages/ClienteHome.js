import React, { useState } from 'react';
import './home.css'
import bigLogo from '../assets/logo.svg'
import {CarProfile, Truck, UserCircle, SignOut} from '@phosphor-icons/react'
import SideItem from '../components/SideItem';


export default function ClienteHome(){
    return(
      <div className='sidebar'>
        <div className='logo'>
          <img src={bigLogo} alt="logo"/>
        </div>
  
      <div className='items'>
        <SideItem title="Guinchos" SideIcon={Truck} active/>
        <SideItem title="Veículos" SideIcon={CarProfile}/>
        <SideItem title="Perfil" SideIcon={UserCircle}/>
      </div>
        <div className='side-footer'>
          <SideItem title="Sair" SideIcon={SignOut}/>
        </div>

      </div>
  
    )
}