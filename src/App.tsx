import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import LoginForm from './components/Client/loginForm';
import ReactTooltip from 'react-tooltip';
import HomeAdmin from './components/Admin/homeAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Client/login';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={`/`} component={Login} />
          <Route exact path={`/login`} component={LoginForm} />
          <Route exact path={`/admin`} component={HomeAdmin} />
        </Switch>
        <ToastContainer
        position= "bottom-right"
        />
        <ReactTooltip />
      </Router>
    </div>
  );
}

export default App;