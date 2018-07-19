class UserValidation {
  static validateEntry(req, res, next) {
    let isValid = true;
    const errors = {};
    const collection = req.body;
    const required = ['entry'];
    for (let i = 0; i < required.length; i = +1) {
      if (!collection[required[i]]) {
        isValid = false;
        errors[required[i]] = `please provide ${required[i]}`;
      }
    }
    if (isValid) {
      return next();
    }
    return res.status(404).json({
      success: false,
      errors,
    });
  }
}
export default UserValidation;
