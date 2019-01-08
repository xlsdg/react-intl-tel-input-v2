'use strict';

module.exports = {
  input: 'src/ReactIntlTelInput.jsx',
  outDir: 'dist',
  // config: '',
  format: ['cjs', 'umd', 'umd-min', 'es'],
  moduleName: 'ReactIntlTelInput',
  global: {
    'react': 'React',
    'intl-tel-input': 'intlTelInput'
  },
  filename: '[name][suffix].js',
  name: 'ReactIntlTelInput',
  // inline: false,
  // cwd: '',
  // external: [
  //   'react',
  //   'intl-tel-input'
  // ],
  banner: false,
  postcss: {
    modules: true
  },
  js: 'babel',
  // plugin: ['vue'],
  target: 'browser',
  jsx: 'react',
  // objectAssign: undefined,
  // exports: 'auto',
  // replace: {},
  // alias: {},
  pretty: true
  // env: {},
  // virtualModules: {},
  // sizeLimit: {},
  // extendOptions: {},
};
