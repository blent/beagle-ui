/* eslint-disable react/forbid-prop-types */
import React from 'react';
import AltContainer from 'alt-container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FluxContextMixin from '../mixins/flux-context-mixin';
import Notifications from './notifications';

export default React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.element,
            React.PropTypes.arrayOf(React.PropTypes.element)
        ]).isRequired
    },

    mixins: [
        FluxContextMixin
    ],

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    {this.props.children}
                    <AltContainer
                        stores={{ notifications: this.getStore('notifications') }}
                        actions={{ actions: this.getActions('notifications') }}
                    >
                        <Notifications />
                    </AltContainer>
                </div>
            </MuiThemeProvider>
        );
    }
});
