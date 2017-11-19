'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the flawless ' + chalk.red('generator-yeoman-test') + ' generator!'
      )
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then((Props) => {
      // To access props later use this.props.someAnswer;
      this.props = Props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt'),
      { title: 'Templating with Yeoman test' }
    );
  }

  install() {
    this.installDependencies({
      bower: true,
      npm: true,
      yarn: false,
      callback: function () {
        this.log('Everything is ready!');
      }});
  }
};
