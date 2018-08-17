import jwt from 'jsonwebtoken';
import validator from 'validator';
import PasswordController from '../helper/confirmPassword';
import client from '../models/database';

class AuthUsersController {
   userLogin(request, response) {
    const { email , password} = request.body;
    client.query({ text: 'SELECT * FROM users where email = $1', values: [email] }).then((user) => {
      if (user.rowCount === 1) {
        const checker = PasswordController.isValidPassword(user.rows[0].password, password);
        if (checker) {
          delete user.rows[0].password;
          jwt.sign({ user: user.rows[0].userid }, 'secretKey', (err, token) => response.json({
            success: true,
            message: 'user successfully login',
            firstName: user.rows[0].firstname,
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

  registerUser(request, response) {
    const hashPassword = PasswordController.hashpassword(request.body.password);
    const { firstName, lastName, email } = request.body;
    const query = {
      text: 'INSERT INTO users(email, password, firstName, lastName) VALUES($1, $2, $3, $4) RETURNING userid, email, firstName, lastName ',
      values: [email, hashPassword, firstName, lastName],
    };
    client.query(query)
    .then(data => jwt.sign({ user: data.rows[0].userid }, 'secretKey', (err, token) => response.status(201).json({
      success: true,
      message: 'user registration was successful',
      firstName: data.rows[0].firstname,
      data: data.rows[0],
      token,
    })))
    .catch(error => response.status(500).json({ message: error.message }));
  }
}
export default new AuthUsersController();
