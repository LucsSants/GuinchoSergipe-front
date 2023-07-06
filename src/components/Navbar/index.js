import React from 'react'
import './index.css'
import SideItem from '../SideItem'
import { CarProfile, SignOut, Truck, UserCircle } from '@phosphor-icons/react'
import bigLogo from '../../assets/bigLogo.svg'


function Navbar({ ...rest}) {
  return (
    <div className='sidebar'>
        <div className='logo'>
          <img src={bigLogo} alt="logo"/>
        </div>
  
      <div className='items'>
        <SideItem title="Guinchos" SideIcon={Truck} to="guinchos"/>
        <SideItem title="Veículos" SideIcon={CarProfile} to="veiculos"/>
        <SideItem title="Perfil" SideIcon={UserCircle} to="perfil"/>
      </div>
        <div className='side-footer'>
          <button className='side-item'>
            <SignOut size={32} color="#667080"/>
            <p>Sair</p>
          </button>
        </div>

      </div>
  )
}
 export default Navbar


