/* eslint-disable react/forbid-prop-types */
import React from 'react';
import AltContainer from 'alt-container';
import FluxContextMixin from '../../../../mixins/flux-context-mixin';
import List from '../../../../common/list/list';

const LIST_PROPS = {
    title: 'Registered peripherals',
    editable: true,
    columns: [
        'kind',
        'name',
        'enabled'
    ]
};

export default React.createClass({
    mixins: [
        FluxContextMixin
    ],

    render() {
        return (
            <AltContainer
                stores={{ source: this.getStore('registry/peripherals') }}
                actions={{ actions: this.getActions('registry/peripherals') }}
                inject={LIST_PROPS}
            >
                <List />
            </AltContainer>
        );
    }
});
