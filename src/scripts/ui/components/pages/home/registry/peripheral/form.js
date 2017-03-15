/* eslint-disable react/forbid-prop-types */
import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import {
    FormsyCheckbox,
    FormsySelect,
    FormsyText
} from 'formsy-material-ui/lib';
import DataSourceMixin from '../../../../mixins/data-source-mixin';
import kinds from '../../../../../../domain/registry/peripherals/kinds';
import Form from '../../../../common/form/form';

export default React.createClass({
    propTypes: {
        source: React.PropTypes.object,
        actions: React.PropTypes.object
    },

    mixins: [
        DataSourceMixin
    ],

    _renderKindDropdown() {
        return (
            <FormsySelect
                name="kind"
                floatingLabelText="Peripheral kind"
                disabled={this.isLoading()}
                fullWidth
                required
            >
                {kinds.toSeq().map((value, key) => {
                    const itemKey = key;
                    return (
                        <MenuItem
                            key={itemKey}
                            value={value}
                            primaryText={value}
                        />
                    );
                }).toArray()}
            </FormsySelect>
        );
    },

    render() {
        return (
            <Form
                title={'Peripheral'}
                actions={this.props.actions}
                source={this.props.source}
            >
                {this._renderKindDropdown()}
                <FormsyText
                    name="name"
                    floatingLabelText="Peripheral name"
                    fullWidth
                    required
                />
                <FormsyCheckbox
                    className="form-control-checkbox"
                    name="enabled"
                    label="Enabled"
                />
            </Form>
        );
    }
});
