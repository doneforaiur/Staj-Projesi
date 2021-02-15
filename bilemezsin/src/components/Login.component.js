import React, { Component } from 'react';
import axios from 'axios';


export default class Login extends Component {

  constructor(props){
    super(props);
    this.onChangeKullaniciAdi = this.onChangeKullaniciAdi.bind(this);
    this.onChangeSifre = this.onChangeSifre.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      kullanici_adi: "",
      sifre: "",
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

  onSubmit(e) {
    e.preventDefault();
    const kullanici ={
      kullanici_adi: this.state.kullanici_adi,
      sifre: this.state.sifre
    };
 
    console.log(kullanici);

    axios.post('http://localhost:5000/login', kullanici)
      .then(res => {
        if(res.status == 200){
          
          localStorage.setItem('Authorization', res.data.accesToken);
          console.log(localStorage.getItem('Authorization'));
        }


      });

    //window.location = "/";

  }


  render() {
    return (
      <div>
        <h3> Oturum Aç </h3>
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
          </div>
          <div className="form-group">
            <input type="submit" value="Oturum Aç" 
                className="btn btn-primary" />
          </div>
        </form>
      </div>

    );
  }
}