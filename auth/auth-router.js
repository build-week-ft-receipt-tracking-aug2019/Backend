const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');
const Users = require('../users/users-model');

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    if(user.username && user.email && user.password) {
        Users.register(user)
            .then(id => res.status(201).json(id))
            .catch(err => {
                if(err.code === 'SQLITE_CONSTRAINT') {
                    res.status(400).json({ error: "That username or email is already in use." })
                } else {
                    res.status(500).json({ error: err })
                };
            });
    } else {
        res.status(400).json({ error: "Please provide username, email, and password." });
    };
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    Users.login(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);

                res.status(201).json({
                    message: `Welcome ${user.username}!`,
                    username: user.username,
                    token: token
                });
            } else {
                res.status(400).json({ error: "Invalid credentials!" });
            };
        })
        .catch(err => res.status(500).json({ error: err }));
});

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username
    };
  
    const options = {
        expiresIn: '1d'
    };
  
    return jwt.sign(payload, secrets.jwtSecret, options);
};

module.exports = router;