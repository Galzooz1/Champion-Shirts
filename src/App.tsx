import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import LoginForm from './components/Client/loginForm';
import ReactTooltip from 'react-tooltip';
import HomeAdmin from './components/Admin/homeAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Client/login';
import UserConfirm from './components/Client/userConfirm';
import HomePage from './components/Client/homePage';
import SingleCategory from './components/Client/singleCategory';
import Categories from './components/Client/categories';
import SingleProductDesign from './components/Client/singleProductDesign';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={`/`} component={HomePage} />
          <Route exact path={`/home`} component={HomePage} />
          <Route exact path={`/login`} component={LoginForm} />
          <Route path={`/admin`} component={HomeAdmin} />
          <Route path="/users/confirm/:confirmationCode" component={UserConfirm}/>
          <Route exact path={"/categories"} component={Categories} />
          <Route path="/categories/single/:s_id" component={SingleCategory} />
          <Route exact path={`/product/:s_id`} component={SingleProductDesign} />
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
