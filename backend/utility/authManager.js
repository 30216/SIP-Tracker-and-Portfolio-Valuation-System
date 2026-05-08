const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; 

function sign_JWT(payload) {
    try{
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw new Error('Error generating JWT token');
    }
}
function verify_JWT(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired JWT token');
    }
}