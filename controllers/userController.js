const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;


    try {
        // user unique
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // create a new user
        user = new User(req.body);

        // Hash password
        const salt      = await bcryptjs.genSalt(10);
        user.password   = await bcryptjs.hash(password, salt );

        // save user
        await user.save();

        // create and signature JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // signature JWT
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            // msn success
            res.json({ token  });
        });


    } catch (error) {
        console.log(error);
        res.status(400).send('Api error');
    }
}