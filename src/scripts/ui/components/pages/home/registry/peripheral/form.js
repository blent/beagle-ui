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
import FormsyNumber from '../../../../common/number/number';
import FormsyUuid from '../../../../common/uuid/uuid';

const PATH_NAME = ['data', 'name'];
const PATH_ENABLED = ['data', 'enabled'];
const PATH_KIND = ['data', 'kind'];
const PATH_UUID = ['data', 'uuid'];
const PATH_MAJOR = ['data', 'major'];
const PATH_MINOR = ['data', 'minor'];
const VALIDATION_MAJOR_MINOR = {
    minValue: 1
};

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
                name="kind"
                floatingLabelText="Peripheral kind"
                disabled={this.isLoading()}
                value={this.props.source.getIn(PATH_KIND)}
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

    _renderIBeaconFields() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs">
                        <div className="box">
                            <FormsyUuid
                                name="uuid"
                                floatingLabelText="UUID"
                                value={this.props.source.getIn(PATH_UUID)}
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
                                name="major"
                                floatingLabelText="major"
                                value={this.props.source.getIn(PATH_MAJOR)}
                                validations={VALIDATION_MAJOR_MINOR}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-xs">
                        <div className="box">
                            <FormsyNumber
                                name="minor"
                                floatingLabelText="minor"
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
            <Form
                title={'Peripheral'}
                actions={this.props.actions}
                source={this.props.source}
                onChange={this._onChange}
            >
                {this._renderKindDropdown()}
                <FormsyText
                    name="name"
                    floatingLabelText="Peripheral name"
                    value={this.props.source.getIn(PATH_NAME)}
                    fullWidth
                    required
                />
                <FormsyCheckbox
                    className="form-control-checkbox"
                    name="enabled"
                    label="Enabled"
                    defaultChecked={this.props.source.getIn(PATH_ENABLED)}
                />
                {this._renderPeripheralSpecificFields()}
            </Form>
        );
    }
});
