const db = require('../database/db-config');

module.exports = {
    getReceipts,
    postReceipt
};

function getReceipts(username) {
    return db('receipts as r')
        .join('users as u', 'r.user_username', 'u.username')
        .select('r.id', 'r.date', 'r.amount_spent', 'r.category', 'r.merchant')
        .where({ username });
};

function postReceipt(receipt) {
    return db('receipts')
        .insert(receipt);
};