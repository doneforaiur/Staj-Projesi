import React, { Component, useState, useContext } from 'react';
import axios from 'axios';
import {KuponContext} from '../context/KullaniciContext';


const Login = () => {
  
  const [kupon, setKupon, kullanici_adi, setKullaniciAdi] = useContext(KuponContext);
    const [sifre, setSifre] = useState("");
    const [temp_name, setTempName] = useState("");

  const onChangeKullaniciAdi = (e) => {
      setTempName(e.target.value)
  };
  const onChangeSifre = (e) => {
    setSifre(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const kullanici ={
      kullanici_adi: temp_name,
      sifre: sifre
    };
    
      axios.post('http://94.54.82.97:5000/login', kullanici)
      .then(res => {
        console.log(res.data.accessToken);
        localStorage.setItem('Authorization', res.data.accessToken);
        localStorage.setItem('kullanici_adi', temp_name);
        setKullaniciAdi(temp_name);
        //window.location = "/";
      })
      .catch(err => console.log(err));

  }


    return (
      <div>
        <h3> Oturum Aç </h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Kullanıcı adı:</label>
            <input type="text"
              required
              className="form-control"
              value={kullanici_adi}
              onChange={onChangeKullaniciAdi} 
              />
              <label>Şifre:</label>
              <input type="text"
              required
              className="form-control"
              value={sifre}
              onChange={onChangeSifre} 
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

export default Login;


