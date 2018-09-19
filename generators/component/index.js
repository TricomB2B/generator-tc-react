const Generator = require ('yeoman-generator'),
      chalk     = require ('chalk'),
      _         = require ('lodash');

module.exports = class extends Generator {

  prompting () {

    if (!this.config.getAll ().hasOwnProperty ('user_name')) {
      this.log (`${chalk.red ('Please run the configuration first.')} ${chalk.green ('yo tc-react')}`);
      return false;
    }

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of your component?'
    }, {
      type: 'input',
      name: 'description',
      message: 'Describe this component'
    }, {
      type: 'input',
      name: 'dir',
      message: 'Where would you like to install? (Relative to the `components` dir)',
    }, {
      type: 'confirm',
      name: 'router',
      message: 'Does this component need to access router properties?',
      default: false
    }, {
      type: 'confirm',
      name: 'styling',
      message: 'Does this component need styling?',
      default: true
    }];

    if (this.config.get ('redux')) {
      prompts.push ({
        type: 'confirm',
        name: 'reduxDispatch',
        message: 'Does this component access redux state or dispatch?',
        default: true
      });
    }

    return this.prompt (prompts).then ((props) => {

      if (props.name.match (/(component)/i)) {
        props.name = props.name.replace (/(component)/i, '');
      }

      props.camelCase = _.upperFirst (_.camelCase (props.name));
      props.kebabCase = _.kebabCase (props.name);
      props.lowerCase = props.name.toLowerCase ().replace (/\s+/gi, '_');
      props.upperCase = _.upperCase (props.name).replace (/\s+/gi, '_');
      props.snakeCase = _.snakeCase (props.name);

      props.componentName = props.name;

      this.props = props;

    });

  }

  writing () {

    console.log (this.props);
    const props         = this.props,
          config        = this.config.getAll (),
          name          = props[config['dirnaming']],
          templateProps = {
            ...config,
            ...props
          };

    // Replace beginning and ending slashes in dirnames
    let dir = _[config['dirnaming']] (this.props.dir.replace (/(^\/|\/$)/gm, '')).replace (/\s+/gm, '');

    if (config['dirnaming'] === 'camelCase') {
      dir = _.upperFirst (dir);
    }

    this.fs.copyTpl (
      this.templatePath (`component${config['flow'] ? '.flow' : ''}.js`),
      this.destinationPath (`${this.config.get ('srcdir')}/components/${dir}/${name}/${name}.jsx`),
      templateProps
    );

    if (this.config.get ('testing')) {
      this.fs.copyTpl (
        this.templatePath ('component.test.js'),
        this.destinationPath (`${this.config.get ('srcdir')}/components/${dir}/${name}/${name}.test.js`),
        templateProps
      );
    }

    if (this.props.styling) {
      this.fs.copyTpl (
        this.templatePath ('style.scss'),
        this.destinationPath (`${this.config.get ('srcdir')}/components/${dir}/${name}/${name}.scss`),
        templateProps
      );
    }

  }
};