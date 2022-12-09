import jwt from 'jsonwebtoken';

export const validateAuthToken = (req, res, next) => {
  try {
    const authToken = req.headers?.authorization;
    console.log("authToken", authToken)
    if (!authToken) {
       res.sendStatus(403);
      return;
    }
    const [tokenType, token] = authToken.split(' ') ?? [];
    if (tokenType.toLowerCase() === "Bearer".toLowerCase() && token) {
      const { userName } = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
      req.userName = userName;
      next();
      return;
    }
    res.sendStatus(403);
  } catch (error) {
    logger.error('Error in decoding token:', error);
    res.sendStatus(403);
  }
};
