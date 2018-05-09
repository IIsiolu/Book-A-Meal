const removeChar = input => (
  input.match(/\w/g).join('')
);
const checkDate = (input) => {
  if (input.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return true;
  }
  return false;

};

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
    req.body.firstname = removeChar(req.body.firstname);
    req.body.lastname = removeChar(req.body.lastname);
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
    req.body.name = removeChar(req.body.name);
    req.body.description = removeChar(req.body.description);
    next();
  }

  static validateMenuInput(req, res, next) {
    req.checkBody('mealId', 'input menu Id').notEmpty();
    req.checkBody('date', 'input menu date').notEmpty();
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
    if (!req.body.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return (
        res.status(400).json({
          message: 'invalid date input'
        })
      );
    }
    next();
  }
  static validateDate(req, res, next) {
    if (req.query.date && !checkDate(req.query.date)) {
      return (
        res.status(400).send({
          message: 'invalid date input'
        })
      );
    }
    next();

  }
  static validateOrder(req, res, next) {
    req.checkBody('mealId', 'input meal Id').notEmpty();
    req.checkBody('quantity', 'input meal quantity').notEmpty();
    const errors = req.validationErrors();

    if (errors) {
      const errorMessage = errors.map(err => err.msg);
      res.status(400).json({
        message: 'Order input Errors',
        errorMessage
      });
      return;
      // stop the req from proceeding
    }
    next();
  }
}
export default Validate;
