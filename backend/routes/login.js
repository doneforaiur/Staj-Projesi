const router = require('express').Router();
const jwt = require('jsonwebtoken');

var Kullanici = require('../models/kullanici.model');

const accessTokenSecret = process.env.JWT_TOKEN;


router.route('/').post((req, res) => {
  console.log(req.body);
  const kullanici_adi = req.body.kullanici_adi;
  const sifre = req.body.sifre;
  // https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
  const kullanici = Kullanici.find({ kullanici_adi: kullanici_adi, sifre: sifre});
  if (kullanici) {
      const accessToken = jwt.sign({ kullanici_adi: kullanici.kullanici_adi,  yetki: kullanici.yetki }, accessTokenSecret);
      res.json({
          accessToken
      });
  } else {
      res.send('Username or password incorrect');
  }
});



module.exports = router;