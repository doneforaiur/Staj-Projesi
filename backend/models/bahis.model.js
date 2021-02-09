const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bahisSchema = new Schema({
  baslik: {type: String, required: true, trim: true, minlength: 5, },
  icerik: {type: String, required: true, trim: true},
  baslangic: {type: Date, required:true},
  bitis: {type: Date, required:true},
  oran: {type: [{
    tutar_oran:     {type: Number, requiered: true},
    tutmaz_oran:    {type: Number, requiered: true},
    tutar_oynayan:  {type: Number, requiered: true},
    tutmaz_oynayan: {type: Number, requiered: true}
  }]},
},
    {timestamps: true}
);


const Bahis = mongoose.model('Bahis', bahisSchema);

module.exports = Bahis;