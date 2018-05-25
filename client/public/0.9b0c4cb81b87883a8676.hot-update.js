exports.id=0,exports.modules={608:function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(1),u=p(l),i=p(n(607)),f=n(332),c=(n(100),p(n(0))),s=p(n(334));function p(e){return e&&e.__esModule?e:{default:e}}var d=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==(void 0===t?"undefined":r(t))&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.onChange=function(t){var n,r,a;console.log(t.target.value),e.setState({data:o({},e.state.data,(n={},r=t.target.name,a=[t.target.value],r in n?Object.defineProperty(n,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[r]=a,n))})},e.onSubmit=function(t){t.preventDefault();var n=e.validate(e.state.data);e.setState({errors:n}),0==Object.keys(n).length&&e.props.submit(e.state.data)},e.state={data:{email:"",password:""},loading:!1,errors:{}},e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":r(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),a(t,[{key:"validate",value:function(e){var t={};return i.default.isEmail(e.email)||(t.email="Invalid email"),e.password||(t.password="Can't be blank"),t}},{key:"render",value:function(){var e=this.state,t=e.data,n=e.errors;return u.default.createElement(f.Form,{onSubmit:this.onSubmit},u.default.createElement(f.Form.Field,{error:!!n.email},u.default.createElement("label",{htmlFor:"email"}," Email "),u.default.createElement("input",{type:"email",id:"email",name:"email",value:t.email,onChange:this.onChange,placeholder:"example@example.com"}),n.email&&u.default.createElement(s.default,{text:n.email})),u.default.createElement(f.Form.Field,{error:!!n.password},u.default.createElement("label",{htmlFor:"password"}," Password "),u.default.createElement("input",{type:"password",id:"password",name:"password",placeholder:"Make it secure",value:t.password,onChange:this.onChange}),n.password&&u.default.createElement(s.default,{text:n.password})),u.default.createElement(f.Button,{type:"submit",primary:!0},"Login"))}}]),t}();d.prototypes={submit:c.default.func.isRequired},t.default=d},609:function(e,t,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(1),l=i(a),u=i(n(608));function i(e){return e&&e.__esModule?e:{default:e}}function f(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==(void 0===t?"undefined":r(t))&&"function"!=typeof t?e:t}var c=function(e){function t(){var e,n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var o=arguments.length,a=Array(o),l=0;l<o;l++)a[l]=arguments[l];return n=r=f(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),r.submit=function(e){console.log(e)},f(r,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+(void 0===t?"undefined":r(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),o(t,[{key:"render",value:function(){return l.default.createElement("div",null,l.default.createElement("h1",null," Login Page "),l.default.createElement(u.default,{submit:this.submit}))}}]),t}();t.default=c}};