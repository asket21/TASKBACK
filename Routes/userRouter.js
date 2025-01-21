const Router = require('express');

const router = new Router()
const userController = require('../Controllers/userController')

router.get('/user', userController.getAllUsers)
router.post('/user', userController.createUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

module.exports = router