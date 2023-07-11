import { useState, useEffect } from 'react';
import api from '../../api';
import { customHistory } from '../../HistoryRouter';
import { toast } from 'react-hot-toast';



export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) { 
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
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
      console.log(res.data.token)
      localStorage.setItem('token', JSON.stringify(res.data.token));
      api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
      setAuthenticated(true); 
      setLoading(false)
      customHistory.push("/guinchos")
    }).catch((error) => {
      console.log(error)
      setLoading(false)
      toast.error("Usuário ou senha incorretos!")
    })
  }

  async function handleCreate(userNome, userLogin, userSenha) {
    await api.post('/usuario', {
      "usuTxNome": userNome,
      "usuTxLogin": userLogin,
      "usuTxSenha": userSenha
    }).then( res => {
      if(res.data.codigo === 200) {
        alert.success(res.data.mensagem);
      } else {
        alert.error(res.data.mensagem);
      }
    }
    ).catch((err)=> {
      alert.error(err.response.data.errors[0].defaultMessage,);
      
    })
  }
 

  function handleLogout() {
    api.defaults.headers.Authorization = undefined;
    setAuthenticated(false);
    localStorage.removeItem('token');
    customHistory.go(0)
  }


  
  return { authenticated, loading, handleLogin, handleLogout, handleCreate };
}