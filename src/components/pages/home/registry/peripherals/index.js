/* eslint-disable react/forbid-prop-types */
import React from 'react';
import AltContainer from 'alt-container';
import { List } from 'immutable';
import FluxContextMixin from '../../../../mixins/flux-context-mixin';
import ListContainer from '../../../../common/list/container';
import EnabledIcon from '../../../../common/icons/boolean';

const LIST_PROPS = {
    title: 'Registered peripherals',
    editable: true,
    columns: List([
        {
            displayName: 'Kind',
            columnName: 'kind'
        },
        {
            displayName: 'Name',
            columnName: 'name'
        },
        {
            displayName: 'Enabled',
            columnName: 'enabled',
            formatter(value) {
                return <EnabledIcon value={value} />;
            }
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
                stores={{ source: this.getStore('registry/peripherals') }}
                actions={{ actions: this.getActions('registry/peripherals') }}
                inject={LIST_PROPS}
            >
                <ListContainer />
            </AltContainer>
        );
    }
});
