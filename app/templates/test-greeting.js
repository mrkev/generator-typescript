/* global describe, it, beforeEach */
'use strict';
var assert = require('assert');



describe('typescript project', function () {

  beforeEach(function () {
    
    // Intercept console.log
    this.result = '';
    console.log = function (messge) {
      this.result = messge;
    };

  });

  /**
   * Test 1: Project is successfully compiled, and can be imported.
   */
  it('can be imported without blowing up.', function () {
    var app = require('../app/build');
    assert(app !== undefined);
  });

  /**
   * Test 2: Default greeter works.
   */
  it('constructs a hello world app.', function () {
    var expected = 'Hello, world!';
    var app = new require('../app/build').defaultInstance;

    app.greet();
    assert.equal(expected, this.result);
    
  });

  /**
   * Test 2: Create generator with default settings.
   */
  it('greets as expected.', function () {
    var expected = 'Whatup, world!';
    var app = new require('../app/build').Controller('Whatup');

    app.greet();
    assert.equal(expected, this.result);
  });
});
