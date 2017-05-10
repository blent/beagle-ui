/* eslint-disable react/forbid-prop-types */
import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import {
    FormsyToggle,
    FormsySelect,
    FormsyText
} from 'formsy-material-ui/lib';
import isNil from 'lodash/isNil';
import DataSourceMixin from '../../../../mixins/data-source-mixin';
import KINDS from '../../../../../../domain/registry/peripherals/kinds';
import FormContainer from '../../../../common/form/container';
import FormsyNumber from '../../../../common/number/number';
import FormsyUuid from '../../../../common/uuid/uuid';
import Subscribers from './subscribers';

const PATH_NAME = ['data', 'name'];
const PATH_ENABLED = ['data', 'enabled'];
const PATH_KIND = ['data', 'kind'];
const PATH_UUID = ['data', 'uuid'];
const PATH_MAJOR = ['data', 'major'];
const PATH_MINOR = ['data', 'minor'];
const PATH_ID = ['data', 'id'];
const PATH_SUBSCRIBERS = ['data', 'subscribers'];
const VALIDATION_MAJOR_MINOR = {
    minValue: 1
};

const KIND_OPTIONS = KINDS.toSeq().map((value, key) => {
    const itemKey = key;
    return (
        <MenuItem
            key={itemKey}
            value={value}
            primaryText={value}
        />
    );
}).toArray();

export default React.createClass({
    propTypes: {
        source: React.PropTypes.object,
        actions: React.PropTypes.object
    },

    mixins: [
        DataSourceMixin
    ],

    getInitialState() {
        return {
            kind: this.props.source.getIn(PATH_KIND)
        };
    },

    _isNew() {
        const id = this.props.source.getIn(PATH_ID);
        return isNil(id) || id === 0;
    },

    _onChange(values) {
        if (this.state.kind !== values.kind) {
            this.setState({
                kind: values.kind
            });
        }
    },

    _renderKindDropdown() {
        return (
            <FormsySelect
                group="1"
                name="kind"
                floatingLabelText="Peripheral kind"
                disabled={this.isLoading() || !this._isNew()}
                value={this.props.source.getIn(PATH_KIND)}
                fullWidth
                required
            >
                {KIND_OPTIONS}
            </FormsySelect>
        );
    },

    _renderIBeaconFields() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs">
                        <div className="box">
                            <FormsyUuid
                                group="1"
                                name="uuid"
                                floatingLabelText="UUID"
                                value={this.props.source.getIn(PATH_UUID)}
                                disabled={this.isLoading() || !this._isNew()}
                                validations="isUUID"
                                validationError="Invalid format"
                                required
                                fullWidth
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs">
                        <div className="box">
                            <FormsyNumber
                                group="1"
                                name="major"
                                floatingLabelText="major"
                                disabled={this.isLoading() || !this._isNew()}
                                value={this.props.source.getIn(PATH_MAJOR)}
                                validations={VALIDATION_MAJOR_MINOR}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-xs">
                        <div className="box">
                            <FormsyNumber
                                group="1"
                                name="minor"
                                floatingLabelText="minor"
                                disabled={this.isLoading() || !this._isNew()}
                                value={this.props.source.getIn(PATH_MINOR)}
                                validations={VALIDATION_MAJOR_MINOR}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    _renderPeripheralSpecificFields() {
        if (this.state.kind === 'ibeacon') {
            return this._renderIBeaconFields();
        }

        return null;
    },

    render() {
        return (
            <FormContainer
                title={'Peripheral'}
                actions={this.props.actions}
                source={this.props.source}
                onChange={this._onChange}
                useGroups
            >
                {this._renderKindDropdown()}
                <FormsyText
                    group="1"
                    name="name"
                    floatingLabelText="Peripheral name"
                    disabled={this.isLoading()}
                    value={this.props.source.getIn(PATH_NAME)}
                    fullWidth
                    required
                />
                {this._renderPeripheralSpecificFields()}
                <FormsyToggle
                    group="1"
                    className="form-control-checkbox"
                    name="enabled"
                    label="Enabled"
                    labelPosition="right"
                    disabled={this.isLoading()}
                    value={this.props.source.getIn(PATH_ENABLED)}
                    defaultToggled={this.props.source.getIn(PATH_ENABLED)}
                />
                <Subscribers
                    group="2"
                    name="subscribers"
                    disabled={this.isLoading()}
                    loading={this.isLoading()}
                    value={this.props.source.getIn(PATH_SUBSCRIBERS)}
                />
            </FormContainer>
        );
    }
});
