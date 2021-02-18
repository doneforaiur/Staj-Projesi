import React, { Component } from "react";
import axios from "axios";
import "../bootstrap/css/bootstrap.min.css";
import { Link } from "react-router-dom";

var bahisiSil = (bahis) => {
  var kupon = JSON.parse(localStorage.getItem("kupon"));
  kupon = kupon.map((local_bahis) => {
    if (local_bahis.bahis_id != bahis) return local_bahis;
  });
  if (kupon.length) localStorage.removeItem("kupon");
  else localStorage.setItem("kupon", JSON.stringify(kupon));

};

const Bahis = (props) => {
  return (
    <div class="card mb-1" style={{ alignSelf: "center", width: "600px" }}>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{props.bahis.baslik}</h5>
          <p class="card-text">{props.bahis.tahmin}</p>
          <button
            style={{ position: "absolute", right: -100, top: 10 }}
            className="btn btn-danger"
            onClick={() => bahisiSil(props.bahis.bahis_id)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default class Kuponum extends Component {
  constructor(props) {
    super(props);
    this.kuponuOyna = this.kuponuOyna.bind(this);

    this.state = {
      bahisler: [
        {
          bahis_id: "",
          tahmin: "",
          gorsel_url: "",
          baslik: "",
        },
      ],
      tutar: 50,
    };
  }
  kuponuOyna(e) {
    e.preventDefault();
    var jwtToken = localStorage.getItem("Authorization");
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwtToken;
    var bahisler = this.state.bahisler.map((bahis) => {
      return { id: bahis.bahis_id, tahmin: bahis.tahmin };
    });

    var kupon = { kupon: bahisler, tutar: this.state.tutar };
    console.log(kupon);
    axios
      .post("http://94.54.82.97:5000/kuponlar/add", kupon)
      .then((res) => {
        if (res.status == 200) {
          localStorage.removeItem("kupon");
          window.location = "/";
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    var kupon = JSON.parse(localStorage.getItem("kupon"));
    if (kupon != null) var len = kupon.length;
    else var len = 0;
    console.log(kupon);
    this.setState({ bahisler: kupon });
  }

  kuponBahisList() {
    if (this.state.bahisler == null) {
      return (
        <div>
          <h1 style={{ align: "center" }}> Kuponunuz boş. </h1>
        </div>
      );
    } else {
      return this.state.bahisler.map((bahis) => {
        return <Bahis bahis={bahis} key={bahis.bahis_id} />;
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="d-flex flex-column">{this.kuponBahisList()}</div>
      </div>
    );
  }
}
