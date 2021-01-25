import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import env from 'react-dotenv';

import './App.scss';
import Firebase, { checkAuth } from './app/firebase';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import Login from './features/auth/login/Login';
import Signup from './features/auth/signup/Signup';
import Dashboard from './features/dash/Dashboard';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const user = checkAuth();
    if(user) {
      loginUser(user);
    }
  });

  const loginUser = (user) => {
    console.log(user);
    let userObj = {
      name: user.displayName,
      email: user.email,

    }
    dispatch(login({authStatus: 1, user: userObj}));
  }

  const noAuth = () => {
    dispatch(logout());
  }


  Firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      loginUser(user);
    } else {
      noAuth();
    }
    // alert(JSON.stringify(user))
  })

  return (
    <BrowserRouter>

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact={true} path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;