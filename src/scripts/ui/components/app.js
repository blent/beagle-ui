/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Router, Route, IndexRedirect, Redirect } from 'react-router';
import Root from './pages/root';
import Login from './pages/login/index';
import Home from './pages/home/index';
import Monitoring from './pages/home/monitoring/index';
import ActivityMonitoring from './pages/home/monitoring/activity/index';
import PeripheralsRegistry from './pages/home/registry/peripherals/index';
import EndpointsRegistry from './pages/home/registry/endpoints/index';
import EditPeripheral from './pages/home/registry/peripheral/index';
import EditEndpoint from './pages/home/registry/endpoint/index';

const noop = () => <span>Not implemented</span>;

export default React.createClass({
    propTypes: {
        flux: React.PropTypes.object.isRequired,
        history: React.PropTypes.object.isRequired
    },

    childContextTypes: {
        flux: React.PropTypes.object.isRequired
    },

    getChildContext() {
        return {
            flux: this.props.flux
        };
    },

    render() {
        return (
            <Router
                history={this.props.history}
            >
                <Route
                    path="/"
                    component={Root}
                >
                    <IndexRedirect to="/home" />
                    <Route
                        path="login"
                        component={Login}
                        onEnter={this.props.flux.getRouteHandler('login')}
                    />
                    <Route
                        path="home"
                        component={Home}
                        onEnter={this.props.flux.getRouteHandler('home')}
                    >
                        <Route
                            path="monitoring"
                            component={Monitoring}
                        >
                            <Route
                                path="activity"
                                component={ActivityMonitoring}
                                onEnter={this.props.flux.getRouteHandler('home/monitoring/activity')}
                            />
                        </Route>
                        <Route
                            path="registry"
                        >
                            <IndexRedirect to="/registry/peripherals" />
                            <Route
                                path="peripherals"
                                component={PeripheralsRegistry}
                                onEnter={this.props.flux.getRouteHandler('home/registry/peripherals')}
                            />
                            <Route
                                path="peripheral(/:id)"
                                component={EditPeripheral}
                                onEnter={this.props.flux.getRouteHandler('home/registry/peripheral')}
                            />
                            <Route
                                path="endpoints"
                                component={EndpointsRegistry}
                                onEnter={this.props.flux.getRouteHandler('home/registry/endpoints')}
                            />
                            <Route
                                path="endpoint(/:id)"
                                component={EditEndpoint}
                                onEnter={this.props.flux.getRouteHandler('home/registry/endpoint')}
                            />
                        </Route>
                        <Route
                            path="history"
                            component={noop}
                        >
                            <Route
                                path="activity"
                                component={noop}
                            />
                            <Route
                                path="delivery"
                                component={noop}
                            />
                        </Route>
                    </Route>
                    <Redirect from="*" to="home" />
                </Route>
            </Router>
        );
    }
});
