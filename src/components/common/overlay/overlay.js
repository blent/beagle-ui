import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import cn from 'classnames';
import {
    overlay as overlayCss
} from './overlay.css';

export default React.createClass({
    propTypes: {
        hidden: React.PropTypes.bool,
        className: React.PropTypes.string
    },
    mixins: [
        PureRenderMixin
    ],
    getDefaultProps() {
        return {
            hidden: false
        };
    },
    render() {
        if (this.props.hidden) {
            return null;
        }

        const className = cn(overlayCss, this.props.className);

        return (
            <div
                className={className}
            />
        );
    }
});
