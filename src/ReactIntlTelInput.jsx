import React from 'react';
// import PropTypes from 'prop-types';
// import _ from 'lodash-es';
import _get from 'lodash-es/get';
import _omit from 'lodash-es/omit';
import _assign from 'lodash-es/assign';
import _isArray from 'lodash-es/isArray';
import _isFunction from 'lodash-es/isFunction';
import IntlTelInput from 'intl-tel-input';

export default class ReactIntlTelInput extends React.Component {
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

  static defaultProps = {
    className: null,
    inputProps: {},
    intlTelOpts: {},
    // value: {},
    onChange: () => {},
    onReady: () => {},
    onCountryDropdownOpen: () => {},
    onCountryDropdownClose: () => {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value) {
      return {
        ...(nextProps.value || {}),
      };
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.dom = null;

    const value = props.value || {};
    this.state = {
      instance: null,
      iso2: value.iso2 || '',
      dialCode: value.dialCode || '',
      phone: value.phone || '',
    };
  }

  componentDidMount() {
    const that = this;
    that.init();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const that = this;
    that.update();
  }

  componentWillUnmount() {
    const that = this;
    that.unInit();
  }

  init = () => {
    const that = this;
    const { intlTelOpts, onReady } = that.props;

    if (!that.dom) {
      return;
    }

    const instance = IntlTelInput(that.dom, intlTelOpts);

    that.dom.addEventListener('countrychange', that.handleCountryChange);
    that.dom.addEventListener('open:countrydropdown', that.handleCountryDropdownOpen);
    that.dom.addEventListener('close:countrydropdown', that.handleCountryDropdownClose);

    if (_isFunction(onReady)) {
      onReady(instance, IntlTelInput);
    }

    that.setState({
      instance,
    });
  };

  update = () => {
    const that = this;
    const { instance, iso2, dialCode } = that.state;

    if (!_isFunction(_get(instance, 'setCountry'))) {
      return;
    }

    if (iso2) {
      return instance.setCountry(iso2);
    }

    if (!dialCode || !_isFunction(_get(window, 'intlTelInputGlobals.getCountryData'))) {
      return;
    }

    const country = window.intlTelInputGlobals.getCountryData();
    if (_isArray(country) && country.length > 0) {
      for (let i = 0; i < country.length; i++) {
        if (country[i].dialCode === dialCode) {
          return instance.setCountry(country[i].iso2);
        }
      }
    }
  };

  unInit = () => {
    const that = this;
    const { instance } = that.state;

    if (that.dom) {
      that.dom.removeEventListener('countrychange', that.handleCountryChange);
      that.dom.removeEventListener('open:countrydropdown', that.handleCountryDropdownOpen);
      that.dom.removeEventListener('close:countrydropdown', that.handleCountryDropdownClose);
    }

    if (_isFunction(_get(instance, 'destroy'))) {
      instance.destroy();
    }
  };

  handleCountryChange = event => {
    const that = this;
    const { instance } = that.state;
    const { value } = that.props;

    if (!instance) {
      return;
    }

    const country = instance.getSelectedCountryData();
    const dst = {
      iso2: country.iso2,
      dialCode: country.dialCode,
    };

    if (!value) {
      that.setState(dst);
    }

    that.triggerChange(dst);
    that.forceUpdate();
  };

  handleCountryDropdownOpen = event => {
    const that = this;
    const { onCountryDropdownOpen } = that.props;

    if (_isFunction(onCountryDropdownOpen)) {
      onCountryDropdownOpen(event);
    }
  };

  handleCountryDropdownClose = event => {
    const that = this;
    const { onCountryDropdownClose } = that.props;

    if (_isFunction(onCountryDropdownClose)) {
      onCountryDropdownClose(event);
    }
  };

  triggerChange = value => {
    const that = this;
    const { iso2, dialCode, phone } = that.state;
    const { onChange } = that.props;

    if (_isFunction(onChange)) {
      onChange(
        _assign(
          {},
          {
            iso2,
            dialCode,
            phone,
          },
          value
        )
      );
    }
  };

  render() {
    const that = this;
    const { className, inputProps, value } = that.props;
    const { phone } = that.state;

    const props = _omit(inputProps, ['ref', 'value', 'onChange']);

    const onChange = event => {
      const dst = {
        phone: event.target.value,
      };

      if (!value) {
        that.setState(dst);
      }

      that.triggerChange(dst);
    };

    return (
      <div className={className}>
        <input
          ref={e => {
            that.dom = e;
          }}
          type="tel"
          value={phone}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  }
}
