import React from 'react';
import {
    placeholder as placeholderCss
} from './placeholder.css';

export default function EmptyLoader() {
    return (
        <div
            className={placeholderCss}
        />
    );
}
