import React, { Component } from 'react';
import axios from 'axios';



export default class BahisList extends Component {
  constructor(props){
    super(props);
    var aaa = localStorage.getItem('Authorization');
    console.log(aaa);
    axios.defaults.headers.get['Authorization'] = aaa;
    axios.defaults.headers.get['Contenty-Type'] = 'appliction/json';

    console.log(aaa.accessToken);
    
    axios.get('http://localhost:5000/bahisler')
    .then(res => console.log(res))
    .catch(err => console.log(err));

  }
  render() {
    return (
      <div>
        <p>Bahis listeleri kısmındasın.</p>
      </div>

    );
  }
}