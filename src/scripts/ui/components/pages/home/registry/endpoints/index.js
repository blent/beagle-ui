/* eslint-disable react/forbid-prop-types */
import React from 'react';
import AltContainer from 'alt-container';
import { List } from 'immutable';
import FluxContextMixin from '../../../../mixins/flux-context-mixin';
import ListContainer from '../../../../common/list/container';

const LIST_PROPS = {
    title: 'Registered endpoints',
    editable: true,
    columns: List([
        {
            displayName: 'Name',
            columnName: 'name'
        },
        {
            displayName: 'Url',
            columnName: 'url'
        },
        {
            displayName: 'Method',
            columnName: 'method'
        },
    ])
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
                <ListContainer />
            </AltContainer>
        );
    }
});
