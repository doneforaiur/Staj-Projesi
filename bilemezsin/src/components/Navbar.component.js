import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";
import { KuponContext } from "../context/KullaniciContext.js";

const kuponKontrol = () => {
  var kupon = JSON.parse(localStorage.getItem("kupon"));
  var kullanici_adi = localStorage.getItem("kullanici_adi");
  if (kupon != null) var len = kupon.length;
  else var len = 0;
  console.log(kupon);
  return { kupon: kupon, len: len, kullanici_adi: kullanici_adi };
};

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
          <li class="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <b>{kullanici_adi}</b>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#">
                Action
              </a>
              <a class="dropdown-item" href="#">
                Another action
              </a>
              <a class="dropdown-item" href="#">
                Something else here
              </a>

              <Link class="nav-link" to="/logout">
                Çıkış
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
