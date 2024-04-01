import jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET = "secret";
const tokenBlacklist = new Set();

export class TokenManagement {

    static generateToken(username) {
        return jsonwebtoken.sign({username: username}, JWT_SECRET, { expiresIn: '24h' });
    }

    static verifyToken (req, res, next) {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).send('Access denied. No token provided.');

        // Check if token is in blacklist
        if (tokenBlacklist.has(token)) {
            return res.status(401).json({ message: 'Token revoked' });
        }
      
        try {
            const decoded = jsonwebtoken.verify(token, JWT_SECRET);
            req.userName = decoded;
            next();
        } catch (error) {
            console.error(error);
            res.status(400).send('Invalid token.');
        }
      };

    static revokeToken(token) {
        tokenBlacklist.add(token);
    }

}