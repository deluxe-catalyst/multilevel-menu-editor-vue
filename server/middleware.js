const jsontoken = require('jsonwebtoken');
const {User} = require('./models');

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jsontoken.verify(token, 'secret-key', async (err, user) => {
        if (err) return res.sendStatus(403);

        const userRecord = await User.findByPk(user.id);
        req.user = userRecord;
        next();
    });
};

const checkAdminRules = async (req, res, next) => {
    const user = req.user;
    
    
    if (!user || user.rules !== true) {
      return res.status(403).json({ message: 'Недостаточно прав' });
    }
  
    next();
}

module.exports = {authToken, checkAdminRules};