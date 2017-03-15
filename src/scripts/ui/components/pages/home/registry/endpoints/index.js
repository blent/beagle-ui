/* eslint-disable react/forbid-prop-types */
import React from 'react';
import AltContainer from 'alt-container';
import FluxContextMixin from '../../../../mixins/flux-context-mixin';
import List from '../../../../common/list/list';

const LIST_PROPS = {
    title: 'Registered endpoints',
    editable: true,
    columns: [
        'name',
        'url',
        'method'
    ]
};

export default React.createClass({
    mixins: [
        FluxContextMixin
    ],

    render() {
        return (
            <AltContainer
                stores={{ source: this.getStore('registry/endpoints') }}
                actions={{ actions: this.getActions('registry/endpoints') }}
                inject={LIST_PROPS}
            >
                <List />
            </AltContainer>
        );
    }
});
