module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
          host: 'huddletogether.com',
          port: 21
        },
        src: '.',
        dest: '/home/lokesh/webapps/huddletogether',
        exclusions: [
          '.DS_Store',
          '.sass-cache',
          '.git*',
          '.ftppass',
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