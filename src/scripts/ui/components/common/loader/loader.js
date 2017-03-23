/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import RefreshIndicator from 'material-ui/RefreshIndicator';

export default React.createClass({
    propTypes: {
        type: React.PropTypes.oneOf([
            'circular',
            'linear',
            'refresh'
        ])
    },

    render() {
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
