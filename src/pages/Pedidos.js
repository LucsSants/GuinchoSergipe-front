import React, { useContext, useEffect, useState } from 'react';
import './home.css'
import { toast } from 'react-hot-toast';
import api from '../api';
import Solicitacao from '../components/Solicitacao';
import { Context } from '../context/AuthContext';

export default function Pedidos(){
  const [pedidosFinalizados, setPedidosFinalizados] = useState([])
  const [pedidosAndamento, setPedidosAndamento] = useState([])
  const [pedidosPendentes, setPedidosPendentes] = useState([])
  const [loading, setLoading] = useState(false)
  const {reloadIt} = useContext(Context)

  useEffect( ()=>{
    (async () => {
      setLoading(true)
      console.log("caralho")
      const id = JSON.parse(await localStorage.getItem('userId'))
      await api.get(`/solicitacao/solicitacoesC/fin/${id}`).then( res=> {
        setPedidosFinalizados(res.data)
        console.log(res.data)
      }).catch( err => {
        toast.error("Sessão expirada!")
        console.log(err)
      })
      await api.get(`/solicitacao/solicitacoesC/${id}/1`).then( res=> {
        setPedidosPendentes(res.data)
        console.log(res.data)
      }).catch( err => {
        toast.error("Sessão expirada!")
        console.log(err)
      })
      await api.get(`/solicitacao/solicitacoesC/${id}/2`).then( res=> {
        setPedidosAndamento(res.data)
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