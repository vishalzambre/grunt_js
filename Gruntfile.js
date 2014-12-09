module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/assets/js/1.js', 'src/assets/js/2.js'],
        dest: 'src/built.js',
      },
    },

    cssmin: {
      add_banner: {
        options: {
          banner: '/*This is minified css file, don\'t modify this file. */'
        },
        files: {
          'build/all.min.css': ['src/assets/css/*.css']
        }
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      build: {
        src: 'src/built.js',
        dest: 'build/all.min.js'
      }
    },


    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/images'
        }]
      }
    },

    smoosher: {
      options: {
        jsDir: "src/built.js",
        cssDir: "build/all.min.css"
      },
      all: {
        files: {
          'build/main.html': 'src/ninjaStrike.html',
        },
      },
    },

    clean: {
      all: {
        src: ['build/*.{css,js}', 'src/built.js']
      }
    },

    watch: {
      files: ['src/js/*.js', 'src/css/*.css'],
      tasks: ['uglify', 'cssmin', 'imagemin', 'smoosher']
    }

  });

  // Load the Grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-html-smoosher');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // Register the default tasks.
  grunt.registerTask('default', ['concat', 'cssmin', 'imagemin', 'uglify', 'smoosher']);
};