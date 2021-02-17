import React from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import "./bootstrap/css/bootstrap.min.css";


import Navbar from "./components/Navbar.component";
import BahisList from "./components/BahisList.component.js";
import KullanicilarList from "./components/KullanicilarList.component";
import Profil from "./components/Profil.component";
import SignUp from "./components/Signup.component";
import Login from "./components/Login.component";
import Bahis from "./components/Bahis.component";


function App() {
  
  return (
    <Router>
        <Navbar />
        <br/>
        <Route path="/" exact  component={BahisList} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/bahisler/:id" exact component={Bahis} />
    </Router>
    
  );
}

export default App;
