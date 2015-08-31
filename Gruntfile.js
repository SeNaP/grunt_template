/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  // Задачи
  grunt.initConfig({
    // Склеиваем
    concat: {
      js: {
        src: [
        'src/js/lib/*.js', // Все библиотеки
        'src/js/*.js'  // Все JS-файлы в папке
        ],
        dest: 'dest/application.js'
      },
      css: {
        src: [
        'src/css/lib/*.css', // Все библиотеки
        'src/css/*.css'  // Все CSS-файлы в папке
        ],
        dest: 'dest/application.css'
      }
    },
    // Сжимаем
    uglify: {
      main: {
        files: {
          // Результат задачи concat
          'dest/application.min.js': '<%= concat.main.dest %>'
        }
      }
    },
    // linker от sails
    'sails-linker': {
      prodJs: {
        options: {
          startTag: '<!--SCRIPTS-->',
          endTag: '<!--SCRIPTS END-->',
          fileTmpl: '<script src="%s"></script>',
          appRoot: './'
        },
        files: {
          // Target-specific file lists and/or options go here.
          'index.html': ['dest/**/*.js']
        },
      },
      prodStyles: {
        options: {
          startTag: '<!--STYLES-->',
          endTag: '<!--STYLES END-->',
          fileTmpl: '<link rel="stylesheet" href="%s">',
          appRoot: './'
        },

        files: {
          'index.html': ['dest/**/*.css']
        }
      }
    },
    //grunt static server
    connect: {
      server: {
        options: {
          port: 8000,
          keepalive: true,
          base: {
            path: './',
            options: {
              index: 'index.html',
              maxAge: 300000
            }
          }
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sails-linker');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['concat', 'sails-linker', 'connect']);

};
