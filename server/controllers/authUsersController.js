import jwt from 'jsonwebtoken';
// import validator from '../../helpers/user';
import bcrypt from 'bcrypt';
import client from '../models/database';

class authUsersController {
  static hashpassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static isValidPassword(userpass, password) {
    return bcrypt.compareSync(password, userpass);
  }

  static registerUser(request, response) {
    const hashPassword = authUsersController.hashpassword(request.body.password);
    const collection = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
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
        message: 'This account is already existing',
      });
    });
  }
}
export default authUsersController;
