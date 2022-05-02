import {
  src as _src,
  dest as _dest,
  watch as __watch,
  series,
  parallel,
} from "gulp";
import terser from "gulp-terser";
import babel from "gulp-babel";
const sass = require("gulp-sass")(require("sass"));
import autoprefixer from "gulp-autoprefixer";
import del from "del";
import cleanCSS from "gulp-clean-css";
import htmlclean from "gulp-htmlclean";
import imagemin from "gulp-imagemin";
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';


const paths = {
  styles: {
    src: "src/scss/*.scss",
    dest: "build/css",
  },
  cssMinify: {
    src: "dev/**/*.css",
    dest: "build",
  },
  HTMLMinify: {
    src: "./src/views/*.html",
    dest: "build",
  },
  HTMLClean: {
    src: "./dev/*.html",
    dest: "build",
  },
  imageMinify: {
    src: "src/img/*[.png,.jpg,.jpge,.svg]",
    dest: "build/img",
  },
  compile_imageMinify: {
    src: "dev/img/*[.png,.jpg,.jpge,.svg]",
    dest: "build/img",
  },
  javaScript: {
    src:  "./src/js/**/*.js",
    dest: "build/script",
  },
};
/* DEV */


//javaScript
function babelJs(){
  return _src(paths.javaScript.src)
  .pipe(plumber())
    .pipe(concat('scripts-min.js'))
    .pipe(babel())
    // .pipe(terser())
  .pipe(_dest(paths.javaScript.dest));

}
//css pubg
function compileSass() {
  return _src(paths.styles.src)
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      sass({
        includePaths: ["scss"],
      })
    )
    .pipe(_dest(paths.styles.dest));
}
function minifiHTML() {
  return _src(paths.HTMLMinify.src)
    .pipe(
      htmlclean({
        protect: /<\!--%fooTemplate\b.*?%-->/g,
        edit: function (html) {
          return html.replace(/\begg(s?)\b/gi, "omelet$1");
        },
      })
    )
    .pipe(_dest(paths.HTMLMinify.dest));
}

//imagens
function imageMinify() {
  return _src(paths.imageMinify.src)
    .pipe(imagemin())
    .pipe(_dest(paths.imageMinify.dest));
}

//watch
function watchAll() {
  __watch('./src/**', 
  series(
    parallel(compileSass),
    parallel(minifiHTML), 
    parallel(babelJs),
  ));
}
function watchJS() {
  __watch('./src/js/**/*.js', 
  series(
    parallel(babelJs),
  ));
}
function watchCss() {
  __watch('./src/scss/**/*.scss', 
  series(
    parallel(compileSass),
  ));
}
/************************************************ */
/* Build */

function clean() {
  return del(["build"]);
}


/******************************* */
const build = series(
  // parallel(clean),
  parallel(compileSass),
  parallel(minifiHTML), 
  parallel(imageMinify),
  parallel(babelJs),
);

export { clean ,babelJs, compileSass , watchAll,watchJS,watchCss, minifiHTML, imageMinify };


export { build };
export { build as default };