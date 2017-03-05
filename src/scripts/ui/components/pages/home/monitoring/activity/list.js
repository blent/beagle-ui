/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { List } from 'immutable';

const DEFAULT_ITEMS = List();

export default React.createClass({
    propTypes: {
        source: React.PropTypes.object,
        // actions: React.PropTypes.object
    },

    getInitialState() {
        return {
            items: DEFAULT_ITEMS
        };
    },

    _isLoading() {
        return this.props.source.get('isLoading');
    },

    render() {
        return (
            <div>
                {this.state.items.map(i => i.toJS()).toArray()}
            </div>
        );
    }
});
