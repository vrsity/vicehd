module.exports = function(grunt) {

  grunt.initConfig({
    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /views\/partials\//
        },
          files: {
            "app/assets/js/templates.js": ["views/partials/*.handlebars"]
          }
      }
    }
  , watch: {
      emberTemplates: {
        files: ['views/partials/*.handlebars']
      , tasks: ['emberTemplates']
      , options: { atBegin: true }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ember-templates');

  grunt.registerTask('default', ['watch']);
};
