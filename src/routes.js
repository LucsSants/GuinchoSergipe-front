import { Routes as ReactRoutes , Route, BrowserRouter, Outlet, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import CadastroCliente from './pages/CadastroCliente'
import CadastroParceiro from './pages/CadastroParceiro'
import ClienteHome from './pages/ClienteHome';
import CadastroVeiculo from './pages/CadastroVeiculo'
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




export default function Routes() {
  const { loading, authenticated } = useContext(Context);
  return (
    <HistoryRouter>
      <ReactRoutes>
      <Route path="/" element={
          authenticated ? (
          <Navigate to={'/guichos'}/>
            ): <Navigate to={'/login'}/>
        }/>
        <Route path="" element={
          authenticated ? (
            <>
            <Navbar />
            <Outlet />
          </>
          ) : ''
        }>
          <Route path="/login" element={!authenticated ? <Login/> : <Navigate to={'/guinchos'}/>}/>
          <Route path="/cadastro-cliente" element={!authenticated ? <CadastroCliente/> : <Navigate to={'/guinchos'}/>}/>
          <Route path="/cadastro-parceiro" element={!authenticated ? <CadastroParceiro/> : <Navigate to={'/guinchos'}/>}/>

          <Route path="/guinchos" element={authenticated ? <ClienteHome/> : <Navigate to={'/login'}/>}/>          
          <Route path="/veiculos" element={authenticated ? <ClienteVeiculo/> : <Navigate to={'/login'}/>}/>          
          <Route path="/perfil" element={authenticated ? <ClientePerfil/> : <Navigate to={'/login'}/>}/> 
        </Route>
        
             
                 
       
      
        
        
        <Route path="*" element={
        <>
          <NavbarP/>
          <Outlet/>
        </>
        }>
        <Route path="solicitacoes" element={<ParceiroHome/>}/>   
        <Route path="andamento" element={<ParceiroAndamento/>}/> 
        <Route path="finalizada" element={<ParceiroFinalizada/>}/>         
        <Route path="parceiro-perfil" element={<ParceiroPerfil/>}/>     
                 
        </Route>
        
        
      </ReactRoutes>
    </HistoryRouter>
  );
}