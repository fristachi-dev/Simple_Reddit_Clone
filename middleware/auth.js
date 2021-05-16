const jwt = require('jsonwebtoken');
require('dotenv').config()

function auth(req, res, next) {
    const token = req.header('x-auth-token')

    //Check for token
    //if (!token) res.status(403).json({ msg: 'No token, auth denied' });


    try {
        if (token == undefined || token == '') throw { msg: 'Bad token, auth denied' };
        //verify token
        const decoded = jwt.verify(token, process.env.jwtSecret);
        //add user from payload
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: err })
    }
}

module.exports = auth;






// const jwt = require('jsonwebtoken');
// require('dotenv').config()

// function auth(req, res, next) {
//     const token = req.header('x-auth-token')

//     //Check for token
//     //if (!token) res.status(403).json({ msg: 'No token, auth denied' });
//     if (token == "") throw { msg: 'Bad token, auth denied' };

//     try {
//         //verify token
//         const decoded = jwt.verify(token, process.env.jwtSecret);
//         //add user from payload
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(405).json({ message: err })
//     }
// }

// module.exports = auth;