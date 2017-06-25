import { Record, List } from 'immutable';
import map from 'lodash/map';
import Rule from './rule';

const DEFAULT_STATE = {
    name: null,
    isValid: true,
    message: null,
    rules: null
};

const ValidationFieldState = Record(DEFAULT_STATE);

export default function create(values = DEFAULT_STATE, name = '') {
    return new ValidationFieldState({
        name,
        isValid: values.isValid == null ? DEFAULT_STATE.isValid : values.isValid,
        message: values.message,
        rules: List(map(values.rules, Rule))
    });
}
