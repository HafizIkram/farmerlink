const router = require('express').Router();
const Products = require('../controllers/products');

router.get('/farmer/:id', Products.getAll);

router.get('/:id', Products.getOne);

router.post('/', Products.create);

router.put('/:id', Products.update);

router.delete('/:id', Products.delete);

module.exports = router;