const { secret } = require("../config.json")
const jwt = require('jsonwebtoken')
const { getUser } = require('../logic/users-logic')

const authenticateJwtRequestToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //authorization: bearer token-data
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secret, async (err, user) => {
            if (err) {
                return res.status(400).send('token not valid');
            }
            const dbUser = await getUser(user.userId)


            req.user = dbUser;
            next();
        });
    } else {
        console.log('err2', err);
        res.status(400).send('no token');
    }
};
module.exports =
    authenticateJwtRequestToken