import React, { useContext, useEffect, useState } from 'react';
import './home.css'
import api from '../api';
import { toast } from 'react-hot-toast';
import Guincho from '../components/Guincho';
import { Context } from '../context/AuthContext';


export default function ClienteHome(){
  const [guinchos, setGuinchos] = useState([])
  const [loading, setLoading] = useState(false)
  const {userRole} = useContext(Context)
  useEffect( ()=>{
    (async () => {
      setLoading(true)
      await api.get(`/user/guinchos`).then( res=> {
        console.log(res.data)
        setGuinchos(res.data)
      }).catch( err => {
        toast.error("Sessão expirada!")
        console.log(err)
      })
    })();
    setLoading(false)
  },[])
  return(
    <div className='page'>
         {loading ? (
          <div>
            <p>Loading</p>
          </div>
         ) :
          (
            <>
              {
                guinchos.map(guincho => (
                  <Guincho key={guincho.id} data={guincho}/>
                  ))
                }
              <p>{userRole}</p>
            </>
          )
         }
       
      </div>
  
    )
}