const crypto = require('crypto');

const generateVerifyToken = () => {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex');
  const expires = Date.now() + 60 * 60 * 1000; // 1 hour

  return { rawToken, hashedToken, expires };
};

module.exports = generateVerifyToken;