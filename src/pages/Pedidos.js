import React, { useContext, useEffect, useState } from 'react';
import './home.css'
import { toast } from 'react-hot-toast';
import api from '../api';
import Solicitacao from '../components/Solicitacao';
import { Context } from '../context/AuthContext';
import { useQuery } from 'react-query';


export default function Pedidos(){
  const [pedidosFinalizados, setPedidosFinalizados] = useState([])
  const [pedidosAndamento, setPedidosAndamento] = useState([])
  const [pedidosPendentes, setPedidosPendentes] = useState([])
  const [previousAttribute, setPreviousAttribute] = useState([])
  const [currentAttribute, setcurrentAttribute] = useState()
  const [loading, setLoading] = useState(false)
  const {reloadIt,Reload} = useContext(Context)
  const [attemptCount, setAttemptCount] = useState(0);
  const maxAttempts = 6; // Número máximo de tentativas

  useEffect( ()=>{
    (async () => {
      const id = JSON.parse(localStorage.getItem('userId'))
      setLoading(true)
      await api.get(`/solicitacao/solicitacoesC/fin/${id}`).then( res=> {
        setPedidosFinalizados(res.data)
        console.log("a")
      }).catch( err => {
        toast.error("Sessão expirada!")
        
      })
      await api.get(`/solicitacao/solicitacoesC/${id}/2`).then( res=> {
        setPedidosAndamento(res.data)
      }).catch( err => {
        toast.error("Sessão expirada!")
        console.log(err)
      })
      await api.get(`/solicitacao/solicitacoesC/${id}/1`).then( res=> {
        setPedidosPendentes(res.data)
      }).catch( err => {
        toast.error("Sessão expirada!")
        console.log(err)
      })
    })()
    const interval = setInterval(() => {
      Reload()
    }, 10000);
    setLoading(false)
    return () => clearInterval(interval);
    },[reloadIt])

    

    return(

      <div className='page'>
      {loading ? <p>Loading</p>
      :
      <>
        <h2>Pendentes:</h2>
        {  
        pedidosPendentes.map(soli =>  (
          <Solicitacao key={soli.id} data={soli}/>
          ))
        }
        <h2>Em adamento:</h2>
        {  
        pedidosAndamento.map(soli =>  (
          <Solicitacao key={soli.id} data={soli}/>
          ))
        }
          <h2>Finlizados:</h2>
      {  
        pedidosFinalizados.map(soli =>  (
          <Solicitacao key={soli.id} data={soli}/>
          ))
        }
      
      </>
    }
      </div>
    )
}
