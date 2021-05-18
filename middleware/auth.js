const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({msg: 'There is no token'})
    }

    try {
        const encrypt = jwt.verify(token, process.env.SECRET_KEY);
        req.user = encrypt.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token invalid'});
    }
}