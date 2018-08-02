import bcrypt from 'bcrypt';

class PasswordController {
     hashpassword(password) {
      return bcrypt.hashSync(password, 10);
    }

    isValidPassword(userpass, password) {
      return bcrypt.compareSync(password, userpass);
    }
}
export default new PasswordController();
