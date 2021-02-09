const router = require('express').Router();
let Bahis = require('../models/bahis.model');

router.route('/').get((req, res) => {
  Bahis.find()
    .then(bahisler => res.json(bahisler))
    .catch(err => res.status(400).json('Hata; ' + err));
});


router.route('/add').post((req,res) =>{
  const baslik    = req.body.baslik;
  const icerik    = req.body.baslik;
  const baslangic = req.body.baslangic;
  const bitis     = req.body.bitis;  

  const yeniBahis = new Bahis({
    baslik,
    icerik,
    baslangic,
    bitis,
  });

  yeniBahis.save()
    .then(() => res.json("Bahis eklendi."))
    .catch(err => res.status(400).json('Hata; ' + err));

});

router.route('/:id').get((req,res) => {
  Bahis.findById(req.params.id)
    .then(bahis => res.json(bahis))
    .catch(err => res.status(400).json('Hata; ' + err));
});


router.route('/oran_update/:id').post((req,res) =>{
  Bahis.findById(req.params.id)
  .then(bahis => {
    bahis.oran.tutar_oran = req.body.tutar_oran;
    bahis.oran.tutmaz_oran = req.body.tutmaz_oran;

    bahis.save()
      .then(() => res.json("Bahis güncellendi."))
      .catch(err => res.status(400).json("Hata; " + err));
  })
  .catch(err => res.status(400).json('Hata; ' + err));

});

router.route('/oynayan_update/:id').post((req,res) =>{
  Bahis.findById(req.params.id)
  .then(bahis => {
    bahis.oran.tutar_oynayan  = req.body.tutar_oynayan;
    bahis.oran.tutmaz_oynayan = req.body.tutmaz_oynayan;

    bahis.save()
      .then(() => res.json("Bahis güncellendi."))
      .catch(err => res.status(400).json("Hata; " + err));
  })
  .catch(err => res.status(400).json('Hata; ' + err));

});


module.exports = router;