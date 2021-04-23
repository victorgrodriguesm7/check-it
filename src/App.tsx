import React from 'react';
import AuthProvider from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={SignupPage}/>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
