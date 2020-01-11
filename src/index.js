import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Mypage from './Mypage';

ReactDOM.render(
<Router>
    <Route path='/' exact component={App} />
    <Route path='/mypage' exact component={Mypage} />
</Router>, document.getElementById('root'));