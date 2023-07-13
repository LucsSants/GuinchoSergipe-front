import React, { useEffect, useState } from 'react';
import './home.css'
import { toast } from 'react-hot-toast';
import api from '../api';
import Solicitacao from '../components/Solicitacao';

export default function ParceiroFinalizada(){
  const [solicitacoes, setSolicitacoes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect( ()=>{
    (async () => {
      setLoading(true)
      console.log("caralho")
      const id = JSON.parse(await localStorage.getItem('userId'))
      await api.get(`/solicitacao/solicitacoesG/fin/${id}`).then( res=> {
        setSolicitacoes(res.data)
        console.log(res.data)
      }).catch( err => {
        toast.error("Sessão expirada!")
        console.log(err)
      })
    })();
    setLoading(false)
  },[])
  console.log()
    return(
      <div className='page'>
      {loading ? <p>Loading</p>
      :
      <>
      {
        solicitacoes.map(soli =>  (
          <Solicitacao key={soli.id} data={soli}/>
        ))
      }
      
      </>
    }
      </div>
    )
}