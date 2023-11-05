const jwt = require('jsonwebtoken');

exports.createToken = (userId) => {
    try {
        return jwt.sign({ userId: userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h', // Token expiration time
        });
    } catch (e) {
        console.log("Error creating JWT token")
    }
}