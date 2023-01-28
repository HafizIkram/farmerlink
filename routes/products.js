const router = require('express').Router();
const Products = require('../controllers/products');

router.get('/', Products.getAll);

router.post('/filter', Products.filter);

router.get('/brands', Products.getAllBrands);

router.get('/:id', Products.getOne);

router.post('/', Products.create);

router.put('/:id', Products.update);

router.delete('/:id', Products.delete);

module.exports = router;