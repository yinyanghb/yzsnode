module.exports = function (grunt) {
  grunt.initConfig({
    //our JSHint options
    jshint: {
      all: ['js/deelon-sdk.js']
    },
    //our concat options
    concat: {
      options: {
        separator: ';', //separates scripts
      },
      dist: {
        src: [

          // 所引用的 js 参见 views/js_compress_before.html
          'lib/jquery-1.8.3.min.js',
          'lib/jquery.cookie.js',
          'lib/js.cookie.js',
          'lib/provider.js',
          'js/mappings.js',
          'lib/utils.js',
          'lib/router.js',
          'js/utils.js',
          'js/validate.js',
          'lib/pagination/jquery.pagination.js',
          'lib/pikaday/js/pikaday.min.js',
          'js/utils.js',
          'lib/validate.js',
          'lib/tipso/tipso.js',
          'lib/request.js',
          'lib/IDValidator/GB2260.js',
          'lib/IDValidator/IDValidator.js',



        ], //需要合并的文件，注意顺序
        dest: 'js/dist/app.js', //合并文件
      },
    },
    //压缩js
    uglify: {
      js: {
        files: {
          'js/dist/app.min.js': ['js/dist/app.js'], // 先执行 grunt concat,在执行 grunt uglify
        },
      },
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
      },
      compress: {
        files: {
          // css压缩 app.min.css 为压缩后生成的文件,后面的数组为需要合并压缩的文件（同样注意顺序）
          // css 暂时不要压缩，因为有图片路径引用问题
          'css/app.min.css': [
            'lib/pagination/pagination.css',
            'lib/pikaday/css/pikaday.css',
            'lib/tipso/tipso.min.css',

            'css/common.css',
            'css/login.css',
            'css/members.css'
          ],
        },
      },
    },

    imagemin: {
      /* 压缩图片大小 */
      dist: {
        options: {
          optimizationLevel: 3, //定义 PNG 图片优化水平
        },
        files: [{
          expand: true,
          cwd: 'before/images',
          src: ['**/*.{png,jpg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
          dest: 'after/images', // 优化后的图片保存位置，覆盖旧图片，并且不作提示（建议新建一个目录）
        }, ],
      },
    },
  });

  //加载任务
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  // 用法：

  // 1.检查js语法 grunt jshint

  // 2.合并js grunt concat

  // 3.压缩js grunt uglify

  // 4.压缩css grunt imagemin

  // 5.压缩图片 grunt cssmin

  // （注意js压缩之前要先合并，也就是第一步和第二部有先后顺序）

  // default tasks to run
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('development', ['jshint']);
  grunt.registerTask('production', [
    'jshint',
    'concat',
    'uglify',
    'imagemin',
    'cssmin',
  ]);
};