import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import { Context } from '../../context/AuthContext'
import Modal from '../Modal'
import { toast } from 'react-hot-toast'
import api from '../../api'

function Guincho({data, openModal, ...rest}) {
  const [modalStatus, setModalStatus] = useState(false)

  return (
    <div className='wrapper-guincho'>
      <div>
        <h2>{data.nome}</h2>
        <div className='rowTwo'>
         <p>Atende esses tipos de Veículos:</p>{data.user_TiposVeiculo.map( tipo=> <ul className='lista' key={tipo.tipoVeiculo.id}><li>{tipo.tipoVeiculo.tipoNome}</li></ul>)}
        </div>
      </div>
      <div>
        <button className='bttn-guincho' onClick={openModal}>Chamar Guincho</button>
      </div>
          
    </div>
  )
}
 export default Guincho


