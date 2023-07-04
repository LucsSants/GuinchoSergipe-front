import React from 'react'
import './index.css'
import { Truck } from '@phosphor-icons/react'
import './index.css'

function SideItem({title,SideIcon, active, ...rest}) {
  return (
    <div className={`side-item ${active ? 'active' : ''}`}>
    
    <SideIcon size={32} color={active ? "#00875F" : "#667080"}/>
    <p>{title}</p>
  </div>
  )
}
 export default SideItem


