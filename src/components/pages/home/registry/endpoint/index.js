/* eslint-disable react/forbid-prop-types */
import React from 'react';
import AltContainer from 'alt-container';
import FluxContextMixin from '../../../../mixins/flux-context-mixin';
import Form from './form';

export default React.createClass({
    mixins: [
        FluxContextMixin
    ],

    render() {
        return (
            <AltContainer
                stores={{ source: this.getStore('registry/endpoint') }}
                actions={{ actions: this.getActions('registry/endpoint') }}
            >
                <Form />
            </AltContainer>
        );
    }
});
