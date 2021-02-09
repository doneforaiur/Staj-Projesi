const router = require('express').Router();
let Bahis = require('../models/bahis.model');

router.route('/').get((req, res) => {
  Bahis.find()
    .then(bahisler => res.json(bahisler))
    .catch(err => res.status(400).json('Hata; ' + err));
});

module.exports = router;