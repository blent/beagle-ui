/* eslint-disable react/forbid-prop-types */
import React from 'react';
import AltContainer from 'alt-container';
import FluxContextMixin from '../../../../mixins/flux-context-mixin';
import List from './list';

export default React.createClass({
    mixins: [
        FluxContextMixin
    ],

    render() {
        return (
            <AltContainer
                stores={{ source: this.getStore('monitoring/activity') }}
                actions={{ actions: this.getActions('monitoring/activity') }}
            >
                <List />
            </AltContainer>
        );
    }
});
