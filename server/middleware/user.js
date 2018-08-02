import jwt from 'jsonwebtoken';

class UserMiddleware {
  validToken(request, response, next) {
    const bearerHeader = request.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      jwt.verify(bearerToken, 'secretKey', (err, decoded) => {
        if (err) {
          return response.status(401).send({ message: 'Please register or login to gain access' });
        }
        request.body.userId = decoded.user;
        return next();
      });
    } else {
      return response.status(401).send({ message: 'Please register or login to gain access' });
    }
  }
}
export default new UserMiddleware();
