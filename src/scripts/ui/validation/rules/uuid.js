const REGEXP = new RegExp(/^[0-9a-fA-F]{32}$/);

export default function isUuid(values, value) {
    return REGEXP.test(value);
}
