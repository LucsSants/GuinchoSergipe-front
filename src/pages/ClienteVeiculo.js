import React, { useContext, useEffect, useState } from 'react';
import './auth.css'
import api from '../api';
import { toast } from 'react-hot-toast';
import { Context } from '../context/AuthContext';
import Modal from '../components/Modal';
import Veiculo from '../components/Veiculo';

export default function ClienteVeiculo(){
  
  const [loading, setLoading] = useState(false)
  const [veiculos, setVeiculos] = useState([])
  const [modalStatus, setModalStatus] = useState(false)
  const {handleLogout} = useContext(Context)

  useEffect( ()=>{
    (async () => {
      setLoading(true)
      const id = JSON.parse(await localStorage.getItem('userId'))
      await api.get(`/veiculo/user/${id}`).then( res=> {
        setVeiculos(res.data)
      }).catch( err => {
        toast.error("Sessão expirada!")
        console.log(err)
      })
    })();
    setLoading(false)
  },[modalStatus])

  function onClose(){
    setModalStatus(false)
  }
    return(
      <>
      <Modal open={modalStatus} onClose={onClose}/>
      <div className='page'>

        {loading ? <div className='loading'>Loading...</div> : 
        
        veiculos.map((item) => {
          return(
            <Veiculo key={item.id} data={item}/>
            )
          })
        }
        <div className='footer-button'>
        <button className='form-button'type="button" onClick={()=> setModalStatus(true)}>Adicionar Veículo</button>
        </div> 
        </div>
      
    </>
  
    )
}