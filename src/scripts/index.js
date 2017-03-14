import React from 'react';
import { render } from 'react-dom';
import {
    browserHistory
} from 'react-router';
import get from 'lodash/get';
import AppComponent from './ui/components/app';
import App from './ui/application';

const container = document.createElement('div');
container.style.width = '100%';
container.style.height = '100%';

document.body.appendChild(container);

const history = browserHistory;
const app = App({
    debug: get(process, 'env.NODE_ENV', 'development') === 'development',
    http: {
        api: get(process, 'env.BEAGLE_API_URL', 'http://localhost:8080/api')
    },
    logger: console,
    history
});

render(
    <AppComponent
        flux={app}
        history={history}
    />,
    container
);
