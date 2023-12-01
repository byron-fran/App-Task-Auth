/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { dest, watch, series, src } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
// const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

const css = () => {
    return src('src/scss/App.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init()) // Iniciar mapas de origen
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS()) // Minificar CSS
        .pipe(sourcemaps.write('.')) // Escribir mapas de origen en un archivo .map
        .pipe(dest('public/css'))
        .pipe(browserSync.stream()); // Inyectar cambios sin recargar toda la página
};

// const images = () => {
//     return src('src/images/**/*')
//         .pipe(imagemin()) // Optimizar imágenes
//         .pipe(dest('public/images'));
// };

const server = () => {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
    watch('src/scss/**/*.scss', series(css)).on('change', browserSync.reload);
    watch('public/**/*.html').on('change', browserSync.reload); // Refrescar cuando los archivos HTML cambian
};

// exports.images = images;
exports.default = series(css, server);
