import React, { Component } from 'react';
import axios from 'axios';



export default class BahisList extends Component {
  constructor(props){
    super(props);

    axios.get('http://localhost:5000/bahisler')
    .then(res => console.log(res));

  }
  render() {
    return (
      <div>
        <p>Bahis listeleri kısmındasın.</p>
      </div>

    );
  }
}