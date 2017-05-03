'use strict';
//var util = require('util');
const yosay = require('yosay');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');

/////////////////////////////// Helper functions ///////////////////////////////

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
  const adj = ['awesome', 'marvelous', 'fantastic', 'mathematical', 'algebraic'];
  const sub = ['project', 'madness', 'goodness', 'awesomeness', 'coolness', 'typescriptness'];
  return adj[Math.floor(Math.random()*adj.length)] + '-typescript-' + sub[Math.floor(Math.random()*sub.length)];
}

////////////////////////////////// Generator! //////////////////////////////////

module.exports = class extends Generator {

  prompting() {

    // Have Yeoman greet the user.
    this.log(yosay('Let\'s make some awesome typescript project!'));
    this.log('I will include', chalk.green('JSHint'), 'and', chalk.red('Editorconfig'), 'by default.');

    this.extfeat = {'Throw in some Bower too' : 'bower'};

    const prompts = [
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

    return this.prompt(prompts).then(props => {
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

      this.defaultMain = dirFor(this.tsDest) + '/index.js'
    })
  }

  autocopy () {
    [].slice.call(arguments).forEach(file => {
      // A template
      if (file[0] === '_') {
        this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath(file.substring(1)),
          this
        )
      } 

      // a normal file
      else {
        this.fs.copy(
          this.templatePath(file),
          this.destinationPath(file)
        )
      }
    })
  }


  writing () {
    // Folders
    mkdirp.sync(dirFor(this.tsSrc));
    mkdirp.sync(dirFor(this.tsDest));

    this.autocopy('index.ts', 'app.ts', 'tslint.json')

    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    )

    this.fs.copy(
      this.templatePath('jshintrc'),
      this.destinationPath('.jshintrc')
    )

    this.autocopy('_package.json', '_gulpfile.js', '_README.md')

    // Tests
    mkdirp.sync('test');
    this.fs.copyTpl(
      this.templatePath('_test-greeting.js'),
      this.destinationPath('test/test-greeting.js'),
      this
    )
    this.fs.copyTpl(
      this.templatePath('_test-load.js'),
      this.destinationPath('test/test-load.js'),
      this
    )

    if (this.bower) { this.autocopy('_bower.json'); }

  }

  install () { this.installDependencies() }
};
