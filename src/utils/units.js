/* eslint-disable no-restricted-properties */
const SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const FACTOR = 1000;

export function getBytesRatio(bytes) {
    return Math.floor(Math.log(bytes) / Math.log(FACTOR));
}

export function roundBytes(bytes, ratio, decimals = 2) {
    if (!bytes) {
        return 0;
    }

    return parseFloat((bytes / Math.pow(FACTOR, ratio)).toFixed(decimals));
}

export function formatBytes(bytes, decimals) {
    if (bytes === 0) {
        return '0 Bytes';
    }

    const r = getBytesRatio(bytes);

    return `${roundBytes(bytes, r, decimals)} ${SIZES[r]}`;
}

export function bytesToGigabytes(bytes = 1) {
    return bytes / Math.pow(1024, 3);
}
