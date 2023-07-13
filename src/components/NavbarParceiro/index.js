import React, { useContext } from 'react'

import SideItem from '../SideItem'
import {SignOut, Truck, UserCircle } from '@phosphor-icons/react'
import bigLogo from '../../assets/bigLogo.svg'
import { Context } from '../../context/AuthContext'


function NavbarP({ ...rest}) {
  const { handleLogout } = useContext(Context)
    return (
      <div className='sidebar'>
          <div className='logo'>
            <img src={bigLogo} alt="logo"/>
          </div>
    
        <div className='items'>
          <SideItem title="Solicitações" SideIcon={Truck} to="solicitacoes"/>
          <SideItem title="Andamento" SideIcon={Truck} to="andamento"/>
          <SideItem title="Finalizadas" SideIcon={Truck} to="finalizada"/>
          <SideItem title="Perfil" SideIcon={UserCircle} to="parceiro-perfil"/>
        </div>
          <div className='side-footer'>
            <button className='side-item' onClick={handleLogout}>
              <SignOut size={32} color="#667080" />
              <p>Sair</p>
            </button>
          </div>
  
        </div>
    )
  }
   export default NavbarP

