/* eslint-disable react/forbid-prop-types */
import React from 'react';
import AltContainer from 'alt-container';
import FluxContextMixin from '../../../../mixins/flux-context-mixin';
import Page from './page';

export default React.createClass({
    mixins: [
        FluxContextMixin
    ],

    render() {
        return (
            <AltContainer
                stores={{ source: this.getStore('monitoring/system') }}
                actions={{ actions: this.getActions('monitoring/system') }}
            >
                <Page />
            </AltContainer>
        );
    }
});
