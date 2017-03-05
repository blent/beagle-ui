import path from 'path';
import set from 'lodash/set';
import urlJoint from 'url-join';

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const BEAGLE = {
    apiEndpoint: '/api',
    host: 'http://localhost:8080'
};

set(process, 'env.BEAGLE_API_URL', urlJoint(BEAGLE.host, BEAGLE.apiEndpoint));

export default {
    name: 'base',
    build: {
        debug: false,
        minify: true
    },
    development: {
        port: 8000,
        watch: false
    },
    test: {
        port: 9000,
        report: 'spec'
    },
    beagle: BEAGLE,
    coverage: {
        report: ['text', 'html', 'json']
    },
    paths: {
        root: ROOT_DIR,
        tests: path.join(ROOT_DIR, 'test'),
        coverage: path.join(ROOT_DIR, 'coverage'),
        doc: path.join(ROOT_DIR, 'doc'),
        input: {
            root: SRC_DIR,
            scripts: path.join(SRC_DIR, 'scripts'),
            fonts: [
                path.join(ROOT_DIR, 'node_modules/font-awesome/fonts/**.*'),
                path.join(ROOT_DIR, 'node_modules/roboto-fontface/fonts/*/**.*')
            ],
            styles: path.join(SRC_DIR, 'styles'),
            html: SRC_DIR
        },
        output: {
            root: DIST_DIR,
            scripts: path.join(DIST_DIR, 'public/scripts'),
            fonts: path.join(DIST_DIR, 'public/fonts'),
            styles: path.join(DIST_DIR, 'public/styles'),
            html: path.join(DIST_DIR, 'public')
        }
    }
};
