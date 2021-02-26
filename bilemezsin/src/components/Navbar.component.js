import React, {  useEffect,useState, useContext } from "react";
import { Link } from "react-router-dom";
import { KuponContext } from "../context/KullaniciContext.js";
import axios from 'axios';
import CheeseburgerMenu from 'cheeseburger-menu';
import Kuponum from './Kuponum.component';

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
    bakiye, setBakiye
  ] = useContext(KuponContext);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("Authorization");

    if ( localStorage.getItem('Authorization') == null )
      return;
    axios
      .get("/api/kullanicilar/" + kullanici_adi)
      .then((res) => {
        if (res.status == 200) {
          console.log("bakiye setlendi");
          setBakiye(res.data.bakiye); 
        }
      })
      .catch((err) => console.log(err));

  }, [setBakiye, kullanici_adi]);
  setKullaniciAdi(localStorage.getItem("kullanici_adi"));

  return (
    <>

 <CheeseburgerMenu
        isOpen={openPanel}
        width={450}
        right={true}
        noShadow={false}
        closeCallback={() => setOpenPanel(false)}
      >
        <div className="my-menu-content">
          <Kuponum />
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
        </div>
      </CheeseburgerMenu>



      <nav className="navbar navbar-expand-md navbar-dark bg-danger">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Bahisler
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/kullanicilar">
                Kullanıcılar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/kuponlarim">
                Kuponlarım
              </Link>
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
        <div   className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul style={{display: props.loggedIn}} className="navbar-nav ml-auto">
          <li className="nav-item">
              <a className="nav-link">Bakiye; <b>{bakiye}</b> BP</a>
            </li>

            <li className="nav-item">
              <a
                href="#"
                onClick={() => setOpenPanel(true)}
                className="nav-link" 
              >
                Kupon ({kupon.length})
              </a>
            </li>

            <li className="nav-item active">
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
