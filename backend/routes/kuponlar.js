const router = require('express').Router();
let Kupon = require('../models/kupon.model');
let Bahis = require('../models/bahis.model');

router.route('/').get((req, res) => {
  Kupon.find()
    .then(kuponlar => res.json(kuponlar))
    .catch(err => res.status(400).json('Hata; ' + err));
});


router.route('/add').post((req,res) =>{
  const kullanici_id = req.body.kullanici_id;
  const tutar = req.body.tutar;
  const kupon = req.body.kupon;
  ids = kupon.map(({ id }) => id);
// ids, kupona eklenecek bütün bahislerin id arrayi


  var bitis_tarihi ="1970-01-01T01:01:01.01Z";
  var bahisArray = []
  Bahis.find().where('_id').in(ids).exec((err, bahisler) => {
     bahisler.forEach((bahis)=>{

      var tahmin = kupon.find(t=>t.id == bahis._id).tahmin;
      var oran =  (tahmin == "tutar") ?  bahis.oran.tutar_oran : bahis.oran.tutmaz_oran;

      bahisData = {
        "id": bahis._id,
        "tahmin" : tahmin,
        "oran" :oran
      }
      bahisArray.push(bahisData);
      (bahis.bitis > bitis_tarihi) ? bitis_tarihi = bahis.bitis : bitis_tarihi = bitis_tarihi;
      //  TODO; bitis_tarihi düzgün çalışmıyor


      //  oynayan sayısını arttırma

      if(tahmin == "tutar")
        bahis.oran.tutar_oynayan = bahis.oran.tutar_oynayan + 1;
      else
        bahis.oran.tutmaz_oynayan = bahis.oran.tutmaz_oynayan + 1;
      
      //  oranın tekrar hesaplanması
      //  (x-1)^3 + 1.8
      //  2x+1 ve -2x+3 
      
      var tutar_o = bahis.oran.tutar_oynayan;
      var tutmaz_o = bahis.oran.tutmaz_oynayan;

      var toplam_o = tutar_o + tutmaz_o;
      tutar_o = tutar_o / toplam_o;
      tutmaz_o = tutmaz_o / toplam_o;
  
      if (tutar_o >tutmaz_o){
        var yeni_tutar_oran = -2*tutar_o + 3;
        var yeni_tutmaz_oran = -2*tutmaz_o + 3;
      }
      else{
        var yeni_tutar_oran = 2*tutar_o+1;
        var yeni_tutmaz_oran = 2*tutmaz_o + 1;
      }
      
      console.log(tutar_o, tutmaz_o, yeni_tutar_oran, yeni_tutmaz_oran);

      bahis.oran.tutar_oran = yeni_tutar_oran;
      bahis.oran.tutmaz_oran = yeni_tutmaz_oran;
      bahis.save();

    });
    
    bahisler = bahisArray;
    const yeniKupon = new Kupon({
      bahisler, 
      tutar,
      kullanici_id,
      bitis_tarihi
    });
  
    yeniKupon.save()
      .then(() => res.json("Kupon eklendi."))
      .catch(err => res.status(400).json('Hata; ' + err));
  
  })


});

router.route('/:id').get((req,res) => {
  Kupon.findById(req.params.id)
    .then(bahis => res.json(bahis))
    .catch(err => res.status(400).json('Hata; ' + err));
});

router.route('/user_kupon/:id')
// id, kullanıcı id'si


module.exports = router;