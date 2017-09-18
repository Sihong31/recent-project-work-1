/*!
 * gulp
 * npm install
 *
 * This gulpfile manages assets primarily.
 *
 */

// Load plugins
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    browserify = require('gulp-browserify'),
    browserSync = require('browser-sync').create(),
    cache = require('gulp-cache'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    // notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

var theme = {
      assets: 'vascepatwentyseventeen/assets',
      fonts: 'vascepatwentyseventeen/src/assets/fonts/**/*',
      images: 'vascepatwentyseventeen/src/assets/images/**/*',
      media: 'vascepatwentyseventeen/src/assets/media/*',
      pdf: 'vascepatwentyseventeen/src/assets/pdf/*',
      root: 'vascepatwentyseventeen',
      scripts: 'vascepatwentyseventeen/src/assets/js/*.js',
      scriptsJson: 'vascepatwentyseventeen/src/assets/js/*.json',
      scriptsVendor: 'vascepatwentyseventeen/src/assets/js/vendor/*.js',
      srcRoot: 'vascepatwentyseventeen/src/assets',
      styles: 'vascepatwentyseventeen/src/assets/styles/**/*.scss',
      stylesMain: 'vascepatwentyseventeen/src/assets/styles/style.scss'
    };


// Clean
gulp.task('clean', function() {
  return del([theme.assets]);
});


// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('watch');
});


// Fonts
gulp.task('fonts', function() {
  return gulp.src(theme.fonts, { base: theme.srcRoot })
    .pipe(gulp.dest(theme.assets));
    // .pipe(notify("Fonts task complete"));
});


// Images
gulp.task('images', function() {
  return gulp.src(theme.images, { base: theme.srcRoot })
    //.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(theme.assets));
    // .pipe(notify("Images task complete"));
});


// Media
gulp.task('media', function() {
  return gulp.src(theme.media, { base: theme.srcRoot })
    .pipe(gulp.dest(theme.assets));
    // .pipe(notify("Media task complete"));
});

gulp.task('pdf', function() {
  return gulp.src(theme.pdf, { base: theme.srcRoot })
    .pipe(gulp.dest(theme.assets));
    // .pipe(notify("Media task complete"));
});


// Scripts
gulp.task('scriptsJson', function() {
  return gulp.src(theme.scriptsJson, { base: theme.srcRoot })
    .pipe(gulp.dest(theme.assets));
});

gulp.task('scripts', function() {
  return gulp.src(theme.scripts, { base: theme.srcRoot })
    .pipe(plumber())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(babel({ presets: ["babel-preset-env", "babel-preset-es2015", "babel-preset-es2016", "babel-preset-es2017", "babel-preset-stage-2"].map(require.resolve), plugins: ["babel-plugin-transform-es2015-template-literals"]}))
    // .pipe(uglify())
    .pipe(browserify({
        insertGlobals : true,
        debug : !gulp.env.production
    }))
    .pipe(gulp.dest(theme.assets));
    // .pipe(notify("Scripts task complete"));
});

gulp.task('scriptsVendor', function() {
  return gulp.src(theme.scriptsVendor, { base: theme.srcRoot })
    .pipe(gulp.dest(theme.assets));
    // .pipe(notify("ScriptsVendor task complete"));
});

// Styles
// Does not concat files (to maintain mobile/desktop separation)
gulp.task('styles', function() {
  return gulp.src(theme.stylesMain)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano({
      autoprefixer: {
        add: true,
        remove: false,
        browsers: ['last 2 versions', 'last 4 iOS versions']
      },
      discardComments: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(theme.root));
    // .pipe(notify("Styles task complete"));
});


// Watch
gulp.task('watch', ['webserver'], function() {

  // Watch .scss files
  watch(theme.styles, function() {
    gulp.start('styles');
  });

  // Watch .js files
  // watch(theme.scripts, function() {
  //   gulp.start('scripts');
  // });

  watch(theme.scriptsVendor, function() {
    gulp.start('scriptsVendor');
  });

  watch(theme.scriptsJson, function() {
    gulp.start('scriptsJson');
  });


  // Watch fonts
  watch(theme.fonts, function() {
    gulp.start('fonts');
  });

  // Watch image files
  watch(theme.images, function() {
    gulp.start('images');
  });

  // Watch media files
  watch(theme.media, function() {
    gulp.start('media');
  });

   // Watch pdf files
  watch(theme.pdf, function() {
    gulp.start('pdf');
  });

  console.log("Watching files...");
});

// Webserver
gulp.task('webserver', [
    'fonts',
    'images',
    'media',
    'scripts',
    'scriptsVendor',
    'scriptsJson',
    'styles',
    'pdf'
  ],
  function() {
    browserSync.init({
      files: [
        '**/*.css',
        '**/images/**',
        '**/*.js',
         '**/*.json',
        '**/*.php'
      ],
      proxy: "http://localhost:8888/",
      snippetOptions: { 
        ignorePaths: ["wp-admin/**"] 
      }
    });
  }
);
