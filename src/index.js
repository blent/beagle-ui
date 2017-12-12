import React from 'react';
import { render } from 'react-dom';
import {
    browserHistory
} from 'react-router';
import get from 'lodash/get';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/dist/flexboxgrid.css';
// import 'roboto-fontface/css/roboto/roboto-fontface.css';
import AppComponent from './components/app';
import App from './application';
import './index.css';

const history = browserHistory;
const app = App({
    debug: get(process.env, 'NODE_ENV', 'development') === 'development',
    http: {
        baseUrl: get(process.env, 'BEAGLE_API_URL', '/api')
    },
    logger: console,
    history
});

render(
    <AppComponent
        flux={app}
        history={history}
    />,
    document.querySelector('#root')
);
