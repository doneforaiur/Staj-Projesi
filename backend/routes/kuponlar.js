const router = require('express').Router();
let Kupon = require('../models/kupon.model');
let Bahis = require('../models/bahis.model');
let Kullanici = require('../models/kullanici.model')


router.route('/').get((req, res) => {
  Kupon.find()
    .then(kuponlar => res.json(kuponlar))
    .catch(err => res.status(400).json('Hata; ' + err));
});


router.route('/add').post((req,res) =>{
  const {kullanici_adi} = req.user;
  console.log("Kupon eklenecek; "+ req.body.kupon);
  const tutar = req.body.tutar;
  const kupon = req.body.kupon;

  console.log(tutar, kupon);
  ids = kupon.map(({ id }) => id);
// ids, kupona eklenecek bütün bahislerin id arrayi
  var kullanici_id = undefined;


  Kullanici.findOne({kullanici_adi:kullanici_adi})
  .then((kullanici) => {
    kullanici_id = kullanici._id;
    console.log(kullanici);
    if(kullanici.bakiye < tutar){
      res.json("Yetersiz bakiye.");
      res.send();
    }
    kullanici.bakiye = kullanici.bakiye - tutar;
    kullanici.save();
  });
  
  var bahisArray = [];

  Bahis.find().where('_id').in(ids).sort('-bitis').exec((err, bahisler) => {
      bahisler.forEach((bahis)=>{

      var tahmin = kupon.find(t=>t.id == bahis._id).tahmin;
      var oran =  (tahmin == "tutar") ?  bahis.oran.tutar_oran : bahis.oran.tutmaz_oran;


      console.log(bahis.baslik);
      bahisData = {
        "baslik": bahis.baslik,
        "id": bahis._id,
        "tahmin" : tahmin,
        "oran" :oran
      }
      bahisArray.push(bahisData);
      console.log(bahisData);

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
    var bitis_tarihi = bahisler[0].bitis;
    bahisler = bahisArray;
    console.log(bahisArray);
    const yeniKupon = new Kupon({
      bahisler, 
      tutar,
      kullanici_id,
      bitis_tarihi
    });
  
    yeniKupon.save()
      .then(() => res.json("Kupon eklendi."))
      .catch(err => res.status(400).json('Hata; ' + err));
  });
});

router.route('/:id').get((req,res) => {
  Kupon.findById(req.params.id)
    .then(kupon => {
      if(kupon==null) res.json("Böyle bir kupon yok.")
      else res.json(kupon)
    })
    .catch(err => res.status(400).json('Hata; ' + err));
});

router.route('/kullanici_kupon/:id').get((req,res) =>{
  var id = req.params.id;
  Kullanici.findOne({kullanici_adi: id}).then(kullanici => {

    console.log(kullanici)
    Kupon.find({kullanici_id:kullanici._id}).sort({'createdAt':-1})
    .then(kuponlar => {
      if(kuponlar == null ) res.json("Kullanıcının hiç kuponu yok.")
      else res.json(kuponlar)})
    .catch(err => res.status(400).json('Hata; ' + err));
});
});

module.exports = router;