import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { KuponContext } from "../context/KullaniciContext";
import { Link, Redirect } from "react-router-dom";


const KupondakiBahis = (props) => {
  let tahmin = props.bahis.tahmin;
  if (tahmin == "tutar") tahmin = "btn-outline-success";
  else tahmin = "btn-outline-danger";

  return (
    <div style={{margin: '0 10 0 0'}} className="container">
      <div  className="row">
    <Link to={"/bahisler/" + props.bahis.id } className="btn btn-secondary col-8" >
        {props.bahis.baslik}
    </Link>
    <div className="col-2" >
    
        <button style={{ minWidth: "100%"}} className={"btn " + tahmin}>
          {props.bahis.tahmin.toUpperCase()}
        </button>
        </div>
        <div className="col-1" >
        <button style={{minWidth: "100%"}}className={"btn btn-warning"}>
        
          {props.bahis.oran.toFixed(2)}
        </button>
    </div>
    </div>
    </div>
  );
};

const KuponBahis = (props) => {
  console.log(props.bahisler);
  return (
    <div class="card" style={{margin: '10px auto'}}>
        <div class="card-body">
          Oynanma tarihi; {props.bahisler.createdAt}
          <br />
          <br />
          {props.bahisler.bahisler.map((bahis) => (
            <KupondakiBahis bahis={bahis} key={bahis._id} />
          ))}
        </div>
    </div>
  );
};

const Kuponlarım = () => {
  const [kupon, setKupon, kullanici_adi, setKullaniciAdi] = useContext(
    KuponContext
  );

  const [kuponlar, setKuponlar] = useState([]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("Authorization");

    if (localStorage.getItem("Authorization") == null) return;
    axios
      .get("http://94.54.82.97:5000/kuponlar/kullanici_kupon/" + kullanici_adi)
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          setKuponlar(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [kullanici_adi]);

  return (
    <div style={{ width: '600px', margin: '10px auto' }}>
      {kuponlar.map((bahis) => {
        return <KuponBahis bahisler={bahis} key={bahis._id} />;
      })}
    </div>
  );
};

export default Kuponlarım;
