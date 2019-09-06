"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _swaggerUi = _interopRequireDefault(require("./swagger-ui"));

var SwaggerUI =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(SwaggerUI, _React$Component);

  function SwaggerUI(props) {
    var _this;

    (0, _classCallCheck2.default)(this, SwaggerUI);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SwaggerUI).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "requestInterceptor", function (req) {
      if (typeof _this.props.requestInterceptor === "function") {
        return _this.props.requestInterceptor(req);
      }

      return req;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "responseInterceptor", function (res) {
      if (typeof _this.props.responseInterceptor === "function") {
        return _this.props.responseInterceptor(res);
      }

      return res;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onComplete", function () {
      if (typeof _this.props.onComplete === "function") {
        return _this.props.onComplete(_this.system);
      }
    });
    _this.SwaggerUIComponent = null;
    _this.system = null;
    return _this;
  }

  (0, _createClass2.default)(SwaggerUI, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var ui = (0, _swaggerUi.default)({
        plugins: this.props.plugins,
        spec: this.props.spec,
        url: this.props.url,
        requestInterceptor: this.requestInterceptor,
        responseInterceptor: this.responseInterceptor,
        onComplete: this.onComplete,
        docExpansion: this.props.docExpansion,
        defaultModelExpandDepth: this.props.defaultModelExpandDepth
      });
      this.system = ui;
      this.SwaggerUIComponent = ui.getComponent("App", "root");
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      return this.SwaggerUIComponent ? _react.default.createElement(this.SwaggerUIComponent, null) : null;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.url !== prevProps.url) {
        // flush current content
        this.system.specActions.updateSpec("");

        if (this.props.url) {
          // update the internal URL
          this.system.specActions.updateUrl(this.props.url); // trigger remote definition fetch

          this.system.specActions.download(this.props.url);
        }
      }

      if (this.props.spec !== prevProps.spec && this.props.spec) {
        if ((0, _typeof2.default)(this.props.spec) === "object") {
          this.system.specActions.updateSpec((0, _stringify.default)(this.props.spec));
        } else {
          this.system.specActions.updateSpec(this.props.spec);
        }
      }
    }
  }]);
  return SwaggerUI;
}(_react.default.Component);

exports.default = SwaggerUI;

