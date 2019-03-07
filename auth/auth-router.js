const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Users = require('../users/users-model');

const secrets = require('../secret/secrets');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res
        .status(201)
        .json(saved);
    })
    .catch(error => {
      res
        .status(500)
        .json(error);
    });
});

module.exports = router;