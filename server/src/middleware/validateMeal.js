class ValidateMeal {

    static checkAdd(req, res, next) {
      req.checkBody(
        'name',
        'meal name cannot be blank!'
      )
        .notEmpty();
      req.sanitizeBody('description');
      req.checkBody(
        'description',
        'input description'
      )
        .notEmpty();
      req.checkBody(
        'price',
        'input a price'
      )
        .notEmpty();
        req.checkBody(
            'image',
            'input image link'
          )
            .notEmpty();
      const errors = req.validationErrors();
      if (errors) {
        const errorMessage = errors.map(err => err.msg);
        res.status(400).json({
          message: 'add meal error',
          errorMessage
        });
        return; // stop the req from proceeding
      }
      //   no errors
      next();
    }
    static checkOrder(req, res, next) {
      req.checkBody(
        'name',
        'meal name cannot be blank!'
      )
        .notEmpty();
      req.sanitizeBody('description');
      req.checkBody(
        'description',
        'input description'
      )
        .notEmpty();
      req.checkBody(
        'price',
        'input a price'
      )
        .notEmpty();
        req.checkBody(
            'image',
            'input image link'
          )
            .notEmpty();
      req.checkBody(
        'customerName',
        'input customerName'
      )
        .notEmpty();
      const errors = req.validationErrors();
      if (errors) {
        const errorMessage = errors.map(err => err.msg);
        res.status(400).json({
          message: 'post order error',
          errorMessage
        });
        return; // stop the req from proceeding
      }
      //   no errors
      next();
    }
  
    
  }
  export default ValidateMeal;