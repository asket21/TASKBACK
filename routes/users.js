const Router = require('express');
const { checkAuth } = require("../middlewares/auth.js");
const router = new Router()

const userController = require('../controllers/userController.js')

router.get('/users', userController.getAllUsers)
router.post('/user', userController.createUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)
router.get('/user/:id', userController.getUserById)
router.put('/user/:id/password', userController.putUserPassword)
router.get('/users/by-role/:role', userController.getUserByRole)
module.exports = router