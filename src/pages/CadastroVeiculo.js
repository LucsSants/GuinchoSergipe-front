import React, { useState } from 'react';
import './auth.css'

import Input from '../components/Input'
import api from '../api';



export default function CadastroVeiculo(){
    const [modelo, setModelo] = useState("")
    const [marca, setMarca] =  useState("")
    const [placa, setPlaca] =  useState("")
    const [tipo, setTipo] =  useState("")
    const [cor, setCor] =  useState("")
    const[ano, setAno] = useState("")
  
    async function handleCreateVeiculo(){
      await api.post('/veiculo/cadastro', {
        "Modelo":modelo,
        "Marca":marca,
        "Placa":placa,
        "Cor":cor,
        "Ano":ano,
  
      }).then(async res =>{
        console.log(res.data)
        
      }).catch((error) => {
        console.log(error)
      })
     
      console.log(modelo, marca, placa, tipo, cor,ano)
    }
  
    return (
      <>
      <div className='container'> 
       
        <div className='auth-container'>  
        
        <Input
          label="Modelo"
          placeholder='Modelo'  
          value={modelo}
          onChange={(e)=> {setModelo(e.target.value)}}
          />
  
        <Input
          label="Marca"
          placeholder='Marca'
          value={marca}
          onChange={(e)=> {setMarca(e.target.value)}}
          />
          <Input
          label="Placa"
          placeholder='Placa'  
          value={placa}
          onChange={(e)=> {setPlaca(e.target.value)}}
          />
        <div>
            <h4>Tipo de Veículo</h4>
         <select  value={tipo} onChange={(e)=>setTipo(e.target.value)}>
            <option value="Motocicleta"> Moto </option>
            <option value="Carro"> Carro </option>
            <option value="SUV"> Carro </option>
            <option value="Caminhonete"> Carro </option>
            <option value="Ônibus"> Ônibus </option>
            <option value="Caminhão"> Caminhão </option>
          </select>    
          </div>
          <Input
          label="Cor"
          placeholder='Cor' 
          value={cor}
          onChange={(e)=> {setCor(e.target.value)}}
          />
          <Input
          label="Ano"
          placeholder='Ano' 
          value={ano}
          onChange={(e)=> {setAno(e.target.value)}}
          />
        <button className='form-button' type="button" onClick={handleCreateVeiculo}>Cadastrar Veículo</button>
        </div>
    </div>
      </>
      
    )
}