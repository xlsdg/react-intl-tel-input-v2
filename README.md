# react-intl-tel-input-v2

> React component wrap for intl-tel-input

## Installation

```
$ npm install --save intl-tel-input react-intl-tel-input-v2
```

## Usage

``` javascript
import 'intl-tel-input/build/css/intlTelInput.css';
import ReactIntlTelInput from 'react-intl-tel-input-v2';

export default () => {
  const inputProps = {
    placeholder: 'ReactIntlTelInput',
  };

  const intlTelOpts = {
    preferredCountries: ['cn'],
  };

  const value = { dialCode: '86', phone: '12345678901' };

  const onChange = value => console.log(value);
  const onReady = (instance, IntlTelInput) => console.log(instance, IntlTelInput);

  return (
    <ReactIntlTelInput
      inputProps={inputProps}
      intlTelOpts={intlTelOpts}
      value={value}
      onChange={onChange}
      onReady={onReady}
    />
  );
}
```

## propTypes

``` javascript
className:                PropTypes.string,
inputProps:               PropTypes.object,
intlTelOpts:              PropTypes.object,
value:                    PropTypes.object,
onChange:                 PropTypes.func,
onReady:                  PropTypes.func,
onCountryDropdownOpen:    PropTypes.func,
onCountryDropdownClose:   PropTypes.func,
```

[intlTelOpts](https://github.com/jackocnr/intl-tel-input#options)

## defaultProps

``` javascript
className: null,
inputProps: {},
intlTelOpts: {},
onChange: () => {},
onReady: () => {},
onCountryDropdownOpen: () => {},
onCountryDropdownClose: () => {},
```

# License

MIT
