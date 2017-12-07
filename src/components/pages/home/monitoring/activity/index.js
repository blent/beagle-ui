/* eslint-disable react/forbid-prop-types */
import React from 'react';
import AltContainer from 'alt-container';
import FluxContextMixin from '../../../../mixins/flux-context-mixin';
import ListContainer from '../../../../common/list/container';

const LIST_PROPS = {
    title: 'Active peripherals',
    columns: [
        'key',
        'kind',
        'proximity',
        'registered',
        'time'
    ]
};

export default React.createClass({
    mixins: [
        FluxContextMixin
    ],

    render() {
        return (
            <AltContainer
                stores={{ source: this.getStore('monitoring/activity') }}
                actions={{ actions: this.getActions('monitoring/activity') }}
                inject={LIST_PROPS}
            >
                <ListContainer />
            </AltContainer>
        );
    }
});
