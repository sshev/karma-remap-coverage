'use strict';

const remap = require('remap-istanbul/lib/remap');
const writeReport = require('remap-istanbul/lib/writeReport');

const RemapCoverageReporter = function(baseReporterDecorator, config) {
  baseReporterDecorator(this);

  this.onCoverageComplete = (browser, coverageReport) => {
    const options = config.remapCoverageReporter || { html: './coverage' };
    const collector = remap(coverageReport);

    Object.keys(options).forEach(type => writeReport(collector, type, {}, options[type]));
  };
};

RemapCoverageReporter.$inject = ['baseReporterDecorator', 'config'];

module.exports = {
  'reporter:remap-coverage': ['type', RemapCoverageReporter]
};
