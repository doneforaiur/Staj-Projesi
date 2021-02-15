import React, { Component } from 'react';
import axios from 'axios';


export default class SignUp extends Component {

  constructor(props){
    super(props);

    this.onChangeKullaniciAdi = this.onChangeKullaniciAdi.bind(this);
    this.onChangeSifre = this.onChangeSifre.bind(this);
    this.onChangeEMail = this.onChangeEMail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      kullanici_adi: "",
      sifre: "",
      email: ""
    }
  };

  onChangeKullaniciAdi(e) {
      this.setState({
        kullanici_adi: e.target.value
      })
  };
  onChangeSifre(e) {
    this.setState({
      sifre: e.target.value
    })
  };
  onChangeEMail(e) {
    this.setState({
      email: e.target.value
    })
  };

  onSubmit(e) {
    e.preventDefault();
    const kullanici ={
      kullanici_adi: this.state.kullanici_adi,
      sifre: this.state.sifre,
      email: this.state.email
    };
 
    console.log(kullanici);

    axios.post('http://localhost:5000/signup', kullanici)
      .then(res => console.log(res.data));

    window.location = "/login";

  }


  render() {
    return (
      <div>
        <h3> Kayıt Ol </h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Kullanıcı adı:</label>
            <input type="text"
              required
              className="form-control"
              value={this.state.kullanici_adi}
              onChange={this.onChangeKullaniciAdi} 
              />
              <label>Şifre:</label>
              <input type="text"
              required
              className="form-control"
              value={this.state.sifre}
              onChange={this.onChangeSifre} 
              /> 
              <label>E-mail:</label>
              <input type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEMail} 
              />
          </div>
          <div className="form-group">
            <input type="submit" value="Kayıt Ol" 
                className="btn btn-primary" />
          </div>
        </form>
      </div>

    );
  }
}