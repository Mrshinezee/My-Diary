import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import client from '../models/database';

class authUsersController {
  static hashpassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static isValidPassword(userpass, password) {
    return bcrypt.compareSync(password, userpass);
  }

  static validToken(request, response, next) {
    const bearerHeader = request.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      jwt.verify(bearerToken, 'secretKey', (err) => {
        if (err) {
          return response.status(401).send({ message: 'Please register or login to gain access' });
        }
        return next();
      });
    } else {
      return response.status(401).send({ message: 'Please register or login to gain access' });
    }
  }

  static userLogin(request, response) {
    const entry = {
      email: request.body.email,
      password: validator.trim(String(request.body.password)).replace(/\s/g, ''),
    };
    const query = { text: 'SELECT * FROM users where email = $1', values: [entry.email] };
    return authUsersController.signInUsers(request, response, query, entry);
  }

  static signInUsers(request, response, query, entry) {
    client.query(query).then((user) => {
      if (user.rowCount === 1) {
        const checker = authUsersController.isValidPassword(user.rows[0].password, entry.password);
        if (checker) {
          jwt.sign({ user: user.rows[0].userId }, 'secretKey', (err, token) => response.json({
            success: true,
            message: 'user successfully login',
            user: user.rows,
            token,
          }))
            .catch(error => response.status(500).json({ message: error.message }));
        }
      }
      response.status(400).json({
        success: false,
        message: 'Your email or password is incorrect',
      });
      return null;
    });
  }

  static registerUser(request, response) {
    const hashPassword = authUsersController.hashpassword(validator.trim(String(request.body.password)).replace(/\s/g, ''));
    const collection = {
      firstName: validator.trim(String(request.body.firstName)).replace(/ +(?= )/g, ''),
      lastName: validator.trim(String(request.body.lastName)).replace(/ +(?= )/g, ''),
      email: request.body.email,
      password: hashPassword,
    };
    const query = {
      text: 'INSERT INTO users(email, password, firstName, lastName) VALUES($1, $2, $3, $4)',
      values: [collection.email, collection.password, collection.firstName, collection.lastName],
    };
    return authUsersController.signUpUsers(request, response, query, collection);
  }

  static signUpUsers(request, response, query, collection) {
    const userEmail = request.body.email;
    client.query({ text: 'SELECT * FROM users where email = $1', values: [userEmail] }).then((user) => {
      if (user.rowCount === 0) {
        return client.query(query)
          .then(() => client.query('SELECT * FROM users WHERE email = $1', [userEmail]))
          .then(data => jwt.sign({ user: data.rows[0].userid }, 'secretKey', (err, token) => response.status(201).json({
            success: true,
            message: `Welcome ${collection.firstName}`,
            data: data.rows[0],
            token,
          })))
          .catch(error => response.status(500).json({ message: error.message }));
      }
      return response.status(409).json({
        success: false,
        message: 'An account already existing with this email address',
      });
    });
  }
}
export default authUsersController;
