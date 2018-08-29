const removeChar = input => (
  input.match(/\w/g).join('')
);

const testFullname = (input) => {
  const reg = /^([a-z']+(-| )?)+$/i;
  return reg.test(input);
};

const testString = (input) => {
  const reg = /^[a-z]+$/i;
  return reg.test(input);
};

// scrap, no need for validation
const descriptive = input => (
  input.replace(/[^a-zA-Z ]/g, '')
);

const checkDate = (input) => {
  if (input.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return true;
  }
  return false;
};

const checkInt = current => (
  Number.isInteger(current)
);

const checkObj = (current) => {
  const check = !!(Number.isInteger(current.mealId) &&
   Number.isInteger(current.quantity));
  return check;
};

/**
 * @class
 */
class Validate {
  /**
   * @description validates user signup
   * @param {string} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} res
   */
  static validateSignUp(req, res, next) {
    req.checkBody('email', 'invalid email address')
      .isEmail();
    req.sanitizeBody('email')
      .normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false,
      });
    req.checkBody(
      'password',
      'Password Cannot be Blank cant be less than six Charaters!',
    )
      .notEmpty().isLength({ min: 6 });
    req.sanitizeBody('firstname');
    req.checkBody(
      'firstname',
      'input a firstname',
    )
      .notEmpty();
    req.sanitizeBody('lastname');
    req.checkBody(
      'lastname',
      'input a lastname',
    )
      .notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      const errorMessage = errors.map(err => err.msg);
      res.status(400).json({
        message: 'Signup Errors',
        errorMessage,
      });
      return; // stop the req from proceeding
    }
    //   no errors
    if (!testString(req.body.firstname)) {
      return res.status(400).send({
        result: 'failed',
        message: 'input a valid first name',
      });
    }
    if (!testString(req.body.lastname)) {
      return res.status(400).send({
        result: 'failed',
        message: 'input a valid last name',
      });
    }
    next();
  }

  /**
   * @description validates user signin
   * @param {string} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} res
   */
  static validateSignin(req, res, next) {
    req.checkBody('email', 'invalid email address')
      .isEmail();
    req.sanitizeBody('email')
      .normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false,
      });
    req.checkBody(
      'password',
      'Password Cannot be Blank',
    )
      .notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      const errorMessage = errors.map(err => err.msg);
      res.status(400).json({
        message: 'Signin Errors',
        errorMessage,
      });
      return;
      // stop the req from proceeding
    }
    next();
  }

  /**
   * @description validates meal input
   * @param {string} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} res
   */
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
        errorMessage,
      });
      return;
      // stop the req from proceeding
    }
    if (!testFullname(req.body.name)) {
      return res.status(400).send({
        success: false,
        message: 'invalid meal name input',
      });
    }
    if (isNaN(req.body.price)) {
      return res.status(400).send({
        success: false,
        message: 'invalid meal price',
      });
    }
    req.body.name = removeChar(req.body.name);
    req.body.description = descriptive(req.body.description);
    next();
  }

  /**
   * @description validates meal update
   * @param {string} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} res
   */
  static validatemealUpdate(req, res, next) {
    if (req.body.name && !testFullname(req.body.name)) {
      return res.status(400).send({
        success: false,
        message: 'invalid meal name',
      });
    } else if (req.body.price && isNaN(req.body.price)) {
      return res.status(400).send({
        success: false,
        message: 'invalid meal price',
      });
    } else if (req.body.description) {
      req.body.description = descriptive(req.body.description);
    }
    next();
  }

  /**
   * @description validates user menu inputs
   * @param {string} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} res
   */
  static validateMenuInput(req, res, next) {
    req.checkBody('mealId', 'input menu Id').notEmpty();
    req.checkBody('date', 'input menu date').notEmpty();
    const meal = req.body.mealId;
    const errors = req.validationErrors();

    if (errors) {
      const errorMessage = errors.map(err => err.msg);
      res.status(400).json({
        message: 'Meal input Errors',
        errorMessage,
      });
      return;
    }
    if (!Array.isArray(meal) || meal.length === 0) {
      res.status(400).send({
        success: false,
        message: 'Input must be an array',
      });
      return;
    } else if (meal.every(checkInt) === false) {
      res.status(400).send({
        success: false,
        message: 'Array input must be integer',
      });
      return;
    }
    if (!req.body.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      res.status(400).json({
        message: 'invalid date input',
      });
      return;
    }
    next();
  }

  /**
   * @description validates date
   * @param {string} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} res
   */
  static validateDate(req, res, next) {
    if (req.query.date && !checkDate(req.query.date)) {
      return (
        res.status(400).send({
          message: 'invalid date input',
        })
      );
    }
    next();
  }

  /**
   * @description validates order
   * @param {string} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} res
   */
  static validateOrder(req, res, next) {
    req.checkBody('orders', 'input meal Orders').notEmpty();
    const cusOrders = req.body.orders;
    const errors = req.validationErrors();
    if (errors) {
      const errorMessage = errors.map(err => err.msg);
      res.status(400).json({
        message: 'Order input Errors',
        errorMessage,
      });
      return;
      // stop the req from proceeding
    }
    if (!Array.isArray(cusOrders) || cusOrders.length === 0) {
      res.status(400).send({
        success: false,
        message: 'Input must be an array of orders',
      });
      return;
    }
    if (cusOrders.every(checkObj) === false) {
      res.status(400).send({
        success: false,
        message: 'Meal Id and quantity must be an Integer',
      });
      return;
    }

    next();
  }

  /**
   * @description validates order update
   * @param {string} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} res
   */
  static updateOrder(req, res, next) {
    if (req.body.mealId && isNaN(req.body.mealId)) {
      return res.status(400).send({
        success: false,
        message: 'mealId must be a number',
      });
    } else if (req.body.quantity && isNaN(req.body.quantity)) {
      return res.status(400).send({
        success: false,
        message: 'quantity must be a number',
      });
    }
    next();
  }
}

export default Validate;
