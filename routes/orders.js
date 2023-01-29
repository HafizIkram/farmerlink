const router = require('express').Router();
const Orders = require('../controllers/orders');

router.post('/filter', Orders.filter);

router.get('/:id/farmer', Orders.getByFarmer);

router.post('/', Orders.create);

router.put('/:id', Orders.update);

module.exports = router;