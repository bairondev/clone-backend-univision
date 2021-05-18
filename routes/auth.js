const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// api/auth
router.post('/', 
    authController.userAuthenticate
);

router.get('/',
    auth,
    authController.userAuthenticated
);

module.exports = router;