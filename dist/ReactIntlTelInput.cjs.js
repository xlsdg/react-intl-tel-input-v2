'use strict';

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = _interopDefault(require('react'));
var _get = _interopDefault(require('lodash-es/get'));
var _omit = _interopDefault(require('lodash-es/omit'));
var _assign = _interopDefault(require('lodash-es/assign'));
var _isArray = _interopDefault(require('lodash-es/isArray'));
var _isFunction = _interopDefault(require('lodash-es/isFunction'));
var IntlTelInput = _interopDefault(require('intl-tel-input'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === 'object' || typeof call === 'function')) {
    return call;
  }

  return _assertThisInitialized(self);
}

var ReactIntlTelInput =
  /*#__PURE__*/
  (function(_React$Component) {
    _inherits(ReactIntlTelInput, _React$Component);

    _createClass(ReactIntlTelInput, null, [
      {
        key: 'getDerivedStateFromProps',
        // static propTypes = {
        //   className: PropTypes.string,
        //   inputProps: PropTypes.object,
        //   intlTelOpts: PropTypes.object,
        //   value: PropTypes.object,
        //   onChange: PropTypes.func,
        //   onReady: PropTypes.func,
        //   onCountryDropdownOpen: PropTypes.func,
        //   onCountryDropdownClose: PropTypes.func,
        // };
        value: function getDerivedStateFromProps(nextProps, prevState) {
          if (nextProps.value) {
            return Object.assign({}, nextProps.value || {});
          }

          return null;
        },
      },
    ]);

    function ReactIntlTelInput(props) {
      var _this;

      _classCallCheck(this, ReactIntlTelInput);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactIntlTelInput).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'init', function() {
        var that = _assertThisInitialized(_assertThisInitialized(_this));

        var _that$props = that.props,
          intlTelOpts = _that$props.intlTelOpts,
          onReady = _that$props.onReady;

        if (!that.dom) {
          return;
        }

        var instance = IntlTelInput(that.dom, intlTelOpts);
        that.dom.addEventListener('countrychange', that.handleCountryChange);
        that.dom.addEventListener('open:countrydropdown', that.handleCountryDropdownOpen);
        that.dom.addEventListener('close:countrydropdown', that.handleCountryDropdownClose);

        if (_isFunction(onReady)) {
          onReady(instance, IntlTelInput);
        }

        that.setState({
          instance: instance,
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'update', function() {
        var that = _assertThisInitialized(_assertThisInitialized(_this));

        var _that$state = that.state,
          instance = _that$state.instance,
          dialCode = _that$state.dialCode;

        if (!instance || !_isFunction(_get(window, 'intlTelInputGlobals.getCountryData'))) {
          return;
        }

        var country = window.intlTelInputGlobals.getCountryData();

        if (_isArray(country) && country.length > 0) {
          for (var i = 0; i < country.length; i++) {
            if (country[i].dialCode === dialCode) {
              instance.setCountry(country[i].iso2);
              break;
            }
          }
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'unInit', function() {
        var that = _assertThisInitialized(_assertThisInitialized(_this));

        var instance = that.state.instance;

        if (that.dom) {
          that.dom.removeEventListener('countrychange', that.handleCountryChange);
          that.dom.removeEventListener('open:countrydropdown', that.handleCountryDropdownOpen);
          that.dom.removeEventListener('close:countrydropdown', that.handleCountryDropdownClose);
        }

        if (_isFunction(_get(instance, 'destroy'))) {
          instance.destroy();
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'handleCountryChange', function(event) {
        var that = _assertThisInitialized(_assertThisInitialized(_this));

        var instance = that.state.instance;
        var value = that.props.value;

        if (!instance) {
          return;
        }

        var country = instance.getSelectedCountryData();
        var dst = {
          dialCode: country.dialCode,
        };

        if (!value) {
          that.setState(dst);
        }

        that.triggerChange(dst);
        that.forceUpdate();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'handleCountryDropdownOpen', function(
        event
      ) {
        var that = _assertThisInitialized(_assertThisInitialized(_this));

        var onCountryDropdownOpen = that.props.onCountryDropdownOpen;

        if (_isFunction(onCountryDropdownOpen)) {
          onCountryDropdownOpen(event);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'handleCountryDropdownClose', function(
        event
      ) {
        var that = _assertThisInitialized(_assertThisInitialized(_this));

        var onCountryDropdownClose = that.props.onCountryDropdownClose;

        if (_isFunction(onCountryDropdownClose)) {
          onCountryDropdownClose(event);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), 'triggerChange', function(value) {
        var that = _assertThisInitialized(_assertThisInitialized(_this));

        var _that$state2 = that.state,
          dialCode = _that$state2.dialCode,
          phone = _that$state2.phone;
        var onChange = that.props.onChange;

        if (_isFunction(onChange)) {
          onChange(
            _assign(
              {},
              {
                dialCode: dialCode,
                phone: phone,
              },
              value
            )
          );
        }
      });

      _this.dom = null;

      var _value = props.value || {};

      _this.state = {
        instance: null,
        dialCode: _value.dialCode || '',
        phone: _value.phone || '',
      };
      return _this;
    }

    _createClass(ReactIntlTelInput, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var that = this;
          that.init();
        },
      },
      {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState, snapshot) {
          var that = this;
          that.update();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          var that = this;
          that.unInit();
        },
      },
      {
        key: 'render',
        value: function render() {
          var that = this;
          var _that$props2 = that.props,
            className = _that$props2.className,
            inputProps = _that$props2.inputProps,
            value = _that$props2.value;
          var phone = that.state.phone;

          var props = _omit(inputProps, ['ref', 'value', 'onChange']);

          var onChange = function onChange(event) {
            var dst = {
              phone: event.target.value,
            };

            if (!value) {
              that.setState(dst);
            }

            that.triggerChange(dst);
          };

          return React.createElement(
            'div',
            {
              className: className,
            },
            React.createElement(
              'input',
              _extends(
                {
                  ref: function ref(e) {
                    that.dom = e;
                  },
                  type: 'tel',
                  value: phone,
                  onChange: onChange,
                },
                props
              )
            )
          );
        },
      },
    ]);

    return ReactIntlTelInput;
  })(React.Component);

_defineProperty(ReactIntlTelInput, 'defaultProps', {
  className: null,
  inputProps: {},
  intlTelOpts: {},
  // value: {},
  onChange: function onChange() {},
  onReady: function onReady() {},
  onCountryDropdownOpen: function onCountryDropdownOpen() {},
  onCountryDropdownClose: function onCountryDropdownClose() {},
});

module.exports = ReactIntlTelInput;
