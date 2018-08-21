const Generator = require('yeoman-generator'),
      chalk     = require('chalk'),
      _         = require('lodash');

module.exports = class extends Generator {
  prompting () {
    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of your middleware?'
    }];

    return this.prompt(prompts).then((props) => {

      if(props.name.match(/(middleware)/i)){
        props.name = props.name.replace(/(middleware)/i, '');
      }

      props.camelCase = _.upperFirst(_.camelCase(props.name));
      props.kebabCase = _.kebabCase(props.name);
      props.lowerCase = props.name.toLowerCase().replace(/\s+/gi, '_');
      props.upperCase = _.upperCase(props.name).replace(/\s+/gi, '_');
      props.snakeCase = _.snakeCase(props.name);
      props.titleCase = _.startCase(props.name);

      props.middlewareName = props.name;

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

    this.fs.copyTpl(
      this.templatePath(`middleware${config.flow ? '.flow' : ''}.js`),
      this.destinationPath(`${this.config.get('srcdir')}/middleware/${name}.jsx`),
      templateProps
    );

  }
};