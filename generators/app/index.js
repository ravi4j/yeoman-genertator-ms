'use strict';
var util = require('util');
var path = require('path');
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');

var msGenerator = module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    this.option('babel'); 
  }

  async prompting() {
    console.log(chalk.yellow('\nWelcome to the Micro Sevice Generator\n\nLets get started!\n\n'));
    var prompts = [
      {
        type: 'string',
        name: 'bootVersion',
        message: 'Enter Spring Boot version:',
        default: '1.4.1.RELEASE'
      }, {
        type: 'string',
        name: 'packageName',
        message: 'Enter default package name:',
        default: 'com.companyName'
      }, {
        type: 'string',
        name: 'baseName',
        message: 'Enter base name of app:',
        default: 'app'
      }, {
        type: 'string',
        name: 'javaVersion',
        message: 'Enter Java version:',
        default: '1.8'
      }, {
        type: 'checkbox',
        name: 'packagingType',
        message: 'Package type:',
        choices: [
          {
            name: 'Jar',
            value: 'jar'
          }, {
            name: 'War',
            value: 'war'
          }
        ]
      }, {
        type: 'checkbox',
        name: 'buildTool',
        message: 'Select build tool:',
        choices: [
          {
            name: 'Gradle',
            value: 'gradle'
          }, {
            name: 'Maven',
            value: 'maven'
          }
        ]
      }, {
        type: 'checkbox',
        name: 'coreWeb',
        message: 'Select Core/Web Dependencies:',
        choices: [
          {
            name: 'Web',
            value: 'web'
          }, {
            name: 'Jetty (Tomcat will be uninstalled)',
            value: 'jetty'
          }, {
            name: 'Security',
            value: 'security'
          }, {
            name: 'AOP',
            value: 'aop'
          }, {
            name: 'Websocket',
            value: 'websocket'
          }, {
            name: 'Jersey (JAX-RS)',
            value: 'jersey'
          }, {
            name: 'Rest Repositories',
            value: 'rest'
          }, {
            name: 'Hypermedia (HATEOAS)',
            value: 'hateoas'
          }, {
            name: 'Mobile',
            value: 'mobile'
          }, {
            name: 'REST Docs',
            value: 'restdocs'
          }
        ]
      }, {
        type: 'checkbox',
        name: 'templates',
        message: 'Select Template Engine:',
        choices: [
          {
            name: 'Thymeleaf',
            value: 'thymeleaf'
          }, {
            name: 'Groovy Templates',
            value: 'gtemplates'
          }, {
            name: 'Mustache',
            value: 'mustache'
          }
        ]
      }, {
        type: 'checkbox',
        name: 'data',
        message: 'Select Data support:',
        choices: [
          {
            name: 'Jdbc',
            value: 'jdbc'
          }, {
            name: 'JPA',
            value: 'jpa'
          }, {
            name: 'MongoDB',
            value: 'mongodb'
          }, {
            name: 'Redis',
            value: 'redis'
          }, {
            name: 'Solr',
            value: 'solr'
          }, {
            name: 'Elasticsearch',
            value: 'elasticsearch'
          }
        ]
      }, {
        type: 'checkbox',
        name: 'database',
        message: 'Select Database support:',
        choices: [
          {
            name: 'H2',
            value: 'h2'
          }, {
            name: 'HSQLDB',
            value: 'hsqldb'
          }, {
            name: 'Apache Derby',
            value: 'derby'
          }, {
            name: 'MySQL',
            value: 'mysql'
          }, {
            name: 'PostgreSQL',
            value: 'postgresql'
          }
        ]
      }, {
        type: 'checkbox',
        name: 'cloud',
        message: 'Select Spring Cloud support:',
        choices: [
          {
            name: 'Cloud Connectors',
            value: 'connectors'
          }, {
            name: 'Cloud Bootstrap',
            value: 'bootstrap'
          }, {
            name: 'Config Client',
            value: 'configClient'
          }, {
            name: 'Config Server',
            value: 'configServer'
          }, {
            name: 'Eureka',
            value: 'eureka'
          }, {
            name: 'Eureka Server',
            value: 'eurekaServer'
          }, {
            name: 'Feign',
            value: 'feign'
          }, {
            name: 'Hystrix',
            value: 'hystrix'
          }, {
            name: 'Hystrix Dashboard',
            value: 'hystrixDashboard'
          }, {
            name: 'OAuth2',
            value: 'oauth2'
          }, {
            name: 'Ribbon',
            value: 'ribbon'
          }, {
            name: 'Turbine',
            value: 'turbine'
          }, {
            name: 'Turbine AMQP',
            value: 'turbineAmqp'
          }, {
            name: 'Zuul',
            value: 'zuul'
          }, {
            name: 'AWS',
            value: 'aws'
          }, {
            name: 'AWS JDBC',
            value: 'awsJdbc'
          }, {
            name: 'AWS Messaging',
            value: 'awsMessaging'
          }, {
            name: 'Cloud Bus AMQP',
            value: 'cloudBus'
          }, {
            name: 'Cloud Security',
            value: 'cloudSecurity'
          }
        ]
      }, {
        type: 'checkbox',
        name: 'io',
        message: 'Select I/O support:',
        choices: [
          {
            name: 'Batch',
            value: 'batch'
          }, {
            name: 'Integration',
            value: 'integration'
          }, {
            name: 'JMS (HornetQ)',
            value: 'jms'
          }, {
            name: 'AMQP',
            value: 'amqp'
          }, {
            name: 'Mail',
            value: 'mail'
          }
        ]
      }, {
        type: 'checkbox',
        name: 'social',
        message: 'Select Social APIs:',
        choices: [
          {
            name: 'Facebook',
            value: 'facebook'
          }, {
            name: 'LinkedIn',
            value: 'linkedin'
          }, {
            name: 'Twitter',
            value: 'twitter'
          }
        ]
      }, {
        type: 'checkbox',
        name: 'ops',
        message: 'Select OPS tools:',
        choices: [
          {
            name: 'Actuator',
            value: 'actuator'
          }, {
            name: 'Remote Shell',
            value: 'remoteshell'
          }
        ]
      }, {
        type: 'confirm',
        name: 'useSpock',
        message: 'Use Spock?',
        default: true
      }, {
        type: 'string',
        name: 'groovyVersion',
        message: 'Enter Groovy version:',
        default: '2.4.4'
      }
    ];
 
   this.answers = await this.prompt(prompts, function (props) {
      this.bootVersion = props.bootVersion;
      this.packageName = props.packageName;
      this.baseName = props.baseName;
      this.javaVersion = props.javaVersion;
      this.packagingType = props.packagingType;
      this.coreWeb = props.coreWeb;
      this.templates = props.templates;
      this.data = props.data;
      this.database = props.database;
      this.cloud = props.cloud;
      this.io = props.io;
      this.social = props.social;
      this.ops = props.ops;
      this.useSpock = props.useSpock;
      this.groovyVersion = props.groovyVersion;
      this.buildTool = props.buildTool;
      
      // Spring Cloud
      prompts.push({
        type: 'string',
        name: 'usesCloud',
        message: 'usesCloud',
        default: false
      });
      
    }.bind(this));
  }

  _buildAnswerContext(props){
    var results = {};
    results['bootVersion'] = props.bootVersion;
    results['packageName'] = props.packageName;
    results['baseName'] = props.baseName;
    results['javaVersion'] = props.javaVersion;
    results['packagingType'] = props.packagingType;
    results['coreWeb'] = props.coreWeb;
    results['templates'] = props.templates;
    results['data'] = props.data;
    results['database'] = props.database;
    results['cloud'] = props.cloud;
    results['io'] = props.io;
    results['social'] = props.social;
    results['ops'] = props.ops;
    results['useSpock'] = props.useSpock;
    results['groovyVersion'] = props.groovyVersion;
    results['buildTool'] = props.buildTool;
    // Packaging Type
    var hasPackagingType = function (packagingTypeStarter) {
      return props.packagingType.indexOf(packagingTypeStarter) !== -1;
    };
    results['jar'] = hasPackagingType('jar');
    results['war'] = hasPackagingType('war');

    // Core/Web
    var hasCoreWeb = function (coreWebStarter) {
      return props.coreWeb.indexOf(coreWebStarter) !== -1;
    };
    results['web'] = hasCoreWeb('web');
    results['jetty'] = hasCoreWeb('jetty');
    results['security'] = hasCoreWeb('security');
    results['aop'] = hasCoreWeb('aop');
    results['websocket'] = hasCoreWeb('websocket');
    results['jersey'] = hasCoreWeb('jersey');
    results['rest'] = hasCoreWeb('rest');
    results['hateoas'] = hasCoreWeb('hateoas');
    results['mobile'] = hasCoreWeb('mobile');
    results['restdocs'] = hasCoreWeb('restdocs');

    // Template Engines
    var hasTemplate = function (templateStarter) {
      return props.templates.indexOf(templateStarter) !== -1;
    };
    results['thymeleaf'] = hasTemplate('thymeleaf');
    results['gtemplates'] = hasTemplate('gtemplates');
    results['mustache'] = hasTemplate('mustache');

    // Spring Data
    var hasData = function (dataStarter) {
      return props.data.indexOf(dataStarter) !== -1;
    };
    results['jdbc'] = hasData('jdbc');
    results['jpa'] = hasData('jpa');
    results['mongodb'] = hasData('mongodb');
    results['redis'] = hasData('redis');
    results['gemfire'] = hasData('gemfire');
    results['solr'] = hasData('solr');
    results['elasticsearch'] = hasData('elasticsearch');

    // Databases
    var hasDatabase = function (databaseStarter) {
      return props.database.indexOf(databaseStarter) !== -1;
    };
    results['h2'] = hasDatabase('h2');
    results['hsqldb'] = hasDatabase('hsqldb');
    results['derby'] = hasDatabase('derby');
    results['mysql'] = hasDatabase('mysql');
    results['postgresql'] = hasDatabase('postgresql');

    
    var hasCloud = function (cloudStarter) {
      return props.cloud.indexOf(cloudStarter) !== -1;
    };
    results['connectors'] = hasCloud('connectors');
    results['bootstrap'] = hasCloud('bootstrap');
    results['configClient'] = hasCloud('configClient');
    results['configServer'] = hasCloud('configServer');
    results['eureka'] = hasCloud('eureka');
    results['eurekaServer'] = hasCloud('eurekaServer');
    results['feign'] = hasCloud('feign');
    results['hystrix'] = hasCloud('hystrix');
    results['hystrixDashboard'] = hasCloud('hystrixDashboard');
    results['oauth2'] = hasCloud('oauth2');
    results['ribbon'] = hasCloud('ribbon');
    results['turbine'] = hasCloud('turbine');
    results['turbineAmqp'] = hasCloud('turbineAmqp');
    results['zuul'] = hasCloud('zuul');
    results['aws'] = hasCloud('aws');
    results['awsJdbc'] = hasCloud('awsJdbc');
    results['awsMessaging'] = hasCloud('awsMessaging');
    results['cloudBus'] = hasCloud('cloudBus');
    results['cloudSecurity'] = hasCloud('cloudSecurity');
    results['usesCloud'] = props.cloud.length > 0;

    // I/O
    var hasIO = function (ioStarter) {
      return props.io.indexOf(ioStarter) !== -1;
    };
    results['batch'] = hasIO('batch');
    results['integration'] = hasIO('integration');
    results['jms'] = hasIO('jms');
    results['amqp'] = hasIO('amqp');
    results['mail'] = hasIO('mail');

    // Social
    var hasSocial = function (socialStarter) {
      return props.social.indexOf(socialStarter) !== -1;
    };
    results['facebook'] = hasSocial('facebook');
    results['linkedin'] = hasSocial('linkedin');
    results['twitter'] = hasSocial('twitter');

    // OPS
    var hasOps = function (opsStarter) {
      return props.ops.indexOf(opsStarter) !== -1;
    };
    results['actuator'] = hasOps('actuator');
    results['remoteshell'] = hasOps('remoteshell');
    return results;
  }

 writing() {
    console.log(chalk.yellow('\nGenerating Application...'));
    var packageFolder = this.answers.packageName.replace(/\./g, '/');
    var srcDir = 'src/main/java/' + packageFolder;
    var resourceDir = 'src/main/resources';
    var context =  this._buildAnswerContext(this.answers);  
  
    mkdirp(srcDir);

    if ('gradle' === this.answers.buildTool[0]) {
      this.fs.copyTpl(
        this.templatePath('build.gradle'),
        this.destinationPath('build.gradle'),
        context);
    }
    if ('maven' === this.answers.buildTool[0]) {
      this.fs.copyTpl(
        this.templatePath('pom.xml'),
        this.destinationPath('pom.xml'),
        context);
    }

    this.fs.copyTpl(
      this.templatePath('Application.java'),
      this.destinationPath(srcDir + '/Application.java'),
      {packageName: this.answers.packageName}
    );

       if (this.useSpock) {
      var testDir = 'src/test/groovy/' + packageFolder;
      mkdirp(testDir);
    }
    if (context.web || context.thymeleaf || context.gtemplates || context.mustache) {
      mkdirp('src/main/resources');
      mkdirp('src/main/resources/static');
      mkdirp('src/main/resources/templates');
      this.fs.copyTpl(
        this.templatePath('application.yml'),
        this.destinationPath(resourceDir + '/application.yml'),
        context
      );
    }
    this.config.set('packageName', context.packageName);
    this.config.set('packageFolder', packageFolder);
  }

  projectfiles() { 
    console.log(chalk.yellow('\nProjectfiles Method...'));
  }

};
