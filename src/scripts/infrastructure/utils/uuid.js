/* eslint-disable max-len */
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import size from 'lodash/size';

const MATCH_PATTERN = /^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/i;

/*
* Splits uuid into chunks.
*/
export function split(uuid) {
    if (isEmpty(uuid)) {
        return [];
    }

    const matches = uuid
              .replace(/-/g, '')
              .match(MATCH_PATTERN);

    if (isEmpty(matches)) {
        return [];
    }

    return matches.splice(1);
}

/*
* Join uuid chunks.
*/
export function join(values = []) {
    return values.join('');
}

/*
*  Normalizes Beacon's uuid, removing dash characters.
*/
export function normalize(uuid) {
    if (isEmpty(uuid)) {
        return '';
    }

    return (uuid || '').replace(/-/g, '').toLowerCase();
}

/*
* Formats uuid for ui.
*/
export function format(uuid) {
    let str = uuid;

    if (isArray(uuid)) {
        str = uuid.join('');
    }

    const len = size(str);

    if (len <= 8) {
        return str;
    }

    if (len <= 12) {
        return `${str.substr(0, 8)}-${str.substr(8, 4)}`;
    }

    if (len <= 16) {
        return `${str.substr(0, 8)}-${str.substr(8, 4)}-${str.substr(12, 4)}`;
    }

    if (len <= 20) {
        return `${str.substr(0, 8)}-${str.substr(8, 4)}-${str.substr(12, 4)}-${str.substr(16, 4)}`;
    }

    return `${str.substr(0, 8)}-${str.substr(8, 4)}-${str.substr(12, 4)}-${str.substr(16, 4)}-${str.substr(20, 12)}`;
}
