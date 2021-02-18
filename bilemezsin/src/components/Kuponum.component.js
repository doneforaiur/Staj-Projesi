import React, { Component } from "react";
import axios from "axios";
import "../bootstrap/css/bootstrap.min.css";
import { Link } from "react-router-dom";

var bahisiSil = (bahis) => {
  console.log(bahis);
};

const Bahis = (props) => {
  return (
    <div class="card mb-1" style={{alignSelf: 'center', width: '600px'}}>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{props.bahis.baslik}</h5>
          <p class="card-text">{props.bahis.tahmin}</p>
          <button
            style={{ position: 'absolute', right: -100, top: 10 }}
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
  kuponuOyna() {
    var jwtToken = localStorage.getItem("Authorization");
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwtToken;
    axios
      .get("http://94.54.82.97:5000/bahisler")
      .then((res) => {
        console.log(res);
        this.setState({ bahisler: res.data });
        console.log(this.state);
      })
      .catch((err) => console.log(err));
  }

  constructor(props) {
    super(props);
    this.state = {
      bahisler: [
        {
          bahis_id: "",
          tahmin: "",
        },
      ],
    };
  }

  componentDidMount() {
    var kupon = JSON.parse(localStorage.getItem("kupon"));
    if (kupon != null) var len = kupon.length;
    else var len = 0;
    console.log(kupon);
    this.setState({ bahisler: kupon });
  }

  bahisList() {
    if (this.state.bahisler == null) {
      return (
        <div>
          {" "}
          <h1 style={{ align: "center" }}> Kuponunuz boş. </h1>{" "}
        </div>
      );
    }
    return this.state.bahisler.map((bahis) => {
      return <Bahis bahis={bahis} key={bahis.bahis_id} />;
    });
  }

  render() {
    return (
      <div className="container">
        <div className="d-flex flex-column">{this.bahisList()}</div>
      </div>
    );
  }
}
