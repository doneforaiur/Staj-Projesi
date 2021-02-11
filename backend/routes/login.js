const router = require('express').Router();
const jwt = require('jsonwebtoken');

var Kullanici = require('../models/kullanici.model');

const accessTokenSecret = process.env.JWT_TOKEN;


router.route('/').post((req, res) => {
  const kullanici_adi = req.body.kullanici_adi;
  const sifre = req.body.sifre;
  console.log(kullanici_adi, sifre);
  // https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
  const kullanici = Kullanici.findOne({ kullanici_adi: kullanici_adi, sifre: sifre})
  .then((kullanici) =>{
    console.log(kullanici);
    if (kullanici != null ) {
      const accessToken = jwt.sign({ kullanici_adi: kullanici.kullanici_adi,  yetki: kullanici.yetki }, accessTokenSecret);
      res.json({ accessToken });
  }
  else{
    throw new Error('şifre hatalı');
  }
  })
  .catch(err =>  res.send("Hata; " + err));

});



module.exports = router;