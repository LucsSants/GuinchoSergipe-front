import { Routes as ReactRoutes , Route, BrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import CadastroCliente from './pages/CadastroCliente'


export default function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cadastro-cliente" element={<CadastroCliente/>}/>
      </ReactRoutes>
    </BrowserRouter>
  );
}