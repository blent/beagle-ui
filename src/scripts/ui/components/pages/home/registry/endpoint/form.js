/* eslint-disable react/forbid-prop-types */
import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import {
    FormsySelect,
    FormsyText
} from 'formsy-material-ui/lib';
import DataSourceMixin from '../../../../mixins/data-source-mixin';
import httpMethods from '../../../../../../domain/registry/endpoints/methods';
import FormContainer from '../../../../common/form/container';

const PATH_NAME = ['data', 'name'];
const PATH_URL = ['data', 'url'];
const PATH_METHOD = ['data', 'method'];

export default React.createClass({
    propTypes: {
        source: React.PropTypes.object,
        actions: React.PropTypes.object
    },

    mixins: [
        DataSourceMixin
    ],

    _renderHttpMethodsDropdown() {
        return (
            <FormsySelect
                name="method"
                floatingLabelText="HTTP Method"
                disabled={this.isLoading()}
                value={this.props.source.getIn(PATH_METHOD)}
                fullWidth
                required
            >
                {httpMethods.toSeq().map((value, key) => {
                    const itemKey = key;
                    return (
                        <MenuItem
                            key={itemKey}
                            value={value}
                            primaryText={key}
                        />
                    );
                }).toArray()}
            </FormsySelect>
        );
    },

    render() {
        return (
            <FormContainer
                title="Endpoint"
                actions={this.props.actions}
                source={this.props.source}
            >
                <FormsyText
                    name="name"
                    floatingLabelText="Name"
                    value={this.props.source.getIn(PATH_NAME)}
                    fullWidth
                    required
                />
                <FormsyText
                    name="url"
                    floatingLabelText="Url"
                    value={this.props.source.getIn(PATH_URL)}
                    validations="isUrl"
                    validationError="Invalid url"
                    fullWidth
                    required
                />
                {this._renderHttpMethodsDropdown()}
            </FormContainer>
        );
    }
});
