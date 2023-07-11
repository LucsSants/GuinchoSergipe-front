import React, { useEffect, useState } from 'react';
import './auth.css'
import api from '../api';

export default function ClienteVeiculo(){
  
  const [loading, setLoading] = useState(false)
  const [veiculos, setVeiculos] = useState([])

  useEffect( ()=>{
    (async () => {
      setLoading(true)
      await api.get("/veiculo").then( res=> {
        setVeiculos(res.data)
      })
    })();
    setLoading(false)
  },[])

    return(
      <div className='page'>
        {loading ? <div className='loading'>Loading...</div> : 
        
          veiculos.map((item) => {
            return(
              <ul key={item.id}>
              <li>Modelo:{item.modelo}, Marca: {item.marca}, Cor:{item.cor}, Ano:{item.ano}, Palca:{item.placa}</li>
            </ul>
            )
          })

        }
        <div className='footer-button'>
        <button className='form-button'type="button">Adicionar Veículo</button>
        </div> 
      </div>
  
    )
}