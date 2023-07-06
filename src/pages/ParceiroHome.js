import React, { useState } from 'react';
import './home.css'
import bigLogo from '../assets/logo.svg'
import {CarProfile, Truck, UserCircle, SignOut} from '@phosphor-icons/react'
import SideItem from '../components/SideItem';


export default function ParceiroHome(){
    return(
      <div className='sidebar'>
        <div className='logo'>
          <img src={bigLogo} alt="logo"/>
        </div>
  
      <div className='items'>
        <SideItem title="Solicitações" SideIcon={Truck} active/>
        <SideItem title="Em Andamento" SideIcon={Truck}/>
        <SideItem title="Finalizadas" SideIcon={Truck}/>
        <SideItem title="Perfil" SideIcon={UserCircle}/>
      </div>
        <div className='side-footer'>
          <SideItem title="Sair" SideIcon={SignOut}/>
        </div>

      </div>
  
    )
}