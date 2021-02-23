const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bahisSchema = new Schema({
  baslik:     {type: String, required: true, trim: true, minlength: 5},
  icerik:     {type: String, required: true, trim: true},
  baslangic:  {type: Date, required:true},
  bitis:      {type: Date, required:true},
  gorsel_url: {type: String },
  durum: {type: String, enum: ['bekliyor', 'evet', 'hayır', 'iptal'], default: 'bekliyor'},
  oran: {
    tutar_oran:     {type: Number, default: 2},
    tutmaz_oran:    {type: Number, default: 2},
    tutar_oynayan:  {type: Number, default: 10}, // Oranlar daha yavaş değişmesi için
    tutmaz_oynayan: {type: Number, default: 10}
}},
    {timestamps: true}
);


const Bahis = mongoose.model('Bahis', bahisSchema);

module.exports = Bahis;