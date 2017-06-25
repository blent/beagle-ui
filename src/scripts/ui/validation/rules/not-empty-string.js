import trim from 'lodash/trim';

export default function notEmpty(values, value) {
    return trim(value).length > 0;
}
