# karma-remap-coverage
Karma reporter that maps coverage to original non transpiled code (TypeScript, ES6/7, etc).

Build on top of `karma-coverage` and `remap-istanbul` - consumes coverage report for raw transpiled code and maps it to original files. Transpiler should generate inline source maps in order to make everything work.

Needs no temporary files nor npm post run scripts, works in auto watch mode generating report on every run.

##Installation
```
npm install karma-remap-coverage --save-dev
```

##Configuration
1. Enable inline source maps in your transpiler/compiler
2. Configure karma config to use `karma-coverage` together with `karma-remap-coverage`

###TypeScript + webpack example
Karma config with alternative usage of `karma-webpack` should look something like this:

**karma.conf.js**
```javascript
module.exports = config => config.set({

  webpack: {
    //...
    ts: {
      // override compiler options for "ts-loader"
      compilerOptions: {
        sourceMap: false,
        inlineSourceMap: true
      }
    }
  },

  //...

  preprocessors: {
    './entry-module.ts': ['coverage']
  },

  // add both "karma-coverage" and "karma-remap-coverage" reporters
  reporters: ['progress', 'coverage', 'remap-coverage'],
  
  // save interim raw coverage report in memory
  coverageReporter: {
    type: 'in-memory'
  },
  
  // define where to save final remaped coverage reports
  remapCoverageReporter: {
    html: './coverage/html',
    cobertura: './coverage/cobertura.xml'
  },
  
  // require both reporter plugins
  plugins: ['karma-coverage', 'karma-remap-coverage']

});
```
