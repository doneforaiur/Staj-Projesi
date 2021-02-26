import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString('tr-TR', options)
}

const Kullanici = (props) => {
  return (
    <div style={{ display: "flex", flex: "column", margin: "10 10 10 10"}}>
      <div style={{display: "flex", flex: 1}} >
        <button href="/" style={{ width: '100%' }}  className="btn btn-secondary">
          {props.kullanici.kullanici_adi}
        </button>
      </div>
      <div style={{display: "flex", flex: 1}} >
        <button style={{ width: '100%' }} className={"btn btn-success"}>{props.kullanici.bakiye}</button>
      </div>
      <div style={{display: "flex", flex: 1}} >
        <button  style={{ width: '100%' }} className={"btn btn-warning"}>
          { formatDate(props.kullanici.createdAt)}
        </button>
      </div>
    </div>
  );
};

const Kuponlarim = () => {
  const [kullanicilar, setKullanicilar] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("Authorization");

    axios
      .get("/api/kullanicilar")
      .then((res) => {
        if (res.status == 200) {
          setKullanicilar(res.data);
          console.log(kullanicilar);
          setLoaded(false);
        }
      })
      .catch((err) => console.log(err));
  }, [loaded]);

  return kullanicilar.length < 1 ? (
    <div></div>
  ) : (
    <div className="card" style={{ width: 500, margin: 'auto'}}>
      <div className="row">
        <h4 style={{display: "flex", flex: 1}} > Kullanıcı adı </h4>
        <h4 style={{display: "flex", flex: 1}} > Bakiye </h4>
        <h4 style={{display: "flex", flex: 1}} > Üyelik tarihi </h4>
      </div>
      <div>
        {kullanicilar.map((kullanici) => {
          return (
            <Kullanici kullanici={kullanici} key={kullanici.kullanici_adi} />
          );
        })}
      </div>
    </div>
  );
};

export default Kuponlarim;
