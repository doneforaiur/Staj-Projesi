import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import "./bootstrap/css/bootstrap.min.css";

import CheeseburgerMenu from "cheeseburger-menu";

import Navbar from "./components/Navbar.component";
import BahisList from "./components/BahisList.component.js";
import KullanicilarList from "./components/KullanicilarList.component";
import Profil from "./components/Profil.component";
import SignUp from "./components/Signup.component";
import Login from "./components/Login.component";
import Bahis from "./components/Bahis.component";
import Kuponum from "./components/Kuponum.component";
import Kuponlarım from "./components/Kuponlarım.component";
import PrivateRoute from "./components/PrivateRoute.component";

import { KuponProvider, KuponContext } from "./context/KullaniciContext";

function App() {
  const [
    kupon,
    setKupon,
    kullanici_adi,
    setKullaniciAdi,
    openPanel,
    setOpenPanel,
    kullaniciAyar,
    setKullaniciAyar,
  ] = useContext(KuponContext);

  var loggedIn = localStorage.getItem("Authorization") ? "inherit" : "none";

  document.body.style = "background: whitesmoke";
  return (
    <>
     
      <Router>
        <Navbar loggedIn={loggedIn} />
        <br />
        <PrivateRoute path="/" exact component={BahisList} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/bahisler/:id" exact component={Bahis} />
        <PrivateRoute path="/kuponum" exact component={Kuponum} />
        <PrivateRoute path="/kuponlarım" exact component={Kuponlarım} />
      </Router>
    </>
  );
}

export default function AppWrapper() {
  return (
    <KuponProvider>
      <App />
    </KuponProvider>
  );
}
