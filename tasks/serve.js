import urlJoint from 'url-join';

export default function factory($, env) {
    return function task() {
        return $.gulp.src(env.paths.output.root)
            .pipe($.webserver({
                livereload: true,
                open: false,
                port: env.development.port || 8000,
                fallback: 'public/index.html',
                proxies: [
                    {
                        source: `${env.beagle.apiEndpoint}*`,
                        target: urlJoint(env.beagle.host, env.beagle.apiEndpoint)
                    }
                ]
            }));
    };
}
