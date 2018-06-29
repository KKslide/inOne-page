var gulp = require('gulp'),
	uglify = require("gulp-uglify"),
	rename = require('gulp-rename'),
	minifyCss = require("gulp-minify-css"),
	sass = require("gulp-sass"),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	//imageminJpegtran = require('imagemin-jpegtran'),
	//imageminJpegRecompress = require('imagemin-jpeg-recompress'),//使用tinypng进行压缩，内置4个token，每月可免费压缩2000次。
	tiny = require('gulp-tinypng-nokey'),
	cache = require('gulp-cache');

gulp.task('js', function () {
    gulp.src(['build/js/*.js']) 
    .pipe(uglify())
	.pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('js')); 
});

gulp.task('sass', function () {
    gulp.src(['build/sass/index.scss'])
    .pipe(sass())
	.pipe(minifyCss())
    .pipe(gulp.dest('css'));
});
gulp.task('images', function () {
	/* var jpgmin = imageminJpegRecompress({
            accurate: true,//高精度模式
            quality: "medium",//图像质量:low, medium, high and veryhigh;
            method: "smallfry",//网格优化:mpe, ssim, ms-ssim and smallfry;
            min: 70,//最低质量
            loops: 0,//循环尝试次数, 默认为6;
            progressive: false,//基线优化
            subsample: "default"//子采样:default, disable;
        })	*/
    gulp.src(['build/images/*.{png,gif,ico,jpg,jpeg}'])
	.pipe(cache(imagemin({
		optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
		progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
		interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
		multipass: true,//类型：Boolean 默认：false 多次优化svg直到完全优化
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
	})))
	.pipe(gulp.dest('images'));
});
gulp.task('tinyimg', function () {
    gulp.src(['build/images/*.{jpg,jpeg}'])
	.pipe(cache(tiny()))
	.pipe(gulp.dest('images'));
});
gulp.task('default', ['js','sass','images','tinyimg'],function () {
	gulp.watch(['build/js/*.js'],['js']);
	gulp.watch(['build/sass/index.scss'],['sass']);
	gulp.watch(['build/images/*.{png,ico,gif,jpg,jpeg}'],['images']);
	gulp.watch(['build/images/*.{jpg,jpeg}'],['tinyimg']);
});