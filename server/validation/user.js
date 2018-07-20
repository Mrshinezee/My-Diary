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
}
export default UserValidation;
