import React, { useState, useContext, useEffect } from "react";
import { KuponContext } from "../context/KullaniciContext";
import axios from "axios";

const YorumlarView = (props) => (
  <div className="card">
    <div className="card-body">
      <b> {props.yorum.kullanici_adi} </b> yazmış;
      <br />
      {props.yorum.icerik}{" "}
    </div>
  </div>
);

const Bahis = (props) => {
  const [bahis, setBahis] = useState({
    icerik: "",
    baslik: "",
    gorsel_url: "",
    baslangic: "",
    bitis: "",
    oran: {
      tutar_oynayan: 1,
      tutmaz_oynayan: 1,
      tutar_oran: 1,
      tutmaz_oran: 1,
    },
  });

  const [yorumlar, setYorumlar] = useState([
    {
      icerik: "",
      kullanici_id: "",
      kullanici_adi: "",
      begeni_sayisi: 0,
    },
  ]);

  const kuponaEkle = (tahmin, bahis) => {
    bahis["tahmin"] = tahmin;
    setKupon([...kupon, bahis]);
    console.log(kupon);
  };

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("Authorization");

    axios
      .get("http://94.54.82.97:5000/bahisler/" + props.match.params.id)
      .then((res) => {
        setBahis(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://94.54.82.97:5000/yorumlar/" + props.match.params.id)
      .then((res) => {
        setYorumlar(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [kupon, setKupon, kullanici_adi, setKullaniciAdi] = useContext(
    KuponContext
  );

  return bahis.baslik.length <= 0 ? (
    <p>Loading</p>
  ) : (
    <div>
      <div className="card bg-dark text-white" style={{ margin: 10 }}>
        <div style={{ height: 200, overflow: "hidden" }}>
          <img
            className="card-img"
            src={bahis.gorsel_url}
            style={{ marginTop: -50 }} alt="Görsel"
          />
        </div>

        <div className="card-img-overlay">
          <h5 className="card-title"> {bahis.baslik} </h5>
          <br />
          <p className="card-text"> Başlama tarihi; {bahis.baslangic} </p>
          <p className="card-text"> Bitiş tarihi; {bahis.bitis} </p>
        </div>
      </div>

      <div className="card" style={{ margin: 20 }}>
        <div className="card-body">
          <p className="card-text"> {bahis.icerik} </p>
          <br />
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated  bg-success"
              role="progressbar"
              style={{
                transform: "rotate(180deg)",
                width:
                  (100 * bahis.oran.tutar_oynayan) /
                    (bahis.oran.tutmaz_oynayan + bahis.oran.tutar_oynayan) +
                  "%",
              }}
              aria-valuenow={
                (100 * bahis.oran.tutar_oynayan) /
                (bahis.oran.tutmaz_oynayan + bahis.oran.tutar_oynayan)
              }
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {" "}
              <div style={{ transform: "rotate(180deg)" }}>TUTAR </div>
            </div>

            <div
              className="progress-bar progress-bar-striped progress-bar-animated  bg-danger"
              role="progressbar"
              style={{
                width:
                  (100 * bahis.oran.tutmaz_oynayan) /
                    (bahis.oran.tutmaz_oynayan + bahis.oran.tutar_oynayan) +
                  "%",
              }}
              aria-valuenow={
                (100 * bahis.oran.tutmaz_oynayan) /
                (bahis.oran.tutmaz_oynayan + bahis.oran.tutar_oynayan)
              }
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {" "}
              TUTMAZ
            </div>
          </div>
          <br />
          <button
            onClick={() => kuponaEkle("tutar", bahis)}
            className="btn btn-success"
          >
            EVET ({bahis.oran.tutar_oran.toFixed(2)})
          </button>
          <button
            onClick={() => kuponaEkle("tutmaz", bahis)}
            className="btn btn-danger"
          >
            HAYIR ({bahis.oran.tutmaz_oran.toFixed(2)})
          </button>
        </div>
      </div>

      {yorumlar.icerik}

      {yorumlar.length > 0 ? (
        yorumlar.map((yorum) => {
          return <YorumlarView yorum={yorum} key={yorum._id} />;
        })
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Bahis;
