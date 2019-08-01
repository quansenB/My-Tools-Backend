const jwt = require('jsonwebtoken')

module.exports = {
    restricted
}

function restricted(req, res, next){
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            if (err) {
                res.status(401).json({ message: 'Incorrect token, log in again!'});
            } else {
                req.user = { id: decodeToken.id, username: decodeToken.username };
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'No token provided.'});
    }
} 