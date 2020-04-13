'use strict';

if(process.argv.indexOf('dist') !== -1){
  process.argv.push("--ship");
}

const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

gulp.task('dist', gulpSequence('clean', 'bundle', 'package-solution'));

build.initialize(gulp);

