import React, { useContext, useState } from 'react'
import './index.css'
import api from '../../api'
import { toast } from 'react-hot-toast'
import { Context } from '../../context/AuthContext'
import {TailSpin} from 'react-loader-spinner'

function Solicitacao({data, onRefuse,...rest}) {
  const [loading, setLoading] = useState(false)
  const {Reload, userRole} = useContext(Context)

  async function handleRefuse(){
      setLoading(true)
      console.log("caralho")
      await api.put(`/solicitacao/${data.id}/status/${3}`).then( res=> {
        console.log("CU")
        Reload()
        setLoading(false)
      }).catch( err => {
        toast.error("Sessão expirada!")
        console.log(err)
        setLoading(false)
      })
  }

  async function handleAccept(){
    setLoading(true)
    console.log("caralho")
    await api.put(`/solicitacao/${data.id}/status/${2}`).then( res=> {
      console.log("CU")
      Reload()
    }).catch( err => {
      toast.error("Sessão expirada!")
      console.log(err)
    })
}

async function handleFinish(){
  setLoading(true)
  console.log("caralho")
  await api.put(`/solicitacao/${data.id}/status/${5}`).then( res=> {
    console.log("CU")
    Reload()
  }).catch( err => {
    toast.error("Sessão expirada!")
    console.log(err)
  })
}
  
  return (

    
    <div className='wrapper-solicitacao'>
      <div>

        <h2>{data.userCliente.nome}</h2>
        <div className='rowTwo'>
          <p>Tipo de veiculo: {data.veiculo.tipoVeiculo.tipoNome}</p>
        </div>
        <div className='rowTwo'>
          <p>{data.descricao}</p>
        </div>
        <div className='rowTwo'>
        <p>Veículo:</p>
        <p>{data.veiculo.marca}, {data.veiculo.modelo}, {data.veiculo.ano}, {data.veiculo.cor}</p>
        </div>
        <div className='rowTwo'>
        <p>Placa:</p>
        <p>{data.veiculo.placa}</p>
        <p>{data.status.status}</p>

        </div>
        <div className='map-button-wrapper'>
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${data.lat},${data.long}`} target="_blank" className='map-button' rel="noreferrer">Abrir no Mapa</a>
        </div>
        
      </div>
        {
          userRole === "GUINCHO" ? 
          <div className='buttons'>
        {
          data.status.id === 1 ?
          <>
          <button className='btn aceitar'onClick={handleAccept}>Aceitar</button>
          <button className='btn recusar' onClick={handleRefuse}>Recusar</button>
          </>
          : data.status.id === 2 ? 
          <>
          <button className='btn aceitar' onClick={handleFinish}>Finalizar</button>
          </>
          : ''
        }
        </div>
          
          : data.status.id === 1 ? 
          <>
            <TailSpin
              height="32"
              width="32"
              color="#000000"
              ariaLabel="loading"
              
            />
          </>
          
          : ''
        }
        
          
    </div>
  )
}
 export default Solicitacao


