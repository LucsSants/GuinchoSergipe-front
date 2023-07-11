import Routes from './routes';
import { AuthProvider } from './context/AuthContext';
import { HistoryRouter } from './HistoryRouter';

function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}

export default App;
