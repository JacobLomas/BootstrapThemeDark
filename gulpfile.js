//require("gulp")
//para ejecutar tareas en serie o en paralelo
/* const {series, parallel}=require("gulp"); */

//para hacer uso de pipeline
//métodos src() y des()
const rename=require("gulp-rename");
const concat=require("gulp-concat");
const gulpif= require("gulp-if");
const processhtml = require("gulp-processhtml");
const pleeease=require("gulp-pleeease");
const sass=require("gulp-dart-scss");
const {watch, series, parallel, src, dest}=require("gulp");
const {basename} = require("path");
function compila(){
    return src("scss/main.scss")
    .pipe(sass())
    .pipe(pleeease())
    .pipe(rename({
        suffix:".min",
        extname:".css"
    }))
    .pipe(dest("dist/css"))
}

function mover(){
    return src("./node_modules/bootstrap/dist/js/*")
    .pipe(dest("dist/js"))
}

var options={overwrite:true};
function procesar_html(){
    return src("./dist/index.html")
    .pipe(processhtml())
    .pipe(dest("./dist", options));
}

exports.compila=compila;
exports.mover=mover;
exports.procesar_html=procesar_html;
exports.default=parallel(compila, mover, procesar_html)