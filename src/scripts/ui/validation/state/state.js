import { Record, Map } from 'immutable';
import reduce from 'lodash/reduce';
import Field from './field';

const DEFAULT_STATE = {
    isValid: true,
    fields: {}
};

const ValidationState = Record({
    isValid: true,
    fields: Map()
});

export default function create(values = {}) {
    return new ValidationState({
        isValid: values.isValid == null ? DEFAULT_STATE.isValid : values.isValid,
        fields: Map(reduce(values.fields, (result, field, name) => {
            const res = result;

            res[name] = Field(field, name);

            return res;
        }, {}))
    });
}
