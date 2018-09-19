const Generator = require('yeoman-generator'),
      chalk     = require('chalk'),
      _         = require('lodash'),
      yosay     = require('yosay');

module.exports = class extends Generator {

  initializing () {

    this.log(yosay(
      `Welcome to the ${chalk.red('TricomB2B')} React generator! 
      The following questions will help define the configuration for your app.`
    ));

  }

  prompting () {

    const prompts = [{
      type: 'confirm',
      name: 'redux',
      message: 'Are you using redux?',
      default: false
    }, {
      type: 'confirm',
      name: 'flow',
      message: 'Are you using flow?',
      default: false
    }, {
      type: 'confirm',
      name: 'testing',
      message: 'Are you using testing your components?',
      default: false
    }, {
      type: 'input',
      name: 'srcdir',
      message: 'Path to src directory from root',
      default: 'src'
    }, {
      type: 'list',
      name: 'dirnaming',
      message: 'How would you like directory/component names to be handled?',
      choices: [
        {
          name: 'Camel Case (CamelCase)',
          value: 'camelCase'
        },
        {
          name: 'Kebab Case (kebab-case)',
          value: 'kebabCase'
        },
        {
          name: 'Lower Case (lowercase)',
          value: 'lowerCase'
        },
        {
          name: 'Snake Case (snake_case)',
          value: 'snakeCase'
        }
      ],
      default: 'camelcase'
    }, {
      type: 'input',
      name: 'user_name',
      message: 'What is your full name?'
    }, {
      type: 'input',
      name: 'email',
      message: 'What is your email?'
    }];

    return this.prompt(prompts).then((props) => {

      this.props = props;

    });

  }

  // Writing Queue
  writing () {

    this.props.srcdir = this.props.srcdir.replace(/(^\/|\/$)/gm, '');

    this.config.set(this.props);

  }

  // End Queue
  end () {

    this.log(chalk.green('Your configurations have been saved!'));

    this.log('The following methods are available using this generator:');
    this.log(chalk.green('yo tc-react:action (Redux Action)'));
    this.log(chalk.green('yo tc-react:action-reducer (Redux Action-reducer pair)'));
    this.log(chalk.green('yo tc-react:component (Component)'));
    this.log(chalk.green('yo tc-react:container (Container)'));
    this.log(chalk.green('yo tc-react:middleware (Middleware for router)'));
    this.log(chalk.green('yo tc-react:reducer (Redux reducer)'));
    this.log(chalk.green('yo tc-react:wrapper (HOCs)'));

  }
};
