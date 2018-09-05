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
        stripBanners: true
      },
      dist: {
        src: [
          // 所引用的 js 参见 views/js_compress_before.html
          // 'lib/jquery.min.js',
          'lib/jquery.running.min.js',
          'lib/pagination/jquery.pagination.js',
          'lib/jquery-viewer/jquery-viewer.js',
          'lib/sal.js',
          "js/commont.js"
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
            'lib/bootstrap/css/bootstrap.min.css',
            'lib/pagination/pagination.css',
            'lib/jquery-viewer/viewer.css',
            'lib/layui-v2.3.0/layui/css/layui.css',
            'css/common.css',
            'css/icons.css'
          ],
          'css/about.css': 'css/about.css',
          'css/index.css' : 'css/index.css',
          'css/information.css':'css/information.css',
          'css/projects.css':'css/projects.css'
        },
      },
    },

    imagemin: {
      /* 压缩图片大小 */
      dist: {
        options: {
          optimizationLevel: 1, //定义 PNG 图片优化水平
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{jpg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
          dest: 'images/', // 优化后的图片保存位置，覆盖旧图片，并且不作提示
        }, ],
      },

    },

    // 精灵图
    sprite:{
      icIcons: {
        src: ['images/sprite/*.png'], //素材图片
       
        dest: 'images/sprite/icons.png', // 默认雪碧图输出路径
      
        destCss: 'css/icons.css', // 雪碧图less输出路径，也支持输出css
        imgPath: '../images/sprite/icons.png', //默认雪碧图在css中url引用路径
        cssVarMap: function(sprite) {
            sprite.name = 'm-ic-icon.m-ic-icon-' + sprite.name;  
            //定义图标class名称，例如 del.png对应 m-ic-icon.m-ic-icon-del
        }
      }
    }
  });

  //加载任务
  grunt.loadNpmTasks('grunt-spritesmith');
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
    'sprite'
  ]);
};