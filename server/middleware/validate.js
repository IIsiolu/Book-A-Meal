
class Validate {

  static validateSignUp(req, res, next) {
    req.checkBody('email', 'invalid email address')
      .isEmail();
    req.sanitizeBody('email')
      .normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
      });
    req.checkBody(
      'password',
      'Password Cannot be Blank cant be less than six Charaters!'
    )
      .notEmpty().isLength({ min: 6 });
    req.sanitizeBody('firstname');
    req.checkBody(
      'firstname',
      'input a firstname'
    )
      .notEmpty();
    req.sanitizeBody('lastname');
    req.checkBody(
      'lastname',
      'input a lastname'
    )
      .notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      const errorMessage = errors.map(err => err.msg);
      res.status(400).json({
        message: 'Signup Errors',
        errorMessage
      });
      return; // stop the req from proceeding
    }
    //   no errors
    next();
  }
}
export default Validate;
