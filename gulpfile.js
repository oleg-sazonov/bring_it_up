"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync").create();

const dist = "./dist/";

const copyHtml = () => {
	return gulp
		.src("./src/*.html")
		.pipe(gulp.dest(dist))
		.pipe(browsersync.stream());
};

const buildJs = () => {
	return gulp
		.src("./src/js/main.js")
		.pipe(
			webpack({
				mode: "development",
				output: {
					filename: "script.js",
				},
				watch: false,
				devtool: "source-map",
				module: {
					rules: [
						{
							test: /\.m?js$/,
							exclude: /(node_modules|bower_components)/,
							use: {
								loader: "babel-loader",
								options: {
									presets: [
										[
											"@babel/preset-env",
											{
												debug: true,
												corejs: 3,
												useBuiltIns: "usage",
											},
										],
									],
								},
							},
						},
					],
				},
			})
		)
		.pipe(gulp.dest(dist))
		.on("end", browsersync.reload);
};

const copyAssets = () => {
	return gulp
		.src("./src/assets/**/*.*", { encoding: false })
		.pipe(gulp.dest(dist + "/assets"))
		.on("end", browsersync.reload);
};

const watchFiles = () => {
	browsersync.init({
		server: {
			baseDir: "./dist/",
			serveStaticOptions: {
				extensions: ["html"],
			},
		},
		port: 4000,
		notify: true,
	});

	gulp.watch("./src/*.html", copyHtml);
	gulp.watch("./src/assets/**/*.*", copyAssets);
	gulp.watch("./src/js/**/*.js", buildJs);
};

const buildProdJs = () => {
	return gulp
		.src("./src/js/main.js")
		.pipe(
			webpack({
				mode: "production",
				output: {
					filename: "script.js",
				},
				module: {
					rules: [
						{
							test: /\.m?js$/,
							exclude: /(node_modules|bower_components)/,
							use: {
								loader: "babel-loader",
								options: {
									presets: [
										[
											"@babel/preset-env",
											{
												corejs: 3,
												useBuiltIns: "usage",
											},
										],
									],
								},
							},
						},
					],
				},
			})
		)
		.pipe(gulp.dest(dist));
};

const build = gulp.parallel(copyHtml, copyAssets, buildJs);
const dev = gulp.series(build, watchFiles);

exports.copyHtml = copyHtml;
exports.buildJs = buildJs;
exports.copyAssets = copyAssets;
exports.watch = watchFiles;
exports.build = build;
exports.buildProdJs = buildProdJs;
exports.default = dev;