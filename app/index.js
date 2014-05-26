'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var TypescriptGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Typescript generator!'));

    var prompts = [
    {
      type    : 'input',
      name    : 'projectName',
      message : 'First off, how would you like to name this project?',
      default : 'typescript-project-ftw'
    },
    {
      type    : 'list',
      name    : 'moduleType',
      message : 'Would you like to use AMD or CommonJS?',
      choices : [ "CommonJS", "AMD" ],
      default : "CommonJS"
    },

    {
      type    : 'input',
      name    : 'tsDest',
      message : 'Where should it be compiled to?',
      default : "app/build"
    },

    {
      type    : 'input',
      name    : 'tsSrc',
      message : 'Where should your typescript go?',
      default : "app/src"
    },

    {
      type    : 'confirm',
      name    : 'genMaps',
      message : 'And should I generate sourcemaps?',
      default : false
    },

    {
      type    : 'checkbox',
      name    : 'extra',
      message : 'Anything else?',
      choices : [ "Throw in some Bower too", 
                  "JSHint please",
                  "Editorconfig would be nice" ],
      default : []
    },

    ];

    this.prompt(prompts, function (props) {
      this.moduleType  = props.moduleType;
      this.tsSrc       = props.tsSrc;
      this.tsDest      = props.tsDest;
      this.genMaps     = props.genMaps;
      this.projectName = props.projectName;
      this.extra       = props.extra;
      this.genMaps     = props.genMaps;

      this.bower       = props.extra.indexOf("Throw in some Bower too")    != -1;
      this.jshint      = props.extra.indexOf("JSHint please")              != -1;
      this.editorcfg   = props.extra.indexOf("Editorconfig would be nice") != -1;

      // Not prompts
      this.username    = this.user.git.username;
      this.email       = this.user.git.email;

      this.defaultMain = dirFor(this.tsDest) + "/index.js"

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir(dirFor(this.tsSrc));
    this.mkdir(dirFor(this.tsDest));

    this.copy('index.ts', dirFor(this.tsSrc) + '/index.ts');
    this.template('_package.json', 'package.json');
    this.template('_gulpfile.js', 'gulpfile.js');

    if (this.bower) this.template('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    if (this.editorcfg) this.copy('editorconfig', '.editorconfig');
    if (this.jshint)    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = TypescriptGenerator;


// Helper functions

/**
 * Returns path to directory, excluding file, if
 * any.
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
function dirFor (path) {
  if (path.indexOf(".") == -1) return path;
  return path.substring(0, path.lastIndexOf("/"));
}
