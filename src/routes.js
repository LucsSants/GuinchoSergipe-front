import { Routes as ReactRoutes , Route, BrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import CadastroCliente from './pages/CadastroCliente'
import CadastroParceiro from './pages/CadastroParceiro'
import ClienteHome from './pages/ClienteHome';


export default function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cadastro-cliente" element={<CadastroCliente/>}/>
        <Route path="/cadastro-parceiro" element={<CadastroParceiro/>}/>        
        <Route path="/home" element={<ClienteHome/>}/>        
      </ReactRoutes>
    </BrowserRouter>
  );
}