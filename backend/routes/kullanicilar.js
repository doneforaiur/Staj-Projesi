const router = require('express').Router();
let Kullanici = require('../models/kullanici.model');
let Kupon = require('../models/kupon.model');

router.route('/').get((req, res) => {
  Kullanici.find().select('-sifre -yetki -email -_id -updatedAt -__v').sort({'bakiye':-1})
    .then(kullanicilar => res.json(kullanicilar))
    .catch(err => res.status(400).json('Hata; ' + err));
});

// Kullanıcının id'si ile değil kullanıcı adı ile aranacak
// oynadığı bütün kuponlar ve bakiyesi görünecek?
router.route('/:id').get((req,res) => {
  console.log(req.params.id);
  Kullanici.findOne({'kullanici_adi': req.params.id})
    .then(kullanici => {
      if(kullanici == null){
        res.json("Böyle bir kullanıcı yok.")
      }
      Kupon.find({'kullanici_id': kullanici._id})
        .then(kullanicinin_kuponlari => {
          console.log(kullanicinin_kuponlari)
          res.json({"kuponlar": kullanicinin_kuponlari, "bakiye": kullanici.bakiye})
          
        })
        .catch(err => res.status(400).json('Hata; ' + err));
    })
    .catch(err => res.status(400).json('Hata; ' + err));
});

module.exports = router;