'use strict';
//var util = require('util');
//var path = require('path');
var yosay = require('yosay');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');

/*
 *
 * Helper functions
 * 
 */


/**
 * Returns path to directory, excluding file, if
 * any.
 * @param  {String} path [description]
 * @return {String}      [description]
 */
function dirFor (path) {
  if (path.indexOf('.') === -1) { return path; } 
  return path.substring(0, path.lastIndexOf('/'));
}

/**
 * Generates an algebraic project name
 * @return {String} Mathematical title
 */
function genProjName () {
  var adj = ['awesome', 'marvelous', 'fantastic', 'mathematical', 'algebraic'];
  var sub = ['project', 'madness', 'goodness', 'awesomeness', 'coolness', 'typescriptness'];
  return adj[Math.floor(Math.random()*adj.length)] + '-typescript-' + sub[Math.floor(Math.random()*sub.length)];
}


/*
 * 
 * The deal
 * 
 */


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
    this.log(yosay('Let\'s make some awesome typescript project!'));
    this.log('I will include', chalk.green('JSHint'), 'and', chalk.red('Editorconfig'), 'by default.');

    this.extfeat = {'Throw in some Bower too' : 'bower'};

    var prompts = [
    {
      type    : 'input',
      name    : 'projectName',
      message : 'First off, how would you like to name this project?',
      default : genProjName()
    },

    /*
    {
      type    : 'list',
      name    : 'moduleType',
      message : 'Would you like to use AMD or CommonJS?',
      choices : [ 'CommonJS', 'AMD' ],
      default : 'CommonJS'
    },
    */

    {
      type    : 'input',
      name    : 'tsDest',
      message : 'Where should it be compiled to?',
      default : 'app/build'
    },

    {
      type    : 'input',
      name    : 'tsSrc',
      message : 'Where should your typescript go?',
      default : 'app/src'
    }

    ];

    this.prompt(prompts, function (props) {
      this.moduleType  = 'commonjs'; //props.moduleType.toLowerCase();
      this.tsSrc       = props.tsSrc;
      this.tsDest      = props.tsDest;
      this.genMaps     = props.genMaps;
      this.projectName = props.projectName.replace(' ', '-');
      this.extra       = props.extra;
      this.genMaps     = props.genMaps;

      if (props.extra !== undefined) {
        for (var i = 0; i < props.extra.length; i++) {
          switch (this.extfeat[i]) {
            case 'bower'    : {this.bower     = true; } break;
            case 'jshint'   : {this.jshint    = true; } break;
            case 'editorcfg': {this.editorcfg = true; } break;
          }
        }
      }


      // Not prompts
      this.username    = this.user.git.username;
      this.email       = this.user.git.email;

      this.defaultMain = dirFor(this.tsDest) + '/index.js';

      done();
    }.bind(this));
  },

  app: function () {
    // Folders
    mkdirp.sync(dirFor(this.tsSrc));
    mkdirp.sync(dirFor(this.tsDest));

    // Files
    this.copy('index.ts', dirFor(this.tsSrc) + '/index.ts');
    this.copy('app.ts'  , dirFor(this.tsSrc) + '/app.ts'  );

    this.copy('tslint.json', 'tslint.json');

    this.template('_package.json', 'package.json');
    this.template('_gulpfile.js', 'gulpfile.js');

    // Tests
    mkdirp.sync('test');
    this.template('_test-greeting.js', 'test/test-greeting.js');
    this.template('_test-load.js', 'test/test-load.js');

    // Readme
    this.template('_README.md', 'README.md');
  },

  projectfiles: function () {
    if (this.bower) { this.template('_bower.json', 'bower.json'); }
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc'    , '.jshintrc');
  }



});

module.exports = TypescriptGenerator;