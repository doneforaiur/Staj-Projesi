import React, { Component, useState, useContext } from "react";
import axios from "axios";
import "../bootstrap/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import { KuponContext } from "../context/KullaniciContext.js";

const Bahis = (props) => {
  function BahisiSil(bahis) {
    var yeni_kupon = props.kupon_func.filter(
      (_bahis) => _bahis._id != bahis._id
    );

    console.log(yeni_kupon);
    props.bahisiSil(yeni_kupon);
  }

  return (
    <div class="card mb-1" style={{ alignSelf: "center", minWidth: "100%" }}>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{props.bahis.baslik} </h5>
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

const Kuponum = () => {
  const [kupon, setKupon] = useContext(KuponContext);

  console.log(kupon);
  const kuponuOyna = (e, kupon) => {
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
  };

  const kuponBahisList = () => {
    if (kupon.length == 0) {
      return (
        <div>
          <br />
          <br />
          <h2 style={{ color: "grey", textAlign: "center" }}>Kuponunuz boş.</h2>
        </div>
      );
    } else {
      return [
        <div className="container" style={{ padding: "auto" }}>
          <h2 style={{ color: "red" }}>Kuponum</h2>{" "}
        </div>,
        kupon.map((bahis) => {
          return (
            <Bahis
              bahis={bahis}
              key={bahis._id}
              kupon_func={kupon}
              bahisiSil={(a) => setKupon(a)}
            />
          );
        }),
        <h4>
          Toplam oran;
          {kupon.reduce((x, y) => x * y.oran[y.tahmin + "_oran"], 1).toFixed(2)}
        </h4>,
        <button
          className="btn btn-success"
          onClick={(e) => kuponuOyna(e, kupon)}
        >
          Kuponu onayla
        </button>,
      ];
    }
  };

  return (
    <div className="container">
      <div className="d-flex flex-column">{kuponBahisList()} </div>
    </div>
  );
};

export default Kuponum;
