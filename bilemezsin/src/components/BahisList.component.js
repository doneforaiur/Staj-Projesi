import React, {  Component } from 'react';
import axios from 'axios';
import "../bootstrap/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

const Bahis = (props) => {

  var tempProps = {};
  const date1 = new Date();
  const date2 = new Date(props.bahis.baslangic);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  if(diffDays < 2){
    tempProps.display = "block";
  }
  else{
    tempProps.display = "none";
  }
  
return (
<div className="card" style={{ width: 300, height: 350, margin:10 }}>
 
 <div style={{display: tempProps.display, position: 'absolute', right: 5, top:5, margin: '0 auto'}}> 
 <div className="card text-white bg-danger">
  <div className="card-body" style={{  padding: 2}}>
  <i className="glyphicon glyphicon-cloud"></i>

    <p className="card-title" style={{ marginBottom: 0 }}>YENİ</p>
  </div>
</div>
  </div>

  <img className="card-img-top" style={{ height:150, crop:'fill' }}src={ props.bahis.gorsel_url } alt="Görsel" />
  <div className="card-body">
    <h5 className="card-title">{ props.bahis.baslik } </h5>
    <p className="card-text">   { props.bahis.icerik.length > 60 ?
     props.bahis.icerik.substring(0, 60) +"..." : props.bahis.icerik } </p>
    <Link to={"/bahisler/" + props.bahis._id } className="btn btn-danger" style={{ width: '90%', position: 'absolute', bottom: 15}}>Devamını oku</Link>
  </div>
</div>
)
}


export default class BahisList extends Component {
    
  componentDidMount(){
    var jwtToken = localStorage.getItem('Authorization');
    axios.defaults.headers.common['Authorization'] = "Bearer " + jwtToken;
    axios.get('http://94.54.82.97:5000/bahisler')
    .then(res => {
      this.setState({bahisler: res.data});
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