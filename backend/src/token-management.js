import jsonwebtoken from 'jsonwebtoken';

export class TokenManagement {
    constructor() {
        this.secret = "secret";
    }

    static generateToken(username) {
        return jsonwebtoken.sign({username: username}, this.secret, { expiresIn: '1h' });
    }

    static verifyToken (req, res, next) {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).send('Access denied. No token provided.');
      
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          req.user = decoded;
          next();
        } catch (error) {
          res.status(400).send('Invalid token.');
        }
      };

}