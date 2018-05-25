exports.id = "main";
exports.modules = {

/***/ "./client/src/components/forms/LoginForm.js":
/*!**************************************************!*\
  !*** ./client/src/components/forms/LoginForm.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _validator = __webpack_require__(/*! validator */ "./node_modules/validator/index.js");

var _validator2 = _interopRequireDefault(_validator);

var _semanticUiReact = __webpack_require__(/*! semantic-ui-react */ "./node_modules/semantic-ui-react/dist/es/index.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _inlineError = __webpack_require__(/*! ../messages/inlineError */ "./client/src/components/messages/inlineError.js");

var _inlineError2 = _interopRequireDefault(_inlineError);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * @class Login
 *
 * @extends {React.Component}
 */
var LoginForm = function (_Component) {
  _inherits(LoginForm, _Component);

  function LoginForm() {
    _classCallCheck(this, LoginForm);

    var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this));

    _this.onChange = function (e) {
      _this.setState({
        data: _extends({}, _this.state.data, _defineProperty({}, e.target.name, e.target.value))
      });
    };

    _this.onSubmit = function (e) {
      e.preventDefault();
      var errors = _this.validate(_this.state.data);
      _this.setState({ errors: errors });
      if (Object.keys(errors).length == 0) {
        _this.props.submit(_this.state.data);
      }
    };

    _this.state = {
      data: {
        email: '',
        password: ''
      },
      loading: false,
      errors: {}
    };
    return _this;
  }

  _createClass(LoginForm, [{
    key: 'validate',
    value: function validate(data) {
      var errors = {};
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

      if (!emailRegex.test(data.email) || !data.email) errors.email = 'Invalid email';
      if (!data.password) errors.password = "Can't be blank";
      return errors;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          data = _state.data,
          errors = _state.errors;

      return _react2.default.createElement(_semanticUiReact.Form, { onSubmit: this.onSubmit, loading: this.props.loading }, this.props.error && _react2.default.createElement(_semanticUiReact.Message, { negative: true }, _react2.default.createElement(_semanticUiReact.Message.Header, null, ' Something went wrong '), _react2.default.createElement('p', null, this.props.error, ' ')), _react2.default.createElement(_semanticUiReact.Form.Field, { error: !!errors.email }, _react2.default.createElement('label', { htmlFor: 'email' }, ' Email '), _react2.default.createElement('input', {
        type: 'email',
        id: 'email', name: 'email',
        value: data.email,
        onChange: this.onChange,
        placeholder: 'example@example.com' }), errors.email && _react2.default.createElement(_inlineError2.default, { text: errors.email })), _react2.default.createElement(_semanticUiReact.Form.Field, { error: !!errors.password }, _react2.default.createElement('label', { htmlFor: 'password' }, ' Password '), _react2.default.createElement('input', {
        type: 'password',
        id: 'password',
        name: 'password',
        placeholder: 'Make it secure',
        value: data.password,
        onChange: this.onChange
      }), errors.password && _react2.default.createElement(_inlineError2.default, { text: errors.password })), _react2.default.createElement(_semanticUiReact.Button, {
        type: 'submit',
        primary: true
      }, 'Login'));
    }
  }]);

  return LoginForm;
}(_react.Component);

LoginForm.propTypes = {
  submit: _propTypes2.default.func.isRequired
};

exports.default = LoginForm;

/***/ })

};
//# sourceMappingURL=bundle.map