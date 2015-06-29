module.exports = function(grunt) {

  grunt.initConfig({
    host_config: grunt.file.readJSON('.host_config'),

    compass: {                
      dist: {                  
        options: {             
          sassDir: 'sass',
          cssDir: 'css',
          environment: 'production'
        }
      },
      dev: {                   
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          environment: 'development'
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000
        }
      }
    },

    'ftp-deploy': {
      build: {
        auth: {
          host: '<%- host_config.host %>',
          port: '<%- host_config.port %>'
        },
        src: '.',
        dest: '<%- host_config.directory %>',
        exclusions: [
          '.*',
          'node_modules',
          'sass',
          'Gruntfile.js',
          'package.json'
          ]
      }
    },

    watch: {
      sass: {
        files: ['sass/*.sass'],
        tasks: ['compass'],
        options: {
          livereload: true,
          spawn: false
        },
      } 
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');


  grunt.registerTask('default', ['compass', 'connect', 'watch']);
  grunt.registerTask('deploy',  ['compass', 'ftp-deploy']);
};