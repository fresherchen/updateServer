'use strict';

module.exports = {
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'combined',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      stream: 'access.log'
    }
  }
};
