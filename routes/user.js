// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

// api/users
router.post('/', 
    [
        check('name', 'The name is mandatory ').not().isEmpty(),
        check('email', 'Add a valid email ').isEmail(),
        check('password', 'The password must be minimum of 6 characters').isLength({ min: 6})
    ],
    userController.createUser
);

module.exports = router;