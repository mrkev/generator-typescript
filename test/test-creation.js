
/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('typescript:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp'))
      .withOptions({ 'skip-install': true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'gulpfile.js',
      'package.json',
      'app/src/index.ts',
      'app/src/app.ts',
      'app/build/',
      '.jshintrc',
      '.editorconfig',
      'tslint.json'
    ]);
  });
});
