import React, { Component, useContext } from "react";
import axios from "axios";
import "../bootstrap/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import {KuponContext} from '../context/KullaniciContext.js'


const BahisiSil = (bahis) => {
  //const [kupon, setKupon,kullanici_adi, setKullaniciAdi] = useContext(KuponContext);

  console.log(bahis);
  //var yeni_kupon = kupon.map((_bahis) => {
  //  if(_bahis._id != bahis._id) return _bahis
  //})
  //setKupon(yeni_kupon);
};


const Bahis = (props) => {
  
  return (
    <div class="card mb-1" style={{ alignSelf: "center", width: "600px" }}>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{props.bahis.baslik}  </h5>
          <p class="card-text">{props.bahis.tahmin}</p>
          <button
            style={{ position: "absolute", right: -100, top: 10 }}
            className="btn btn-danger"
            onClick={() => BahisiSil(props.bahis)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

const Kuponum = ()  =>{ 
  const [kupon, setKupon,kullanici_adi, setKullaniciAdi] = useContext(KuponContext);
  console.log(kupon);


  const kuponuOyna = (e,kupon) => {
    e.preventDefault();
    var jwtToken = localStorage.getItem("Authorization");
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwtToken;
    var bahisler = kupon.map((bahis) => {
      return { id: bahis._id, tahmin: bahis.tahmin };
    });

    var kupon = { kupon: bahisler, tutar: 50 };
    console.log(kupon);
    axios
      .post("http://94.54.82.97:5000/kuponlar/add", kupon)
      .then((res) => {
        if (res.status == 200) {
          setKupon([]);
          window.location = "/";
        }
      })
      .catch((err) => console.log(err));
  }

  const kuponBahisList = () => {
    if (kupon.length == 0) {
      return (
        <div>
          <h1 style={{ align: "center" }}> Kuponunuz boş. </h1>
        </div>
      );
    } else {
      return [kupon.map((bahis) => {
        return <Bahis bahis={bahis} key={bahis._id} />;
      }),<div style={{width: 300, alignSelf: 'center'}}> <button className="btn btn-success" onClick={(e) => kuponuOyna(e, kupon)}> Kuponu onayla </button> </div> ]  ;
    }
  }
    
    return (
      <div className="container">

        <div className="d-flex flex-column">{kuponBahisList()}</div>
      </div>
    );
  }

export default Kuponum;