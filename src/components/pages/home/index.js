/* eslint-disable react/prop-types  */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Menu from './menu';
import {
    container as containerCss,
    body as bodyCss,
    content as contentCss,
    bar as barCss
} from './index.css';

export default function Home({ children }) {
    return (
        <div className={containerCss}>
            <AppBar
                title="Beagle"
                className={barCss}
            />

            <div className={bodyCss}>
                <div className={contentCss}>
                    {children}
                </div>
                <Menu />
            </div>
        </div>
    );
}
