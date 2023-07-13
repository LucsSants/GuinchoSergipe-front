import React, { useContext, useEffect, useState } from 'react';
import './home.css'
import { toast } from 'react-hot-toast';
import api from '../api';
import Solicitacao from '../components/Solicitacao';
import { Context } from '../context/AuthContext';

export default function ParceiroHome(){
  const [solicitacoes, setSolicitacoes] = useState([])
  const [loading, setLoading] = useState(false)
  const {reloadIt} = useContext(Context)


  useEffect( ()=>{
    (async () => {
      setLoading(true)
      console.log("caralho")
      const id = JSON.parse(await localStorage.getItem('userId'))
      await api.get(`/solicitacao/solicitacoesG/${id}/1`).then( res=> {
        setSolicitacoes(res.data)
        console.log(res.data)
      }).catch( err => {
        toast.error("Sessão expirada!")
        console.log(err)
      })
    })();
    setLoading(false)
  },[reloadIt])
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