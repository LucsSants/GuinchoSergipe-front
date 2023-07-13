import React, { useContext, useState } from 'react';
import './auth.css'

import Input from '../components/Input'
import api from '../api';
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';
import { Context } from '../context/AuthContext';
import { Toaster, toast } from 'react-hot-toast';
import { cpfMask } from '../utils/cpfMask ';

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassowrd] =  useState("")
  const [passwordConfirmation, setPassowrdConfirmation] =  useState("")
  const [cpf, setCpf] =  useState("")
  const [nome, setNome] =  useState("")
  const {handleCreate} = useContext(Context)
 
  function Create() {
    if (!email.trim() || !password.trim() || !passwordConfirmation.trim() || !cpf.trim() || !passwordConfirmation.trim() || !nome.trim()) {
      return toast.error("Preencha todos os campos!"); 
    } else {
      
      handleCreate(email,password,passwordConfirmation,cpf,nome)
    }
  }
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
        onChange={(e)=> {setCpf(cpfMask(e.target.value))}}
        />
        <Input
        label="Nome"
        placeholder='Nome' 
        value={nome}
        onChange={(e)=> {setNome(e.target.value)}}
        />
      
      <button className='form-button' type="button" onClick={Create}>Cadastre-se</button>

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