import React from 'react'
import './index.css'
import { Link, NavLink } from 'react-router-dom'

function SideItem({title,SideIcon, active, ...rest}) {
  return (
    <NavLink {...rest} className={`side-item`} activeclassname="active">
    
    <SideIcon size={32} color={active ? "#00875F" : "#667080"}/>
    <p>{title}</p>
  </NavLink>
  )
}
 export default SideItem


