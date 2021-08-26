import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
import SearchPage from './components/Client/searchPage';
import SingleProduct from './components/Client/singleProduct';
import { projectReducer } from './components/reducers/projectReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Checkout from './components/Client/checkout';
import UserPanel from './components/Client/userPanel';
import UserDesigns from './components/Client/userDesigns';

let myStore = createStore(projectReducer, composeWithDevTools());

function App() {
  return (
    <div className="App">
      <Provider store={myStore}>
        <Router>
          <Switch>
            <Route exact path={`/`} component={HomePage} />
            <Route exact path={`/home`} component={HomePage} />
            <Route exact path={`/login`} component={LoginForm} />
            <Route path={`/admin`} component={HomeAdmin} />
            <Route path="/users/confirm/:confirmationCode" component={UserConfirm} />
            <Route exact path={"/categories"} component={Categories} />
            <Route path="/categories/single/:s_id" component={SingleCategory} />
            <Route exact path={`/product/clean/:s_id`} component={SingleProductDesign} />
            <Route exact path={`/product/:s_id`} component={SingleProduct} />
            <Route exact path={`/search/`} component={SearchPage} />
            <Route exact path={`/checkout`} component={Checkout} />
            <Route exact path={`/user/:id`} component={UserPanel} />
            <Route exact path={`/selfdesigns/:id`} component={UserDesigns} />
          </Switch>
          <ToastContainer
            position="bottom-right"
          />
          <ReactTooltip />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
