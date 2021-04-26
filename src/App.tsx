import React from 'react';
import AuthProvider from './contexts/AuthContext';
import TaskProvider from './contexts/TaskContext';
import FilterProvider from './contexts/FilterContext';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FilterPage from './pages/FilterPage';

function DashWithProvider(){
  return <TaskProvider> 
    <Dashboard/> 
  </TaskProvider>
}

function FilterWithProvider(){
  return (
    <TaskProvider> 
      <FilterProvider>
        <FilterPage/>
      </FilterProvider>
    </TaskProvider>
  );
}
function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={DashWithProvider}/>
          <PrivateRoute path="/filter" component={FilterWithProvider}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={SignupPage}/>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
