const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const kullaniciSchema = new Schema({
    kullanici_adi : {type: String, required: true, trim:true},
    sifre: {type: String, required: true},
    bakiye: {type: Number, requiered: true, default: 1000}
  },
    {timestamps: true}
);


const Kullanici = mongoose.model('Kullanici', kullaniciSchema);

module.exports = Kullanici;