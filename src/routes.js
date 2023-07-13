import { Routes as ReactRoutes , Route, BrowserRouter, Outlet, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import CadastroCliente from './pages/CadastroCliente'
import CadastroParceiro from './pages/CadastroParceiro'
import ClienteHome from './pages/ClienteHome';
import ParceiroHome from './pages/ParceiroHome';
import Navbar from './components/Navbar';
import ClienteVeiculo from './pages/ClienteVeiculo';
import ClientePerfil from './pages/ClientePerfil';
import NavbarP from './components/NavbarParceiro';
import ParceiroPerfil from './pages/ParceiroPerfil';
import ParceiroAndamento from './pages/ParceiroAndamento';
import ParceiroFinalizada from './pages/ParceiroFinalizada';
import { HistoryRouter } from './HistoryRouter';
import { useContext } from 'react';
import { Context } from './context/AuthContext';
import customHistory from './history';
import Pedidos from './pages/Pedidos';




export default function Routes() {
  const { loading, authenticated, userRole} = useContext(Context);
  return (
    <HistoryRouter history={customHistory}>
      <ReactRoutes>
    {authenticated ? 

    userRole === "CLIENTE" ? (
      <>
        <Route path="/" element={<Navigate to={'/guichos'}/>}/>
          <Route path="" element={
             <>
              <Navbar />
              <Outlet />
            </>  
          }>
            <Route path="" element={<Navigate to={'/guinchos'}/>}/>
            <Route path="*" element={<Navigate to={'/guinchos'}/>}/>   
  
            <Route path="/guinchos" element={<ClienteHome/>}/>          
            <Route path="/veiculos" element={<ClienteVeiculo/>}/>          
            <Route path="/perfil" element={<ClientePerfil/>}/> 
            <Route path="pedidos" element={<Pedidos/>}/>     
          </Route>
      </>
    ) : 
      <>
      <Route path="/" element={
            <Navigate to={'/solicitacoes'}/>}/>
          <Route path="" element={
              <>
              <NavbarP />
              <Outlet />
            </>
          }>

          <Route path="" element={<Navigate to={'/solicitacoes'}/>}/>
          <Route path="*" element={<Navigate to={'/solicitacoes'}/>}/>

          <Route path="solicitacoes" element={<ParceiroHome/>}/>   
          <Route path="andamento" element={<ParceiroAndamento/>} /> 
          <Route path="finalizada" element={<ParceiroFinalizada/>}/>         
          <Route path="parceiro-perfil" element={<ClientePerfil/>}/>     

        </Route>
      </>

    : 
      <>
        <Route path="" element={<Navigate to={'/login'}/>}/>
        <Route path="*" element={<Navigate to={'/login'}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cadastro-cliente" element={<CadastroCliente/>}/>
        <Route path="/cadastro-parceiro" element={<CadastroParceiro/>}/>
      </>
    }
      </ReactRoutes>        
    </HistoryRouter>
  );
}