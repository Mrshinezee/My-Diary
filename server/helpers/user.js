import validator from 'validator';
class UserValidation {
  static validateEntry(request, response, next) {
    const required = ['entry'];
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
    if (isValid) {
      return next();
    }
    return response.status(404).json({
      success: false,
      errors,
    });
  }

  static checkLength(request, response, next) {
    const { password, firstName, lastName } = request.body;
    let isValid = true;
    const errors = {};

    if (lastName && !(validator.isLength(lastName, { min: 1, max: 15 }))) {
      isValid = false;
      errors.lastName = 'The length of your last name should be between 1 and 10';
    }
    if (firstName && !(validator.isLength(firstName, { min: 1, max: 15 }))) {
      isValid = false;
      errors.firstName = 'The length of your first name should be between 1 and 10';
    }
    if (password && !(validator.isLength(password, { min: 6, max: 15 }))) {
      isValid = false;
      errors.password = 'your Password length should be between 6 and 15';
    }
    if (isValid) {
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  }
}
export default UserValidation;
