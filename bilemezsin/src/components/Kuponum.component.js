import React, { Component, useState, useContext } from "react";
import axios from "axios";
import "../bootstrap/css/bootstrap.min.css";
import { Link, Redirect } from "react-router-dom";

import { KuponContext } from "../context/KullaniciContext.js";

const Bahis = (props) => {

  function BahisiSil(bahis) {
    var yeni_kupon = props.kupon_func.filter(
      (_bahis) => _bahis._id != bahis._id
    );
    props.bahisiSil(yeni_kupon);
  }

  return (
    <div className="card mb-1" style={{ alignSelf: "center", minWidth: "100%" }}>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{props.bahis.baslik} </h5>
          <p className="card-text">{props.bahis.tahmin}</p>
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

  const kuponuOyna = (e, kupon) => {
    e.preventDefault();
    var jwtToken = localStorage.getItem("Authorization");
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwtToken;
    var bahisler = kupon.map((bahis) => {
      return { id: bahis._id, tahmin: bahis.tahmin };
    });

    axios
      .post("/api/kuponlar/add", {kupon: bahisler, tutar: 50})
      .then((res) => {
        if (res.status == 200) {
          setKupon([]);
          window.location = "/";
        }
      })
      .catch((err) => console.log(err));
  };

  const kuponBahisList = () => {
    if (kupon.length < 1) {
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
        kupon.map((_bahis) => {
          return (
            <Bahis
            key={_bahis._id+"AAAAAAAAAAAAAAA"}  
            bahis={_bahis}
              
              kupon_func={kupon}
              bahisiSil={(a) => setKupon(a)}
            />
          );
        }),
        <h4>
          Toplam oran;
          { kupon.reduce((x, y) => x * y.oran[y.tahmin + "_oran"], 1).toFixed(2) }
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
