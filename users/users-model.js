const db = require('../database/db-config');

module.exports = {
    register,
    login
};

function register(user) {
    return db('users')
        .insert(user);
};

function login(username) {
    return db('users')
        .where({ username })
        .first();
};