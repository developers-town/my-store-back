const express = require('express');
const Models = require('../../models');
const passport = require('../../plugins/passport');

const auth = passport.authenticate('jwt', { session: false });
const canUser = require('../../middlewares/permission');

const { calculateImportAmount } = require('../../logistics/common');
const { decreaseProductQty, increaseProductQty } = require('../../logistics/order');
const { record } = require('../../logistics/call');

module.exports = (model = 'importOrder') => {
  const router = express.Router();

  router.route('/')
    .all(auth)
    .post(canUser('createAny', model), (req, res, next) => {
      req.body.amount = calculateImportAmount(req.body);

      Models[model].create(req.body, (err, doc) => {
        if (err) return next(err);
        res.json(doc);
        increaseProductQty(doc.product, doc.qty, console.log);
        record(req, { status: 200 });
      })
    })

    router.route('/:id')
      .all(auth)
      .delete(canUser('deleteAny', model), (req, res, next) => {
        Models[model].findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) console.error(err);
            res.json(doc);
            decreaseProductQty(doc.product, doc.qty, console.log);
            record(req, { status: 200 });
        });
      })
  return router;
}
