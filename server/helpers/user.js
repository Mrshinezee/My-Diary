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
      const result = UserValidation.checkParam(String(collection.password), 'pw', required[1]);
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
      const result = UserValidation.checkParam(String(collection.password), 'pw', required[1]);
      errors.password = result;
      if (result) {
        isValid = false;
      }
    }
    if (collection.firstName) {
      const result = UserValidation.checkParam(String(collection.firstName), 'nm', required[2]);
      errors.firstName = result;
      if (result) {
        isValid = false;
      }
    }
    if (collection.lastName) {
      const result = UserValidation.checkParam(String(collection.lastName), 'nm', required[3]);
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

  static checkParam(param, type, name) {
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
  }
}
export default UserValidation;
