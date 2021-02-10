const router = require('express').Router();
let Kullanici = require('../models/kullanici.model');

router.route('/').get((req, res) => {
  Kullanici.find().sort({'bakiye':-1})
    .then(kullanicilar => res.json(kullanicilar))
    .catch(err => res.status(400).json('Hata; ' + err));
});


router.route('/add').post((req,res) =>{
  const baslik    = req.body.baslik;
  const icerik    = req.body.baslik;
  
  const yeniKullanici = new Kullanici({
    baslik,
    icerik,
  });

  yeniKullanici.save()
    .then(() => res.json("Kullanici eklendi."))
    .catch(err => res.status(400).json('Hata; ' + err));

});


// Kullanıcının id'si ile değil kullanıcı adı ile aranacak
// oynadığı bütün kuponlar ve bakiyesi görünecek?
router.route('/:id').get((req,res) => {
  Kullanici.find({'kullanici_adi': req.params.id})
    .then(kullanici => res.json(kullanici))
    .catch(err => res.status(400).json('Hata; ' + err));
});




module.exports = router;