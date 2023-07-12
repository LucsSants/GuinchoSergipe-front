import React, { useContext, useEffect, useState } from 'react';
import api from '../api';
import { toast } from 'react-hot-toast';
import { Context } from '../context/AuthContext';


export default function ClientePerfil(){

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [userTipos,setUserTipos] = useState([])
  

  const {userRole} = useContext(Context)

  useEffect( ()=>{
    (async () => {
      const id = JSON.parse( await localStorage.getItem('userId'))
      console.log(id)
      setLoading(true)
      await api.get(`/user/id/${id}`).then( res=> {
        if (userRole === "GUINCHO") {
          setUserTipos(res.data.user_TiposVeiculo)
        }
        console.log(res.data.user_TiposVeiculo[0])
        setUser(res.data)
        setLoading(false)
      }).catch( err => {
        toast.error("Sessão expirada!")
        console.log(err)

      })
    })();
    setLoading(false)
  },[])
    return(
      <div className='page'>
        {
          loading ? <div>Loading</div>
          :
          <>
          <h1>Perfil</h1>
          <p>Nome: {user.nome}</p>
          <p>Email: {user.email}</p>
          <p>CPF: {user.cpf}</p>
          {userRole === "GUINCHO" ? 
          <>
          <p>Tipos:</p> {userTipos.map(a => <p key={a.tipoVeiculo.id}> {a.tipoVeiculo.tipoNome}</p>)}
          </>
          : ''  
        }
          </>
        }
        
      </div>
  
    )
}