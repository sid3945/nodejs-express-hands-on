const express = require('express');
const userController = require('../controllers/userController');

router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.validateUser, userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;