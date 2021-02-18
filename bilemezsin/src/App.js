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
import Kuponum from "./components/Kuponum.component";

function App() {
  document.body.style = 'background: whitesmoke';
  var kupon = JSON.parse(localStorage.getItem("kupon"));

  return (
    <Router>
        <Navbar />
        <br/>
        <Route path="/" exact  component={BahisList} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/bahisler/:id" exact component={Bahis} />
        <Route path="/kuponum" exact component={Kuponum} kupon={kupon} />
    </Router>
    
  );
}

export default App;
