import React, { useState } from 'react';
import './auth.css'

import Input from '../components/Input'
import api from '../api';
import logo from '../assets/logo.svg'

import {Link} from 'react-router-dom'

export default function Login() {
  const [login, setLogin] = useState("")
  const [password, setPassowrd] =  useState("")

  async function handleLogin(){
    await api.post('/user/login', {
      "Email":login,
      "Password":password,
    }).then(async res =>{
      console.log(res.data)
      api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
      const {data : veiculo} = await api.get('/veiculo')
      console.log(veiculo)
      
    }).catch((error) => {
      console.log(error)
    })
    
  }

  return (
    <>
    <div className='container'>

     
      <div className='auth-container'>
      <img src={logo}></img>
      <h3 className='title'>Acesse sua conta</h3>
      
      <Input
        label="Email"
        placeholder='Email'  
        value={login}
        onChange={(e)=> {setLogin(e.target.value)}}
        />

      <Input
        label="Senha"
        placeholder='Senha' 
        type='password' 
        value={password}
        onChange={(e)=> {setPassowrd(e.target.value)}}
        />
      
      <button className='form-button' type="button" onClick={handleLogin}>Entrar</button>

      <div className='create'>
        <span>
          Não possui conta?
        </span>
        <Link to='/cadastro-cliente'>
          Crie sua conta.
        </Link>
      </div>
      <div className='create'>
        <span>
           Gostaria de se tonar um parceiro?
        </span>
        <Link to="/cadastro-parceiro">
        Cadastre-se agora!
          </Link>
      </div>
      </div>
    </div>
        </>
    
    )
}