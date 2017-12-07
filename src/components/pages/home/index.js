/* eslint-disable react/prop-types  */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Menu from './menu';
import styles from './index.module.css';

export default function Home({ children }) {
    return (
        <div className={styles.container}>
            <AppBar
                title="Beagle"
                className={styles.bar}
            />

            <div className={styles.body}>
                <div className={styles.content}>
                    {children}
                </div>
                <Menu />
            </div>
        </div>
    );
}
