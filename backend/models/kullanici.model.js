const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const kullaniciSchema = new Schema({
  // https://stackoverflow.com/questions/16882938/how-to-check-if-that-data-already-exist-in-the-database-during-update-mongoose
  // https://luxiyalu.com/mongoose-unique-not-working/
  // server başladıktan bir süre sonra ekleme yapmak lazım?
  kullanici_adi: {
    type: String, unique: true, requiered: true
  },
    sifre: {type: String, required: true},
    bakiye: {type: Number, requiered: true, default: 1000},
    email: {type: String, requiered: true},
    yetki: {type: String, requiered: true, default: "uye"}
  },
    {timestamps: true}
);


const Kullanici = mongoose.model('Kullanici', kullaniciSchema);

module.exports = Kullanici;