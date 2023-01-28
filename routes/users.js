const router = require('express').Router();
const User = require('../controllers/users');

router.post('/userlogin', User.UserLogin);

router.get('/', User.getAll);

router.get('/:id', User.getOne);

router.post('/', User.create);

router.put('/:id', User.update);

router.delete('/:id', User.delete);

module.exports = router;