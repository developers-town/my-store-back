const express = require('express');
const Models = require('../../models');
const passport = require('../../plugins/passport');
const { generateToken } = require('../../plugins/jwt');
const canUser = require('../../middlewares/permission');
const { common, logger, filter, response } = require('./helpers');
const userWorker = require('../../workers/user');
const ac = require('../../plugins//accesscontrol');

const auth = passport.authenticate('jwt', { session: false });

module.exports = (model) => {
  const router = express.Router();

  router.post('/signup', async (req, res, next) => {
    Models[model].create(req.body, (err, user) => {
      if (err) {
        logger.log('error', `POST '${req.originalUrl}' \n => Error Said: ${err}`);
        return next(err);
      }

      userWorker.createRole(user._id, user.role, model);

      let message = 'Signup succeed!', 
          payload = {};

      const permission = ac.can(user.role).readOwn(model);
      if (!permission.granted) {
        res.json(response[200](message, payload));
      } else {
        res.json(response[200](message, filter(permission, user)))
      }
    })
  })

  router.post('/login', (req, res, next) => {
    passport.authenticate(model, function(err, user, info) {
      if (err) { return next(err); }
      req.login(user, { session: false }, function(err) {
        if (err) { return next(err); }
        if (!user) return res.status(400).json(response[200](info.message));

        Models['role'].findOne({ _identity: user._id }, (err, role) => {
          if (err) { return next(err); }

          const token = generateToken({_id: role._id, username: user.username}, 'user');
          const message = 'Login succeed!';

          return res.json(response[200](message, { token }));
        })
      });
    })(req, res, next);
  })

  router.route('/profile')
    .all(auth)
    .get(canUser('readOwn', model), async (req, res, next) => {
      const doc = await Models[model].findById(req.user._identity._id);
      if (!doc) return res.status(404).json({ error: "Not found!"});
      const { permission } = res.locals;

      res.json(response[200](null, filter(permission, doc)));
    })
    .put(canUser('updateOwn', model), async (req, res, next) => {
      const user = await Models[model].findById(req.user._identity._id);
      if (!user) return res.status(404).json({ error: "Not found!"})
      const { permission } = res.locals;
      
      user.set(permission.filter(req.body));
      const profile = await user.save();
      res.json(response[200](null, filter(permission, profile)));
    })

  router.route('/calls?')
    .all(auth)
    .get(canUser('readOwn', 'call'), (req, res, next) => {
      Models['call'].find({_caller: req.user._id}, common(req, res, next));
    })

  return router;
}
