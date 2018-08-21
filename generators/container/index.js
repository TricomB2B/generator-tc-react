const Generator = require('yeoman-generator'),
      chalk     = require('chalk'),
      _         = require('lodash');

module.exports = class extends Generator {

  prompting () {

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of your container?'
    }, {
      type: 'input',
      name: 'description',
      message: 'Describe this container'
    }, {
      type: 'input',
      name: 'dir',
      message: 'Where would you like to install? (Relative to the `containers` dir)',
    }, {
      type: 'confirm',
      name: 'router',
      message: 'Does this container need to access router properties?',
      default: false
    }];

    if(this.config.get('redux')){
      prompts.push({
        type: 'confirm',
        name: 'reduxDispatch',
        message: 'Does this container access redux state or dispatch?',
        default: true
      });
    }

    return this.prompt(prompts).then((props) => {

      if(props.name.match(/(container)/i)){
        props.name = props.name.replace(/(container)/i, '');
      }

      props.camelCase = _.upperFirst(_.camelCase(props.name));
      props.kebabCase = _.kebabCase(props.name);
      props.lowerCase = props.name.toLowerCase().replace(/\s+/gi, '_');
      props.upperCase = _.upperCase(props.name).replace(/\s+/gi, '_');
      props.snakeCase = _.snakeCase(props.name);

      props.containerName = props.name;

      this.props = props;

    });

  }

  writing () {

    const props = this.props,
      config = this.config.getAll(),
      name = props[config['dirnaming']],
      templateProps = {
        ...config,
        ...props
      };

    // Replace beginning and ending slashes in dirnames
    let dir = _[config['dirnaming']](this.props.dir.replace(/(^\/|\/$)/gm, '')).replace(/\s+/gm, '');

    if(config['dirnaming'] === 'camelCase'){
      dir = _.upperFirst(dir);
    }

    this.fs.copyTpl(
      this.templatePath(`container${config['flow'] ? '.flow' : ''}.js`),
      this.destinationPath(`${this.config.get('srcdir')}/containers/${dir}/${name}/${name}.jsx`),
      templateProps
    );

    if(this.config.get('testing')) {
      this.fs.copyTpl(
        this.templatePath('container.test.js'),
        this.destinationPath(`${this.config.get('srcdir')}/containers/${dir}/${name}/${name}.test.js`),
        templateProps
      );
    }

  }
};