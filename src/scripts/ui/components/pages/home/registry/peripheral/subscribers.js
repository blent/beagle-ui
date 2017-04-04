/* eslint-disable no-prototype-builtins, react/sort-comp, no-lonely-if, max-len */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Formsy from 'formsy-react';

export default React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.array
    },
    mixins: [
        PureRenderMixin,
        Formsy.Mixin
    ],

    render() {
        return <span />;
    }
});
