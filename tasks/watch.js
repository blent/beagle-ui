import path from 'path';

export default function factory($, env) {
    return function task(done) {
        if (env.development.watch) {
            $.gulp.watch(path.join(env.paths.input.styles, '/**/*.css'), ['build:styles']);
            $.gulp.watch(path.join(env.paths.input.html, '/**/*.html'), ['build:html']);
            $.logger.info('Watching...');
        } else {
            done();
        }
    };
}
