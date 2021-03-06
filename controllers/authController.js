const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult¬†} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.userAuthenticate = async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }


    const {¬†email, password } = req.body;

    try {
        // check user
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({msg: 'User does not exist'});
        }

        // check password
        const checkPassword = await bcryptjs.compare(password, user.password);
        if(!checkPassword) {
            return res.status(400).json({msg: 'Incorrect password.' })
        }

        // create signature JWT
         const payload = {
            user: {
                id: user.id
            }
        };

        // signature JWT
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 7200 // 2 hr
        }, (error, token) => {
            if(error) throw error;
            res.json({ token  });
        });

    } catch (error) {
        console.log(error);
    }
}


// Read authenticated user
exports.userAuthenticated = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'not authenticated'});
    }
}