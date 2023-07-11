import React, { useContext, useState } from 'react';
import './auth.css'

import Input from '../components/Input'
import api from '../api';
import logo from '../assets/logo.svg'

import {Link} from 'react-router-dom'
import { Context } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassowrd] =  useState("")
  const {authenticated, handleLogin} = useContext(Context)

  return (
    <>
    <div className='container'>
      <Toaster />
      <div className='auth-container'>
      <img src={logo} alt="Logo"></img>
      <h3 className='title'>Acesse sua conta</h3>
      
      <Input
        label="Email"
        placeholder='Email'  
        value={email}
        onChange={(e)=> {setEmail(e.target.value)}}
        />

      <Input
        label="Senha"
        placeholder='Senha' 
        type='password' 
        value={password}
        onChange={(e)=> {setPassowrd(e.target.value)}}
        />
      
      <button className='form-button' type="button" onClick={()=> {handleLogin(email,password)}}>Entrar</button>

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