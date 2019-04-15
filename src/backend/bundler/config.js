const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')

module.exports = {
  external: [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'react-router',
    'react-router-dom',
    'styled-components',
    'prop-types',
    'admin-bro',
    'admin-bro/components',
    'admin-bro/style',
    'axios',
    'bloomer',
  ],
  globals: {
    react: 'React',
    redux: 'Redux',
    axios: 'axios',
    bloomer: 'Bloomer',
    'styled-components': 'styled',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes',
    'react-redux': 'ReactRedux',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    'admin-bro': 'AdminBro',
    'admin-bro/components': 'AdminBro.Components',
    'admin-bro/style': 'AdminBro.style',
  },
  plugins: (babelConfig = {}) => [
    resolve({
      extensions: ['.mjs', '.js', '.jsx', '.json'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.IS_BROWSER': 'true',
    }),
    commonjs(),
    babel({
      presets: [require.resolve('@babel/preset-react'), require.resolve('@babel/preset-env')],
      ...babelConfig,
    }),
  ],
}