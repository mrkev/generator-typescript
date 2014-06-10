/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('typescript generator', function () {
  
  /**
   * Create the generator.
   * @param  {Function} done [description]
   * @return {[type]}        [description]
   */
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('typescript:app', [
        '../../app'
      ]);

      done();
    }.bind(this));
  });

  /**
   * Test1: Create generator with default settings.
   * @param  {Function} done [description]
   * @return {[type]}        [description]
   */
  it('creates expected files on default settings', function (done) {
    var expected = [
      // add files you expect to exist here.
      'gulpfile.js',
      'package.json',
      'app/src/index.ts',
      'app/src/app.ts',
      'app/build/',
      '.jshintrc',
      '.editorconfig'
    ];

    helpers.mockPrompt(this.app, {
      'projectName': 'test-project',
      'tsDest'     : 'app/build',
      'tsSrc'      : 'app/src',
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
