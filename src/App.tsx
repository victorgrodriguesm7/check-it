import React from 'react';
import AuthProvider from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" children={Dashboard}/>
          <Route path="/login" children={LoginPage}/>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
