/* eslint-disable react/prop-types, max-len */
import React from 'react';
import capitalize from 'lodash/capitalize';

function getSafe(data, key) {
    if (data == null) {
        return '';
    }

    return data.get(key);
}

function toString(data) {
    return `${capitalize(getSafe(data, 'os'))} ${capitalize(getSafe(data, 'platform'))} ${getSafe(data, 'arch')} ${getSafe(data, 'kernel')}`;
}

export default function GeneralState({ data }) {
    return (
        <div>
            <h4>
                <span>
                    {toString(data)}
                </span>
            </h4>
        </div>
    );
}
