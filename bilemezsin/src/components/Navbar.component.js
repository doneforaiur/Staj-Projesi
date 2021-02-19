import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";
import { KuponContext } from "../context/KullaniciContext.js";
import Dropdown from 'react-dropdown';
//import 'react-dropdown/style.css';




const Navbar = (props) => {
  const [kupon, setKupon, kullanici_adi, setKullaniciAdi] = useContext(
    KuponContext
  );

  setKullaniciAdi(localStorage.getItem("kullanici_adi"));

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-danger">
      <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link class="nav-link" to="/">
              Bahisler
            </Link>
          </li>
          <li class="nav-item">
            <a className="nav-link" href="#">
              Kullanıcılar
            </a>
          </li>
          <li class="nav-item">
            <a className="nav-link" href="#">
              Kuponlarım
            </a>
          </li>
        </ul>
      </div>
      <div className="mx-auto order-0">
        <a className="navbar-brand mx-auto" href="#">
          <b> Bilemezsin </b>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target=".dual-collapse2"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/kuponum" className="nav-link">
              {" "}
              Kupon ({kupon.length}){" "}
            </Link>
          </li>
         <Dropdown options={[kullanici_adi, 'Ayarlar', 'Çıkış']} value={kullanici_adi}  />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
