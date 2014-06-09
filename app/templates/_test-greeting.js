/* global describe, it, beforeEach */
'use strict'; require('typescript-require');
var assert  = require('assert');



describe('typescript greeter', function () {
  var self = this;


  beforeEach(function () {
    self.result = '';

    self.testView = {
      display : function (msg) {
        self.result = msg;
      }
    };

    self.App = require('../<%= tsDest %>').App;
  });

  /**
   * Test 1: Default greeter works.
   */
  it('constructs a hello world app', function () {
    console.dir(self.App);

    var expected = 'Hello, world!';
    var app = self.App.defaultGreeter(self.testView);
    console.dir(app.greet);

    app.greet();
    assert.equal(expected, self.result);
  });

  /**
   * Test 2: Create generator with default settings.
   */
  it('greets as expected', function () {
    var expected = 'Whatup, world!';
    var app = new self.App.Controller("Whatup", self.testView);

    app.greet();
    assert.equal(expected, self.result);
  });
});