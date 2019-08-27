const router = require('express').Router();

const Receipts = require('./receipts-model');

router.get('/receipts', (req, res) => {
    const token = req.decodedToken;

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
});

router.delete('/receipt/:id', (req, res) => {
    const id = req.params.id;

    Receipts.deleteReceipt(id)
        .then(count => {
            if(count) res.status(201).json(count);
            res.status(404).json({ error: "Receipt with that id does not exist." });
        })
        .catch(err => res.status(500).json({ error: err }));
});

router.put('/receipt/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    const token = req.decodedToken;

    if(changes.date && changes.amount_spent && changes.category && changes.merchant) {
        Receipts.updateReceipt(id, changes)
            .then(count => {
                if(count) res.status(202).json(count);
                res.status(404).json({ error: "Receipt with that ID not found." })
            })
            .catch(err => res.status(500).json({ error: err }));
    } else {
        res.status(400).json({ error: "Please provide all required fields." });
    }
});

module.exports = router;