import Routes from './routes';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>

    <AuthProvider>
      <Routes/>
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
