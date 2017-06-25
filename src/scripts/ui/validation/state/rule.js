import { Record } from 'immutable';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import notEmpty from '../rules/not-empty';
import notEmptyString from '../rules/not-empty-string';
import number from '../rules/number';
import required from '../rules/required';
import oneOf from '../rules/one-of';

const RULES = {
    notEmpty,
    notEmptyString,
    number,
    required,
    oneOf
};

const DEFAULT_MESSAGE = 'Invalid value';
const Rule = Record({
    fn: null,
    message: DEFAULT_MESSAGE
});

function assertName(name) {
    if (isString(name) === false) {
        throw new TypeError(`Expected rule name to be "string", but got "${typeof name}"`);
    }

    if (RULES[name] == null) {
        throw new TypeError(`Invalid validation rule name: ${name}`);
    }
}

function withParams(name, params) {
    let fn = name;

    if (isString(fn) === true) {
        assertName(name);
        fn = RULES[name];
    }

    if (params == null) {
        return fn;
    }

    return (values, value) => fn(values, value, params);
}

function withMessage(msg) {
    return msg || DEFAULT_MESSAGE;
}

export default function create(definition) {
    let fn = null;
    let message = DEFAULT_MESSAGE;

    if (isString(definition)) {
        assertName(definition);

        fn = RULES[definition];
    } else if (isPlainObject(definition)) {
        fn = withParams(definition.name, definition.options);
        message = withMessage(definition.message);
    } else if (isArray(definition)) {
        fn = withParams(definition[0], definition[1]);
        message = withMessage(definition[2]);
    } else if (isFunction(definition)) {
        fn = definition;
    } else {
        throw new TypeError(`Invalid validation rule format: ${typeof definition}`);
    }

    return new Rule({ fn, message });
}
