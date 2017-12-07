import includes from 'lodash/includes';

export default function oneOf(values, value, options) {
    return includes(options, value);
}
