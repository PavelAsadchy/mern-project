import 'materialize-css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';

function App() {
  const { login, logout, token, userId } = useAuth();
  const routes = useRoutes(false);
  return (
    <Router>
      <div className="container">
        { routes }
      </div>
    </Router>
  );
}

export default App;
