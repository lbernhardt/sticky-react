import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Example from './pages/Example'
import Login from './pages/Login'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {PrivateRoute} from './components/PrivateRoute'



ReactDOM.render(
  <Router>
    <PrivateRoute exact path="/app" component={App}/>
    <Route exact path="/example" component={Example} ca />
    <Route exact path="/" component={Login} />
    <Route exact path="/login" component={Login} />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
