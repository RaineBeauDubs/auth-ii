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

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res
          .status(200)
          .json({
            message: `Welcome ${user.username}!, here is a token!`,
            token,
          });
      } else {
        res
          .status(401)
          .json({
            message: "Uhm... I don't think so...."
          });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json(error);
    });
});

function generateToken(user){
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;