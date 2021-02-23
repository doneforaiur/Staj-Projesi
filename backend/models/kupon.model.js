const mongoose = require('mongoose');
let Bahis = require('../models/bahis.model');

const Schema = mongoose.Schema;

const kuponSchema = new Schema({
  bahisler: [{
        baslik: {type: String},
        id: {type: String},
        tahmin: {type: String}, 
        oran: {type: Number}
      }],
  tutar: {type: Number, min: 10, requiered: true},
  bitis_tarihi: {type: Date},
  kullanici_id: {type: String}
},
    {timestamps: true}
);


const Kupon = mongoose.model('Kupon', kuponSchema);

module.exports = Kupon;