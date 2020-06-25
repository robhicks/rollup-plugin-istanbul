var assert = require('assert');
var rollup = require('rollup');
var istanbulPlugin = require( '..' );
const { expect } = require('chai');

process.chdir( __dirname );

describe('rollup-plugin-istanbul', function () {
  this.timeout(15000);

  it('transforms code through istanbul instrumenter', function () {
    return rollup.rollup({
      input: 'fixtures/main.js',
      plugins: [ istanbulPlugin() ]
    }).then( function ( bundle ) {
      console.log('bundle', bundle);
      return bundle.generate({format: 'iife'});
    }).then(generated => {
      var code = generated.code;
      console.log('code', code);
      // assert.ok(code.indexOf('coverage[path]') !== -1, code);
    });
  });

  it('adds the file name properly', function () {
    return rollup.rollup({
      input: 'fixtures/main.js',
      plugins: [ istanbulPlugin() ],
      globals: {
        whatever: 'whatever'
      }
    }).then( function ( bundle ) {
      return bundle.generate({format: 'iife'});
    }).then(generated => {
      var code = generated.code;
      assert.ok(code.indexOf('fixtures/main.js') !== -1, code);
    });
  });
});
