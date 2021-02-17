import React, {  Component } from 'react';
import axios from 'axios';
import "../bootstrap/css/bootstrap.min.css";


const BahisView = (props) => (

<div>
<div className="card bg-dark text-white" style={{ margin:10 }}>
  
  <div style={{ height: 200, overflow: 'hidden'}}>
  <img className="card-img" src={props.bahis.gorsel_url}
     style={{ marginTop: -50 }}  alt="Card image" />
  </div>
  
  <div className="card-img-overlay">
    <h5 className="card-title"> { props.bahis.baslik }</h5>
    <br/>
    <p className="card-text"> Başlama tarihi; { props.bahis.baslangic }</p>
    <p className="card-text"> Bitiş tarihi; { props.bahis.bitis }</p>
  </div>
</div>



<div className="card" style={{  margin:20 }}>
  <div className="card-body">
    <p className="card-text">  { props.bahis.icerik }  { ( 100 * props.bahis.oran.tutar_oynayan / (props.bahis.oran.tutmaz_oynayan + props.bahis.oran.tutar_oynayan))  } </p>
<br/>
<div className="progress">
  <div className="progress-bar bg-success" role="progressbar" 
    style={{ width:  ( 100 * props.bahis.oran.tutar_oynayan / (props.bahis.oran.tutmaz_oynayan + props.bahis.oran.tutar_oynayan))+"%" }} 
    aria-valuenow={  100 *props.bahis.oran.tutar_oynayan / (props.bahis.oran.tutmaz_oynayan + props.bahis.oran.tutar_oynayan) } 
    aria-valuemin="0" aria-valuemax="100">
    </div>
  
  <div className="progress-bar bg-danger" role="progressbar" 
    style={{ width:  100 * props.bahis.oran.tutmaz_oynayan / (props.bahis.oran.tutmaz_oynayan + props.bahis.oran.tutar_oynayan)+"%" }} 
    aria-valuenow={ 100 *  props.bahis.oran.tutmaz_oynayan / (props.bahis.oran.tutmaz_oynayan + props.bahis.oran.tutar_oynayan) } 
    aria-valuemin="0" aria-valuemax="100">

  </div>

</div>
<br/>
    <a href="#" className="btn btn-secondary">EVET</a>
    <a href="#" className="btn btn-secondary">HAYIR</a>
  </div>
</div>


</div>

  )


export default class Bahis extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      bahis: {
        icerik: "",
        baslik: "",
        gorsel_url: "",
        oran:{
          tutar_oynayan: 1,
          tutmaz_oynayan: 1,
          tutar_oran: 1,
          tutmaz_oran: 1
        }
      }
    }
  }

  componentDidMount(){
    var jwtToken = localStorage.getItem('Authorization');
    axios.defaults.headers.common['Authorization'] = "Bearer " + jwtToken;
    var bahis_id = this.props.match.params.id;
    console.log(bahis_id);
    axios.get('http://localhost:5000/bahisler/' + bahis_id)
    .then(res => {
      console.log(res.data.oran);
      this.setState({bahis: res.data});
      console.log(this.state);
    })
    .catch(err => console.log(err));
  }

  bahisList() {
      return <BahisView bahis={this.state.bahis} />;
  }

  render() {
    return (
      <div className="container">
      <div className="d-flex flex-column">
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', }}>
         { this.bahisList() }
         </div>
      </div>
    </div>
    );
  }
}