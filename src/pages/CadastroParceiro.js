import React, { useState } from 'react';
import './auth.css'

import Input from '../components/Input'
import api from '../api';
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassowrd] =  useState("")
  const [passwordConfirmation, setPassowrdConfirmation] =  useState("")
  const [cpf, setCpf] =  useState("")
  const [nome, setNome] =  useState("")

  async function handleCreateUser(){
    await api.post('/user/cadastro', {
      "Email":email,
      "Password":password,
      "PasswordConfirmation":passwordConfirmation,
      "Cpf":cpf,
      "Nome":nome,

    }).then(async res =>{
      console.log(res.data)
      
    }).catch((error) => {
      console.log(error)
    })
   
    console.log(email, password,passwordConfirmation, cpf,nome)
  }

  return (
    <>
    <div className='container'>

     
      <div className='auth-container'>
      <img src={logo}></img>
      <h3 className='title'>Torne-se Parceiro</h3>
      
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
        label="CPF/CPNJ"
        placeholder='CPF/CPNJ' 
        value={cpf}
        onChange={(e)=> {setCpf(e.target.value)}}
        />
        <Input
        label="Nome"
        placeholder='Nome' 
        value={nome}
        onChange={(e)=> {setNome(e.target.value)}}
        />
      
      <button className='form-button' type="button" onClick={handleCreateUser}>Cadastre-se</button>

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
           Gostaria de se tonar um cliente?
        </span>
        <Link to="/cadastro-cliente">
        Crie sua conta.
        </Link>
      </div>
      </div>
    </div>
        </>
    
    )
}