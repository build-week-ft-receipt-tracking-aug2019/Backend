const db = require('../database/db-config');

module.exports = {
    register,
    login,
    getUser
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

// I realize this is the exact same code as the login helper. Changing the name for readability.

function getUser(username) {
    return db('users')
        .where({ username })
        .first();
};