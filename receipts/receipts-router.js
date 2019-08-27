const router = require('express').Router();

const Receipts = require('./receipts-model');

router.get('/receipts', (req, res) => {
    // const username = req.params.username;
    const token = req.decodedToken;
    console.log(token);

    Receipts.getReceipts(token)
        .then(receipts => res.status(200).json(receipts))
        .catch(err => res.status(500).json({ error: err }));
});

router.post('/receipt', (req, res) => {
    const receipt = req.body;

    if(receipt.date && receipt.amount_spent && receipt.category && receipt.merchant && receipt.user_username) {
        Receipts.postReceipt(receipt)
            .then(id => res.status(201).json(id))
            .catch(err => res.status(500).json({ error: err }));
    } else {
        res.status(400).json({ error: "Please provide all required fields." })
    }
})

module.exports = router;