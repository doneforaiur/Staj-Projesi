import React, { Component, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { KuponContext } from "../context/KullaniciContext.js";
import Dropdown from "react-dropdown";
import SlidingPanel from "react-sliding-side-panel";

const Navbar = (props) => {
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

  setKullaniciAdi(localStorage.getItem("kullanici_adi"));

  return (
    <>
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
              <a
                href="#"
                onClick={() => setOpenPanel(true)}
                className="nav-link" 
              >
                Kupon ({kupon.length})
              </a>
            </li>

            <li class="nav-item active">
              <a
                href="#"
                onClick={() => setKullaniciAyar(true)}
                className="nav-link"
              >
                <b>{kullanici_adi}</b>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
