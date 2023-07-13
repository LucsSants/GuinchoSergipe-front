import React, { useContext, useEffect, useState } from 'react';
import './home.css'
import api from '../api';
import { toast } from 'react-hot-toast';
import Guincho from '../components/Guincho';
import { Context } from '../context/AuthContext';
import Modal from '../components/Modal';
import ModalGuincho from '../components/ModalGuincho';


export default function ClienteHome(){
  const [guinchos, setGuinchos] = useState([])
  const [loading, setLoading] = useState(false)
  const [lat, setLat] = useState("")
  const [long, setLong] = useState("")
  const {userRole} = useContext(Context)
  const [guinchoId, setGuinchoId] = useState("")
  const [permissionStatus, setPermissionStatus] = useState("")

  const [modalStatus, setModalStatus] = useState(false)
  function onClose(){
    setModalStatus(false)
  }

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
      navigator.permissions.query({ name: 'geolocation' })
      .then(res => {
        setPermissionStatus(res.state)
        getLocation()
      })
    })();
    setLoading(false)
  },[])

  function getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position.coords.latitude, position.coords.longitude)
      setLat(position.coords.latitude) 
      setLong(position.coords.longitude)
      });
    } else  { 
      
    }
  }
  
  function openModal(id) {
    if(permissionStatus !== 'granted') {
      alert("Você precisa permiter a localização (lembre de atualizar a página após permissão) :)")
      return getLocation()
    }
    setModalStatus(true)
    setGuinchoId(id) 
  }
  
  return(
    <>
      <ModalGuincho open={modalStatus} onClose={onClose} guinchoId={guinchoId} lat={lat} long={long}/>
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
                  
                  <Guincho key={guincho.id} data={guincho} openModal={()=> openModal(guincho.id)} />
                  
                  ))
                }
              <p>{userRole}</p>
            </>
          )
        }
       
      </div>
  
        </>
    )
}