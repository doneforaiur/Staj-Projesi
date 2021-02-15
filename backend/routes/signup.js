const router = require('express').Router();

var Kullanici = require('../models/kullanici.model');

router.route('/').post((req,res) =>{
  const kullanici_adi   = req.body.kullanici_adi;
  const sifre           = req.body.sifre;
  const email           = req.body.email;

  const yeniKullanici = new Kullanici({
    kullanici_adi,
    sifre,
    email,
    bakiye:1000
  });

  yeniKullanici.save()
    .then(() => res.json("Kullanici eklendi."))
    .catch(err => res.status(400).json('Hata; ' + err));

});


module.exports = router;