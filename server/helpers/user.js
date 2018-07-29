import validator from 'validator';

class UserValidation {
  static validateEntry(request, response, next) {
    const required = ['userId', 'entrytitle', 'entrycontent'];
    const collection = request.body;
    let isValid = true;
    const errors = {};
    for (let i = 0; i < required.length; i += 1) {
      if (!collection[required[i]]) {
        isValid = false;
        errors[required[i]] = `please provide ${required[i]}`;
      }
    }
    if (isValid) {
      return next();
    }
    return response.status(404).json({
      success: false,
      errors,
    });
  }

  static validateLogin(request, response, next) {
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
      const result = UserValidation.checkPassword(String(collection.password));
      errors.password = result;
      if (result) {
        isValid = false;
      }
    }
    if (isValid) {
      return next();
    }
    return response.status(404).json({
      success: false,
      errors,
    });
  }

  static validateRegistrationEntry(request, response, next) {
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
      const result = UserValidation.checkPassword(String(collection.password));
      errors.password = result;
      if (result) {
        isValid = false;
      }
    }
    if (collection.firstName) {
      const result = UserValidation.checkFirstName(String(collection.firstName));
      errors.firstName = result;
      if (result) {
        isValid = false;
      }
    }
    if (collection.lastName) {
      const result = UserValidation.checkLastName(String(collection.lastName));
      errors.lastName = result;
      if (result) {
        isValid = false;
      }
    }
    if (isValid) {
      return next();
    }
    return response.status(404).json({
      success: false,
      errors,
    });
  }

  static checkFirstName(param) {
    const firstName = param.trim();
    if (validator.isEmpty(firstName)) {
      return 'Your firstName cannot be empty';
    }

    if (firstName.length <= 2) {
      return 'Your firstName  should be greater than 2 charaters ';
    }
    return undefined;
  }


  static checkLastName(param) {
    const lastName = param.trim();
    if (validator.isEmpty(lastName)) {
      return 'Your lastName cannot be empty';
    }

    if (lastName.length <= 2) {
      return 'Your lastName should be greater than 2 charaters';
    }
    return undefined;
  }


  static checkPassword(param) {
    const password = param.trim();
    if (validator.isEmpty(password)) {
      return 'Your password cannot be empty';
    }

    if (password.length <= 6) {
      return 'Your Password length should be greater 6 charaters';
    }
    return undefined;
  }
}
export default UserValidation;
