import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { KuponContext } from "../context/KullaniciContext";
import { Link, Redirect } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString('tr-TR', options)
}



const KupondakiBahis = (props) => {
  let tahmin = props.bahis.tahmin;
  if (tahmin == "tutar") tahmin = "btn-success";
  else tahmin = "btn-danger";

  return (
    <div style={{margin: '0 10 0 0'}} className="container">
      <div  className="row">
    <Link to={"/bahisler/" + props.bahis.id } className="btn btn-secondary col-8" >
        {props.bahis.baslik}
    </Link>
    <div className="col-2" >
    
        <button style={{ minWidth: "100%" }} className={"btn " + tahmin}>
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
  var kupon_durumu = "#fffc90"; // sarı
  if (props.bahisler.durum == "ödendi" || props.bahisler.durum == "tuttu" ) kupon_durumu = "#afecaf"; // yeşil
  else if( props.bahisler.durum == "tutmadı" ) kupon_durumu = "#ecafaf"; // kırmızı

  return (
    <div className="card" style={{margin: '10px auto', backgroundColor: kupon_durumu}}>
        <div className="card-body">
          <p stylr={{textAlign: 'left'}} > Oynanma; {formatDate(props.bahisler.createdAt)} 
          
          <span style={{ float: 'right' }}>
          Bitiş; {formatDate(props.bahisler.bitis_tarihi)}
          </span>
  
          </p>
          {props.bahisler.bahisler.map((bahis) => (
            <KupondakiBahis bahis={bahis} key={bahis._id} />
          ))}

<div className="row">
<div className="col-9"></div>

<div className="col-2">
           Toplam oran; { props.bahisler.bahisler.reduce((x, y) => x * y.oran, 1).toFixed(2) }
            
            </div>
            </div>
        </div>
    </div>
  );
};

const Kuponlarim = () => {
  const [kupon, setKupon, kullanici_adi, setKullaniciAdi] = useContext(
    KuponContext
  );

  const [kuponlar, setKuponlar] = useState([]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("Authorization");

    if (localStorage.getItem("Authorization") == null) return;
    axios
      .get("/api/kuponlar/kullanici_kupon/" + kullanici_adi)
      .then((res) => {
        if (res.status == 200) {
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

export default Kuponlarim;
