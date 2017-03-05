/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Router, Route, IndexRedirect, Redirect } from 'react-router';
import Root from './pages/root';
import Login from './pages/login/index';
import Home from './pages/home/index';

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
                            component={noop}
                        >
                            <Route
                                path="activity"
                                component={noop}
                                onEnter={this.props.flux.getRouteHandler('home/monitoring/activity')}
                            />
                        </Route>
                        <Route
                            path="registry"
                            component={noop}
                        >
                            <IndexRedirect to="/registry/target" />
                            <Route
                                path="target"
                                component={noop}
                            />
                            <Route
                                path="endpoint"
                                component={noop}
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
