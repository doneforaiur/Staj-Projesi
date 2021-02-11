const router = require('express').Router();
let Kullanici = require('../models/kullanici.model');
let Kupon = require('../models/kupon.model');

router.route('/').get((req, res) => {
  Kullanici.find().sort({'bakiye':-1})
    .then(kullanicilar => res.json(kullanicilar))
    .catch(err => res.status(400).json('Hata; ' + err));
});

router.route('/add').post((req,res) =>{
  const kullanici_adi    = req.body.kullanici_adi;
  const sifre    = req.body.sifre;

  const yeniKullanici = new Kullanici({
    kullanici_adi,
    sifre,
    bakiye:1000
  });

  yeniKullanici.save()
    .then(() => res.json("Kullanici eklendi."))
    .catch(err => res.status(400).json('Hata; ' + err));

});


// Kullanıcının id'si ile değil kullanıcı adı ile aranacak
// oynadığı bütün kuponlar ve bakiyesi görünecek?
router.route('/:kullanici_adi').get((req,res) => {
  Kullanici.find({'kullanici_adi': req.params.kullanici_adi})
    .then(kullanici => {
      Kupon.find({'kullanici_id': kullanici.kullanici_id})
        .then(kullanicinin_kuponlari => res.json(kullanicinin_kuponlari))
        .catch(err => res.status(400).json('Hata; ' + err));
    })
    .catch(err => res.status(400).json('Hata; ' + err));
});




module.exports = router;