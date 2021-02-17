import React, {  Component } from 'react';
import axios from 'axios';
import "../bootstrap/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

const Bahis = (props) => (
<div className="card" style={{ width: 300, margin:10 }}>
  <img className="card-img-top" src="..." alt="Görsel" />
  <div className="card-body">
    <h5 className="card-title">{ props.bahis.baslik } </h5>
    <p className="card-text">   { props.bahis.icerik.length > 60 ?
     props.bahis.icerik.substring(0, 60) +"..." : props.bahis.icerik } </p>
    <Link to={"/bahisler/" + props.bahis._id } className="btn btn-secondary">Devamını oku.</Link>
  </div>
</div>
  )


export default class BahisList extends Component {
    
  componentDidMount(){
    var jwtToken = localStorage.getItem('Authorization');
    axios.defaults.headers.common['Authorization'] = "Bearer " + jwtToken;
    axios.get('http://localhost:5000/bahisler')
    .then(res => {
      console.log(res);
      this.setState({bahisler: res.data});
      console.log(this.state);
    })
    .catch(err => console.log(err));
  }

  constructor(props){
    super(props);
    this.state = {
      bahisler: []
    }
    
  }

  bahisList() {
    return this.state.bahisler.map(bahis => {
      return <Bahis bahis={bahis} key={bahis._id} />;
    })
  }

  render() {
    return (
      <div className="container">
        <div className="d-flex flex-row"> 
          { this.bahisList() }
        </div>
      </div>
    );
  }
}