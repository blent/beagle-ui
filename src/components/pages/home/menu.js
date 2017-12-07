import React from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router';
import styles from './menu.module.css';

export default function Menu() {
    return (
        <Paper className={styles.container}>
            <List>
                <Subheader>Monitoring</Subheader>
                <ListItem
                    key="monitoring-activity"
                    containerElement={<Link to="/home/monitoring/activity" />}
                    primaryText="Activity"
                />
                <ListItem
                    key="monitoring-system"
                    containerElement={<Link to="/home/monitoring/system" />}
                    primaryText="System"
                />
            </List>
            <List>
                <Subheader>Registry</Subheader>
                <ListItem
                    key="registry-peripherals"
                    containerElement={<Link to="/home/registry/peripherals" />}
                    primaryText="Peripherals"
                />
                <ListItem
                    key="registry-endpoints"
                    containerElement={<Link to="/home/registry/endpoints" />}
                    primaryText="Endpoints"
                />
            </List>
            <List>
                <Subheader>History</Subheader>
                <ListItem
                    key="history-activity"
                    containerElement={<Link to="/home/history/activity" />}
                    primaryText="Activity"
                />
                <ListItem
                    key="history-delivery"
                    containerElement={<Link to="/home/history/delivery" />}
                    primaryText="Delivery"
                />
            </List>
        </Paper>
    );
}
