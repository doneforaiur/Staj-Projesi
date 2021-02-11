const mongoose = require('mongoose');
let Bahis = require('../models/bahis.model');

const Schema = mongoose.Schema;

const yorumSchema = new Schema({
  icerik: {type: String, trim: true},
  kullanici_id: {type: String},
  bahis_id: {type: String},
  begeni_sayisi: {type: Number, default: 0},
  begenenler: [{type: String}]
},
    {timestamps: true}
);


const Yorum = mongoose.model('Yorum', yorumSchema);

module.exports = Yorum;