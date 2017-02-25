import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Card,
    CardText,
    CardActions
} from 'material-ui/Card';
import Loader from '../../common/loader/loader';

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

    _onSubmit(evt) {
        evt.preventDefault();

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
            <Card>
                <CardText>
                    <form onSubmit={evt => this._onSubmit(evt)}>
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
                    </form>
                </CardText>
                <CardActions>
                    <RaisedButton
                        label={this._btnLabel()}
                        primary="true"
                        disabled={this._isLoading()}
                    />
                </CardActions>
            </Card>
        );
    }
});
