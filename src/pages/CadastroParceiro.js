import React, { useContext, useEffect, useState } from 'react';
import './auth.css'

import Input from '../components/Input'
import api from '../api';
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Context } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassowrd] =  useState("")
  const [passwordConfirmation, setPassowrdConfirmation] =  useState("")
  const [cpf, setCpf] =  useState("")
  const [nome, setNome] =  useState("")
  const [tipos, setTipos] = useState([])
  const [tiposId, setTiposId] = useState([])
  const [loading, setLoading] = useState(false)

  const {handleLogin} = useContext(Context)


  

  function handleCheckbox(event) {
    const {value, checked} = event.target
    if (checked) {
      setTiposId(current => [...current, Number(value)])
    } else (
      setTiposId(current => {return  [...current.filter(tipo => tipo !== Number(value))]})
    )   
    
  }
  console.log(tiposId)

  useEffect( ()=>{
    (async () => {
      setLoading(true)
      await api.get(`/tipoveiculo`).then( res=> {
        console.log(res.data)
        setTipos(res.data)
      }).catch( err => {
        console.log(err)
      })
    })();
    setLoading(false)
  },[])
  
  async function handleCreateUser(){
    if (!email.trim() || !password.trim() || !passwordConfirmation.trim() || !cpf.trim() || !passwordConfirmation.trim() || !nome.trim()) {
      return toast.error("Preencha todos os campos!"); 
    } else if(!tiposId) {
      return toast.error("Insira pelo menos 1 tipo de veículo")
    }
    await api.post('/user/cadastroguincho', {
      "Email":email,
      "Password":password,
      "PasswordConfirmation":passwordConfirmation,
      "Cpf":cpf,
      "Nome":nome,
      "TiposId": tiposId

    }).then(async res =>{
      console.log(res.data)
      handleLogin(email,password)
      
    }).catch((error) => {
      if (error.response.data.title){
        toast.error("Email no formato incorreto!")
      } else {
        const errors = error.response.data.split(",")
        console.log(errors)
        errors.forEach(error=> toast.error(error))
      }
    })
   
    console.log(email, password,passwordConfirmation, cpf,nome)
  }

  return (
    <>
    <Toaster/>
    <div className='container'>
    
     
      <div className='auth-container'>
      <img src={logo} alt="logo"></img>
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

        <div className='check-container'>
          <label>Quais tipos de veículos você atende?</label>
          <div className='check-wrapper'>
          
          {
            tipos.map(tipo => { return (
              <div className='checks' key={tipo.id}>
                <input type="checkbox" name={tipo.tipoNome} value={tipo.id} onChange={handleCheckbox}/>
                <label htmlFor={tipo.tipoNome}>{tipo.tipoNome}</label>
              </div>
              )
            })
          }
          </div>

        </div>
      
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