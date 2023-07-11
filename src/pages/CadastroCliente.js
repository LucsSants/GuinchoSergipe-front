import React, { useContext, useState } from 'react';
import './auth.css'

import Input from '../components/Input'
import api from '../api';
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';
import { Context } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassowrd] =  useState("")
  const [passwordConfirmation, setPassowrdConfirmation] =  useState("")
  const [cpf, setCpf] =  useState("")
  const [nome, setNome] =  useState("")
  const {handleCreate} = useContext(Context)
 

  return (
    <>
    <div className='container'>
    <Toaster/>
     
      <div className='auth-container'>
      <img src={logo} alt="logo"></img>
      <h3 className='title'>Crie sua conta</h3>
      
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
        <Input
        label="Cofirme sua senha"
        placeholder='Cofirme sua senha' 
        type='password' 
        value={passwordConfirmation}
        onChange={(e)=> {setPassowrdConfirmation(e.target.value)}}
        />
        <Input
        label="CPF"
        placeholder='CPF' 
        value={cpf}
        onChange={(e)=> {setCpf(e.target.value)}}
        />
        <Input
        label="Nome"
        placeholder='Nome' 
        value={nome}
        onChange={(e)=> {setNome(e.target.value)}}
        />
      
      <button className='form-button' type="button" onClick={()=>handleCreate(email,password,passwordConfirmation,cpf,nome)}>Cadastre-se</button>

      <div className='create'>
        <span>
          Já possui cadastro?
        </span>
        <a href='/login'>
          Fazer login
        </a>
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