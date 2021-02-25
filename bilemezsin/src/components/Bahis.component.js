import React, { useState, useContext, useEffect } from "react";
import { KuponContext } from "../context/KullaniciContext";
import axios from "axios";

const YorumlarView = (props) => {
  return (
    <div
      style={{ margin: 3, padding: 10, background: "white" }}
      className="card"
    >
      <div style={{ padding: 10 }} className="card-body">
        <b> {props.yorum.kullanici_adi} </b> yazmış;
        <br />
        {props.yorum.icerik}
      </div>
    </div>
  );
};

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
      _id: ""
    },
  ]);

  const kuponaEkle = (tahmin, bahis) => {
    bahis["tahmin"] = tahmin;
    var index = kupon.findIndex(function (item, i) {
      return item._id === bahis._id;
    });
    if (index > -1) {
      alert("Bir bahise sadece bir tahmin yapabilirsiniz.");
      return;
    }

    setKupon([...kupon, bahis]);
  };

  const [yorumum, setYorumum] = useState("");

  const onSubmit = (e, props) => {
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("Authorization");

    var _yorum = {
      icerik: yorumum,
      bahis_id: props.match.params.id,
    };
    axios
      .post("http://94.54.82.97:5000/yorumlar/add", _yorum)
      .then((res) => {
        window.location = "/bahisler/" + props.match.params.id;
      })
      .catch((err) => console.log(err));
  };

  const onYorumChange = (e) => {
    setYorumum(e.target.value);
  };

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("Authorization");

    axios
      .get("/bahisler/" + props.match.params.id)
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

  const [kupon, setKupon] = useContext(
    KuponContext
  );

  return bahis.baslik.length <= 0 ? (
    <></>
  ) : (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div className="card bg-dark text-white" style={{ margin: 0 }}>
        <div style={{ height: 200, overflow: "hidden" }}>
          <img
            className="card-img"
            src={bahis.gorsel_url}
            style={{ marginTop: -50 }}
            alt="Görsel"
          />
        </div>

        <div className="card-img-overlay">
          <h5 className="card-title"> {bahis.baslik} </h5>
          <br />
          <p className="card-text"> Başlama tarihi; {bahis.baslangic} </p>
          <p className="card-text"> Bitiş tarihi; {bahis.bitis} </p>
        </div>
      </div>

      <div className="card" style={{ margin: 0 }}>
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

          <div>
            <button
              onClick={() => kuponaEkle("tutar", bahis)}
              className="btn btn-success btn-md"
            >
              EVET ({bahis.oran.tutar_oran.toFixed(2)})
            </button>

            <button
              onClick={() => kuponaEkle("tutmaz", bahis)}
              className="btn btn-danger btn-md"
            >
              HAYIR ({bahis.oran.tutmaz_oran.toFixed(2)})
            </button>
          </div>
        </div>
      </div>

      {yorumlar.icerik}

      {yorumlar.length > 0 ? (
        yorumlar.map((_yorum) => {
          return <YorumlarView  yorum={_yorum} key={_yorum._id} />;
        })
      ) : (
        <div></div>
      )}

      <div className="card">
        <div className="card-body">
          <form onSubmit={(e) => onSubmit(e, props)}>
            <div className="form-group">
              <label>Yorumunuz; </label>
              <input
                type="text"
                required
                className="form-control"
                value={yorumum}
                onChange={onYorumChange}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Yorumu yap"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Bahis;
