const router = require('express').Router();
const Orders = require('../controllers/orders');

router.post('/', Orders.create);

router.put('/:id', Orders.update);

module.exports = router;