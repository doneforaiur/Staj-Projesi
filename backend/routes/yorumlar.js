const router = require('express').Router();
let Bahis = require('../models/bahis.model');
let Yorum = require('../models/yorum.model');

router.route('/').get((req, res) => {
  Yorum.find()
    .then(yorumlar => res.json(yorumlar))
    .catch(err => res.status(400).json('Hata; ' + err));
});


router.route('/:id').get((req,res) => {
  Yorum.find({bahis_id: req.params.id})
    .then(yorum => res.json(yorum))
    .catch(err => res.status(400).json('Hata; ' + err));
});

router.route('/add').post((req,res) =>{
  const icerik    = req.body.icerik;
  const kullanici_id    = req.user.kullanici_id;
  const kullanici_adi = req.user.kullanici_adi;
  const bahis_id = req.body.bahis_id;

  const yeniYorum = new Yorum({
    icerik,
    kullanici_id,
    kullanici_adi,
    bahis_id,
  });

  yeniYorum.save()
    .then(() => res.json("Yorum eklendi."))
    .catch(err => res.status(400).json('Hata; ' + err));

});

router.route('/begen').post((req,res) => {
  const yorum_id = req.body.yorum_id;
  const kullanici_id = req.body.kullanici_id;
  Yorum.findById(yorum_id)
  .then(yorum => {
    if ( yorum.begenenler.indexOf(kullanici_id) == -1 ){
      throw new Error('Zaten beğenmişsiniz.');
    }
    yorum.begenenler.push(kullanici_id);
    yorum.begeni_sayisi = yorum.begeni_sayisi + 1;

    yorum.save();
  })
  .catch(err => res.status(400).json('Hata; ' + err));
});


// güvenlik açığı
// JWT eklenmesi gerek
router.route('/sil').post((req,res) => {
  const yorum_id = req.body.id;

  Yorum.deleteOne({id:yorum_id}, function (err){
    if(err) res.status(400).json('Hata; ' + err);
  });
})


module.exports = router;