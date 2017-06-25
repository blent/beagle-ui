import isEmpty from 'lodash/isEmpty';

export default function notEmpty(values, value) {
    return isEmpty(value) === false;
}
