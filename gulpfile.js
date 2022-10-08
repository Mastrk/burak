const { src, dest, watch, parallel } = require('gulp');
const browserSync  = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');



// Static serv8er
function browsersync() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });

   
};


function img() {
    return src('src/images/**/*')
        .pipe(imagemin(
            [
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]
    ))
    .pipe(dest('dist/images/'))

};

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/@fancyapps/ui/dist/fancybox.umd.js',
        'src/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
    .pipe(browserSync.stream());
}


function styles() {
    return src('src/scss/style.scss')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(concat('style.min.css'))
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 10 version'],
                grid:true
            }))
            .pipe(dest('src/css'))
            .pipe(browserSync.stream());
};

function build() {
    return src([
        'src/css/style.min.css',
        'src/fonts/**/*',
        'src/js/main.min.js',
        'src/*.html'
    ], {base: 'src'}) 
    .pipe(dest('dist'))
}

function watching() {
    watch(['src/scss/**/*.scss'], styles);
    watch(['src/js/main.js','!src/js/main.min.js'], scripts);
    watch('src/*.html').on('change', browserSync.reload);
};

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.build = build;


exports.default = parallel(scripts, browsersync, watching);