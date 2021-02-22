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
    setKullaniciAyar
  ] = useContext(KuponContext);

  console.log(kullanici_adi);



  console.log(openPanel);
  document.body.style = "background: whitesmoke";
  return (
    <>
      <CheeseburgerMenu
        isOpen={openPanel}
        width={450}
        right={true}
        closeCallback={() => setOpenPanel(false)}
      >
        <div className="my-menu-content">
          <Kuponum />
          {/* <button onClick={() => setOpenPanel(false)}>close</button> */}
        </div>
      </CheeseburgerMenu>

      <CheeseburgerMenu
        isOpen={kullaniciAyar}
        width={200}
        right={true}
        closeCallback={() => setKullaniciAyar(false)}
      >
        <div className="my-menu-content">
          <li>Profil ayarları</li>
          <li>Çıkış Yap</li>
          {/* <button onClick={() => setKullaniciAyar(false)}>close</button> */}
        </div>
      </CheeseburgerMenu>

      <Router>
        <Navbar />
        <br />
        <Route path="/" exact component={BahisList} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/bahisler/:id" exact component={Bahis} />
        {/* <Route path="/kuponum" exact component={Kuponum} /> */}
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
