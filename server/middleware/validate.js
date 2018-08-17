import validator from 'validator';
import client from '../models/database';

const userValidation = {
  validateEntry(request, response, next) {
    const { entrytitle, entrycontent } = request.body;
    let isValid = true;
    const errors = {};
    if (!entrytitle || !entrytitle.trim()) {
      isValid = false;
      errors.entrytitle = 'Entry title name is required';
    } else {
      request.body.entrytitle = entrytitle.trim();
    }
    if (!entrycontent || !entrycontent.trim()) {
      isValid = false;
      errors.entrycontent = 'Entry content is required';
    } else {
      request.body.entrycontent = entrycontent.trim();
    }
    if (isValid) {
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  },
  validateLogin(request, response, next) {
    const required = ['email', 'password'];
    const collection = request.body;
    let isValid = true;
    const errors = {};
    for (let i = 0; i < required.length; i += 1) {
      if (!collection[required[i]]) {
        isValid = false;
        errors[required[i]] = `please provide ${required[i]}`;
      }
    }
    if (collection.email) {
      if ((validator.isEmail(collection.email) === false)) {
        isValid = false;
        errors.email = 'please provide a valid email address';
      }
    }
    if (collection.password) {
      const result = userValidation.checkParam(String(collection.password), 'pw', required[1]);
      errors.password = result;
      if (result) {
        isValid = false;
      }
    }
    if (isValid) {
      request.body.password = collection.password.trim();
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  },
  validateRegistrationEntry(request, response, next) {
    const required = ['email', 'password', 'firstName', 'lastName'];
    const collection = request.body;
    let isValid = true;
    const errors = {};
    for (let i = 0; i < required.length; i += 1) {
      if (!collection[required[i]]) {
        isValid = false;
        errors[required[i]] = `please provide ${required[i]}`;
      }
    }
    if (collection.email) {
      if ((validator.isEmail(collection.email) === false)) {
        isValid = false;
        errors.email = 'please provide a valid email address';
      }
    }
    if (collection.password) {
      const result = userValidation.checkParam(String(collection.password), 'pw', required[1]);
      errors.password = result;
      if (result) {
        isValid = false;
      }
    }
    if (collection.firstName) {
      const result = userValidation.checkParam(String(collection.firstName), 'nm', required[2]);
      errors.firstName = result;
      if (result) {
        isValid = false;
      }
    }
    if (collection.lastName) {
      const result = userValidation.checkParam(String(collection.lastName), 'nm', required[3]);
      errors.lastName = result;
      if (result) {
        isValid = false;
      }
    }
    if (isValid) {
      request.body.password = collection.password.trim();
      request.body.firstName = collection.firstName.trim();
      request.body.lastName = collection.lastName.trim();
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  },
  checkParam(param, type, name) {
    if (type === 'nm') {
      const value = param.trim();
      if (validator.isEmpty(value)) {
        return `Your ${name} cannot be empty`;
      }
      if (value.length <= 2) {
        return `Your ${name} should be greater than 2 charaters`;
      }
      return undefined;
    } if (type === 'pw') {
      const password = param.trim();
      if (validator.isEmpty(password)) {
        return `Your ${name} cannot be empty`;
      }
      if (password.length <= 6) {
        return `Your ${name} length should be greater 6 charaters`;
      }
      return undefined;
    }
  },
  validateParam(request, response, next) {
    if (request.params.entryId && isNaN (parseInt(request.params.entryId, 10))) {
      return response.status(400).json({
        success: false,
        message: 'The entryId provided must be an integer',
      });
    }
    next();
  },
  checkExistingUser(request, response, next) {
    const { email } = request.body;
    client.query({ text: 'SELECT * FROM users where email = $1', values: [email] })
      .then((user) => {
        if (user.rowCount > 0) {
          response.status(409).json({
            success: false,
            message: 'An account already existing with this email address',
          });
        } else {
          next();
        }
      })
      .catch(error => response.status(500).json({ message: error.message }));
  },
  getUserDetail(request, response) {
    const { userId } = request.body;
    client.query({ text: 'SELECT users.userid, users.email, users.firstName, users.lastName FROM users where userid = ($1) ', values: [userId] })
      .then((user) => {
        if (user.rowCount > 0) {
          response.status(200).json({
            success: true,
            message: 'user detail found',
            data: user.rows,
          });
        } else {
          response.status(404).json({
            success: false,
            message: 'User not found',
          });
        }
      })
      .catch(error => response.status(500).json({ message: error.message }));
  },
};
export default userValidation;
