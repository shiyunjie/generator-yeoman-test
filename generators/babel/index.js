/**
 * Created by shiyunjie on 17/11/19.
 */
'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');

// const chalk = require('chalk');
// const yosay = require('yosay');
// Var utils = require('../utils')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('react', {
      type: Boolean,
      desc: 'need to use React or not.',
      defaults: false
    });
    this.option('cli', {
      type: Boolean,
      desc: 'need cli for babel (enable it when writing a library)'
    });
  }

  prompting() {
    if (_.isUndefined(this.options.cli)) {
      var done = this.async();

      this.prompt(
        {
          type: 'confirm',
          name: 'needCli',
          message: 'need cli for babel? (enable it when writing a library)',
          default: false
        },
        (answer) => {
          this.options.cli = answer.needCli;
          done();
        }
      );
    }
  }
  writing() {
    var content = this.fs.readJSON(this.destinationPath('.babelrc'), {});
    this.fs.writeJSON(this.destinationPath('.babelrc'), content);

    var pkgFile = this.destinationPath('package.json');
    var deps = {
      'babel-core': '^6.5.1',
      'babel-preset-es2015': '^6.5.0',
      'babel-preset-stage-0': '^6.5.0'
    };
    if (this.options.react) deps['babel-preset-react'] = '^6.5.0';
    if (this.options.cli) {
      deps['babel-cli'] = '^6.5.1';
    }

    var pkg = {
      devDependencies: deps
    };
    if (this.options.cli) {
      pkg.scripts = {
        prepublish: 'babel ./src/ -d ./lib'
      };
    }
    this.fs.writeJSON(pkgFile, pkg);
  }

  install() {
    this.npmInstall(['lodash'], { saveDev: true });
  }
};
