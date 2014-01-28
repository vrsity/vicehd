/*
 * grunt-minjson
 * https://github.com/shama/grunt-minjson
 *
 * Copyright (c) 2013 Kyle Robinson Young
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  if (grunt.utils) {
    grunt.fatal('grunt-minjson is only compatible with Grunt v0.4.0+');
  }

  var JSON5 = require('json5');
  var path = require('path');

  grunt.registerMultiTask('minjson', 'Minify and concat json files.', function() {

    this.files.forEach(function(file) {
      var dest = path.normalize(file.dest);
      var srcFiles = grunt.file.expand(file.src);
      var src = [];
      var errors = [];

      srcFiles.forEach(function(filepath) {
        var data = grunt.file.read(filepath);
        try {
          // minify json
          src.push(JSON5.stringify(JSON5.parse(data)));
        } catch (err) {
          errors.push(err.message + ' in ' + filepath);
        }
      });

      if (errors.length < 1) {
        // wrap concat'd files in brackets
        if (src.length > 1) { src = '[' + src.join(',') + ']'; }
        else { src = src[0]; }
        grunt.file.write(dest, src);
        grunt.log.writeln('File "' + dest + '" created.');
      } else {
        // display errors
        errors.forEach(function(msg) { grunt.log.error(msg); });
      }
    });
  });

};
