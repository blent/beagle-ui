import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Card,
    CardText,
    CardActions
} from 'material-ui/Card';
import Loader from '../../common/loader/loader';
import {
    container as containerStyle
} from './form.css';

const DEFAULT_ERRORS = [];

export default React.createClass({
    propTypes: {
        source: React.PropTypes.object,
        actions: React.PropTypes.object
    },

    getInitialState() {
        return {
            username: this.props.source.getIn(['data', 'username']),
            password: ''
        };
    },

    _isLoading() {
        return this.props.source.get('isLoading');
    },

    _getErrors() {
        const err = this.props.source.get('error');

        if (!err) {
            return DEFAULT_ERRORS;
        }

        return [err.message];
    },

    _onSubmit() {
        if (!this._isLoading()) {
            this.props.actions.login(this.state.username, this.state.password);
        }
    },

    _renderLoader() {
        if (this._isLoading()) {
            return <Loader />;
        }

        return null;
    },

    _btnLabel() {
        if (!this._isLoading()) {
            return 'Login';
        }

        return 'Wait';
    },

    render() {
        return (
            <div className={containerStyle}>
                <Card>
                    <CardText>
                        <div>
                            <div>
                                <TextField
                                    type="string"
                                    floatingLabelText="username"
                                    value={this.state.username}
                                    disabled={this._isLoading()}
                                />
                            </div>
                            <div>
                                <TextField
                                    type="password"
                                    floatingLabelText="password"
                                    value={this.state.password}
                                    disabled={this._isLoading()}
                                />
                            </div>
                        </div>
                    </CardText>
                    <CardActions>
                        <RaisedButton
                            label={this._btnLabel()}
                            primary
                            fullWidth
                            disabled={this._isLoading()}
                            onClick={() => this._onSubmit()}
                        />
                    </CardActions>
                </Card>
            </div>
        );
    }
});
