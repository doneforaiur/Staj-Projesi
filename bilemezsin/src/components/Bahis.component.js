import React, {  Component } from 'react';
import axios from 'axios';
import "../bootstrap/css/bootstrap.min.css";

var kuponaEkle = (tahmin, bahis_id, baslik, gorsel_url) => {
  console.log(tahmin, bahis_id);
  var kupon = JSON.parse(localStorage.getItem("kupon"));
  if(kupon == null) kupon = [];
  else{
    for(var i=0; i <kupon.length; i++){
      if(kupon[i].bahis_id === bahis_id){
        console.log("Bahis kupona eklenmiş.");
        return;
      } 
    }
  }

  var kupon_bahis = {
    bahis_id: bahis_id,
    tahmin: tahmin,
    baslik: baslik,
    gorsel_url: gorsel_url
  }
  kupon.push(kupon_bahis);
  localStorage.setItem("kupon", JSON.stringify(kupon));

}

const BahisView = (props) => {

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

<div>
<div className="card bg-dark text-white" style={{ margin:10 }}>
  
<div style={{display: tempProps.display, position: 'absolute', right: 5, top:5, margin: '0 auto'}}> 
 <div className="card text-white bg-danger">
  <div class="card-body" style={{  padding: 10, paddingRight: 15, paddingLeft: 15}}>
  <i class="glyphicon glyphicon-cloud"></i>

    <p class="card-title" style={{ marginBottom: 0 }}>YENİ</p>
  </div>
</div>
  </div>


  <div style={{ height: 200, overflow: 'hidden'}}>
  <img className="card-img" src={props.bahis.gorsel_url} style={{ marginTop: -50 }}/>
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
    <p className="card-text">  { props.bahis.icerik }  </p>
<br/>
<div className="progress">
  <div className="progress-bar progress-bar-striped progress-bar-animated  bg-success" role="progressbar" 
    style={{ transform: 'rotate(180deg)', width:  ( 100 * props.bahis.oran.tutar_oynayan / (props.bahis.oran.tutmaz_oynayan + props.bahis.oran.tutar_oynayan))+"%" }} 
    aria-valuenow={  100 *props.bahis.oran.tutar_oynayan / (props.bahis.oran.tutmaz_oynayan + props.bahis.oran.tutar_oynayan) } 
    aria-valuemin="0" aria-valuemax="100"> <div style={{transform: 'rotate(180deg)'}}>TUTAR </div>
    </div>
  
  <div className="progress-bar progress-bar-striped progress-bar-animated  bg-danger" role="progressbar" 
    style={{  width:  100 * props.bahis.oran.tutmaz_oynayan / (props.bahis.oran.tutmaz_oynayan + props.bahis.oran.tutar_oynayan)+"%" }} 
    aria-valuenow={ 100 *  props.bahis.oran.tutmaz_oynayan / (props.bahis.oran.tutmaz_oynayan + props.bahis.oran.tutar_oynayan) } 
    aria-valuemin="0" aria-valuemax="100"> TUTMAZ
    </div>

</div>
<br/>
    <button onClick={() => kuponaEkle("tutar", props.bahis._id, props.bahis.baslik, props.bahis.gorsel_url)} className="btn btn-success">EVET ({props.bahis.oran.tutar_oran.toFixed(2)})</button>
    <button onClick={() => kuponaEkle("tutmaz", props.bahis._id, props.bahis.baslik, props.bahis.gorsel_url)} className="btn btn-danger">HAYIR ({props.bahis.oran.tutmaz_oran.toFixed(2)})</button>
  </div>
</div>


</div>

  )
}
const YorumlarView = (props) => (
  <div className="card">
  <div className="card-body">
  <b> {props.yorum.kullanici_adi}  </b> yazmış;
  <br />
    { props.yorum.icerik } </div>
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
      },
      yorumlar: [{
        icerik: "",
        kullanici_id: "",
        begeni_sayisi: 0,
      }]
    }
  }

  componentDidMount(){
    var jwtToken = localStorage.getItem('Authorization');
    axios.defaults.headers.common['Authorization'] = "Bearer " + jwtToken;
    var bahis_id = this.props.match.params.id;
    console.log(bahis_id);
    axios.get('http://94.54.82.97:5000/bahisler/' + bahis_id)
    .then(res => {
      this.setState({bahis: res.data});
      console.log(this.state);
    })
    .catch(err => console.log(err));

    axios.get('http://94.54.82.97:5000/yorumlar/' + bahis_id)
    .then(res => {
      console.log(res);
      this.setState({yorumlar: res.data});
    })
    .catch(err => console.log(err));
  }

  bahisList() {
      return <BahisView bahis={this.state.bahis} />;
  }

  yorumlarList() {
    return this.state.yorumlar.map(yorum => {
      return <YorumlarView yorum={yorum} key={yorum._id}/>;
    })
  }

  render() {
    return (
      <div className="container">
      <div className="d-flex flex-column">
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', }}>
         { this.bahisList() }
         </div>
      </div>

      <div style={{ margin: 30 }}>
        YORUMLAR;
        { this.yorumlarList() }

      </div>

    </div>
    );
  }
}