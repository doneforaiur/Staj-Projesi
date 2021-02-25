import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Kullanici = (props) => {
  return (
    <div style={{ margin: "10 10 20 20" }} >
      <div className="row">
        <div className=" col-2">
        <a href="/" className="btn btn-secondary" >
          {props.kullanici.kullanici_adi}
        </a>
        </div>
        <div className="col-2">
          <button style={{ minWidth: "100%" }} className={"btn btn-success"}>
            {props.kullanici.bakiye}
          </button>
        </div>
        <div className="col-2">
          <button style={{ minWidth: "100%" }} className={"btn btn-warning"}>
            {props.kullanici.createdAt}
          </button>
        </div>
      </div>
    </div>
  );
};

const Kuponlarım = () => {
  const [kullanicilar, setKullanicilar] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("Authorization");

    if (localStorage.getItem("Authorization") == null) return;
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
    <div style={{ width: "600px", margin: "10px auto" }}>
            <div className="row">
            <div className="col-2"> Kullanıcı adı </div>
            <div className="col-2"> Bakiye </div>
            <div className="col-2"> Üyelik tarihi </div>

</div>
      {kullanicilar.map((kullanici) => {
        return <Kullanici kullanici={kullanici} key={kullanici.kullanici_adi} />;
      })}
    </div>
  );
};

export default Kuponlarım;
