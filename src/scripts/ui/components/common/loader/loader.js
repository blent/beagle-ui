/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Placeholder from './placeholder';

export default React.createClass({
    propTypes: {
        type: React.PropTypes.oneOf([
            'circular',
            'linear',
            'refresh'
        ]),
        hidden: React.PropTypes.bool
    },

    mixins: [
        PureRenderMixin
    ],

    getDefaultProps() {
        return {
            type: 'linear',
            hidden: false
        };
    },

    render() {
        if (this.props.hidden) {
            return <Placeholder />;
        }

        let Loader = null;
        switch (this.props.type) {
        case 'circular':
            Loader = CircularProgress;
            break;
        case 'linear':
            Loader = LinearProgress;
            break;
        case 'refresh':
            Loader = RefreshIndicator;
            break;
        default:
            Loader = LinearProgress;
            break;
        }

        return (
            <Loader {...this.props} />
        );
    }
});
