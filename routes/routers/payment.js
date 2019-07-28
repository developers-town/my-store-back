const express = require('express');
const Models = require('../../models');
const passport = require('../../plugins/passport');

const auth = passport.authenticate('jwt', { session: false });
const canUser = require('../../middlewares/permission');

const { setOrderComplete } = require('../../logistics/payment');
const { record } = require('../../logistics/call');

module.exports = (model = 'payment') => {
  const router = express.Router();

  router.route('/')
    .all(auth)
    .post(canUser('createAny', model), (req, res, next) => {
      Models[model].create(req.body, (err, doc) => {
        if (err) return next(err);
        res.json(doc);
        setOrderComplete(doc.order, true, console.log);
        record(req, { status: 200 });
      })
    })

  router.route('/:id')
    .all(auth)
    .delete(canUser('deleteAny', model), (req, res, next) => {
      Models[model].findByIdAndRemove(req.params.id, (err, doc) => {
          if (err) console.error(err);
          res.json(doc);
          setOrderComplete(doc.order, false, console.log);
          record(req, { status: 200 });
      });
    })
  return router;
}
