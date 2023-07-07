import { Routes as ReactRoutes , Route, BrowserRouter, Outlet} from 'react-router-dom';
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


export default function Routes() {
  return (
    <BrowserRouter >
      <ReactRoutes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cadastro-cliente" element={<CadastroCliente/>}/>
        <Route path="/cadastro-parceiro" element={<CadastroParceiro/>}/>
        <Route path="/cadastro-veiculo" element={<CadastroVeiculo/>}/>  

        <Route path="/" element={
        <>
          <Navbar/>
          <Outlet/>
        </>
        }>
        <Route path="guinchos" element={<ClienteHome/>}/>          
        <Route path="veiculos" element={<ClienteVeiculo/>}/>          
        <Route path="perfil" element={<ClientePerfil/>}/>      
                 
        </Route>

        <Route path="/" element={
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
    </BrowserRouter>
  );
}