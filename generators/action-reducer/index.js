const Generator = require('yeoman-generator'),
      chalk     = require('chalk'),
      _         = require('lodash');

module.exports = class extends Generator {

  prompting () {

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of your action/reducer pair?'
    }, {
      type: 'input',
      name: 'description',
      message: 'Describe this action/reducer pair'
    }];

    return this.prompt(prompts).then((props) => {

      if(props.name.match(/(reducer|action)/i)){
        props.name = props.name.replace(/(reducer|action)/i, '');
      }

      props.camelCase = _.upperFirst(_.camelCase(props.name));
      props.kebabCase = _.kebabCase(props.name);
      props.lowerCase = props.name.toLowerCase().replace(/\s+/gi, '_');
      props.upperCase = _.upperCase(props.name).replace(/\s+/gi, '_');
      props.snakeCase = _.snakeCase(props.name);
      props.titleCase = _.startCase(props.name);

      props.arName = props.name;

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
      this.templatePath(`reducer${config['flow'] ? '.flow' : ''}.js`),
      this.destinationPath(`${this.config.get('srcdir')}/reducers/${name}.js`),
      templateProps
    );

    this.fs.copyTpl(
      this.templatePath(`action${config['flow'] ? '.flow' : ''}.js`),
      this.destinationPath(`${this.config.get('srcdir')}/action/${name}.js`),
      templateProps
    );

  }
};