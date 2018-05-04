
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

  static validateSignin(req, res, next) {
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
      'Password Cannot be Blank'
    )
      .notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      const errorMessage = errors.map(err => err.msg);
      res.status(400).json({
        message: 'Signin Errors',
        errorMessage
      });
      return;
      // stop the req from proceeding
    }
    next();
  }
  static validatemealInput(req, res, next) {
    req.checkBody('name', 'input meal name').notEmpty();
    req.sanitizeBody('description');
    req.checkBody('description', 'input meal description').notEmpty();
    req.checkBody('price', 'input meal price').notEmpty();
    req.checkBody('image', 'input meal image').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      const errorMessage = errors.map(err => err.msg);
      res.status(400).json({
        message: 'Meal input Errors',
        errorMessage
      });
      return;
      // stop the req from proceeding
    }
    next();
  }

  static validateMenuInput(req, res, next) {
    req.checkBody('mealName', 'input meal name').notEmpty();
    req.checkBody('date', 'input meal date').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      const errorMessage = errors.map(err => err.msg);
      res.status(400).json({
        message: 'Meal input Errors',
        errorMessage
      });
      return;
      // stop the req from proceeding
    }
    next();
  }

}
export default Validate;
