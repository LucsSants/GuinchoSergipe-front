import { useState, useEffect } from 'react';
import api from '../../api';
import { customHistory } from '../../HistoryRouter';
import { toast } from 'react-hot-toast';
import jwt_decode from "jwt-decode"



export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole,setuserRole] = useState("")

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) { 
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      const decoded = jwt_decode(token)
      const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      setuserRole(role);
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);
  
  async function handleLogin(Email, Password) {
    setLoading(true)
     await api.post('/user/login',{
      "Email":Email,
      "Password":Password
    }).then(async res => {
      api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
      const decoded = jwt_decode(res.data.token)
      const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      setuserRole(role);
      localStorage.setItem('token', JSON.stringify(res.data.token));
      const {data} = await api.get(`/user/${res.data.email}`)
      localStorage.setItem('userId', JSON.stringify(data.id));
      console.log(data)
      setAuthenticated(true); 
      setLoading(false)
      customHistory.push("/guinchos")
    }).catch((error) => {
      console.log(error)
      setLoading(false)
      toast.error("Usuário ou senha incorretos!")
    })
  }

  async function handleCreate(email, password, passwordConfirmation,cpf,nome) {
      await api.post('/user/cadastro', {
        "Email":email,
        "Password":password,
        "PasswordConfirmation":passwordConfirmation,
        "Cpf":cpf,
        "Nome":nome,
  
      }).then(async res =>{
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
  
 

  function handleLogout() {
    api.defaults.headers.Authorization = undefined;
    setAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    customHistory.go(0)
  }


  
  return { authenticated, loading, handleLogin, handleLogout, handleCreate, userRole };
}