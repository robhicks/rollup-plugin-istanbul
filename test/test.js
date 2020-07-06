var rollup = require('rollup');
var plugin = require( '../index.js' );
const { expect } = require('chai');

process.chdir( __dirname );

describe('rollup-plugin-istanbul', function () {
  this.timeout(15000);

  it('should transforms code through babel-plugin-istanbul', async function () {
    const bundle = await rollup.rollup({
      input: 'fixtures/main.js',
      plugins: [ plugin() ]
    });
    const g = await bundle.generate({format: 'es', name: 'myUtils'});
    expect(g).to.exist;
    expect(g.output).to.be.an('array');
  });

  it.only('should handle exclude files', async function () {
    const bundle = await rollup.rollup({
      input: 'fixtures/main.js',
      plugins: [ plugin() ]
    });
    const g = await bundle.generate({format: 'es'});
    console.log(`g`, g)
  });

  it.skip('adds the file name properly', async function () {
    const bundle = await rollup.rollup({
      input: 'fixtures/main.js',
      plugins: [ plugin() ],
      globals: {
        foo: 'foo'
      }
    });
    const g = await bundle.generate({format: 'iife', name: 'myUtils'});
    const { code } = g;
    console.log(`code`, code)
    // .then( function ( bundle ) {
    //   return bundle.generate({format: 'iife', name: 'myUtils'});
    // }).then(generated => {
    //   var code = generated.code;
    //   assert.ok(code.indexOf('fixtures/main.js') !== -1, code);
    // });
  });
});
