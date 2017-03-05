import React from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Link } from 'react-router';
import {
    container as containerCss
} from './menu.css';

export default function Menu() {
    return (
        <Paper className={containerCss}>
            <List>
                <Subheader>Monitoring</Subheader>
                <ListItem
                    key="monitoring-activity"
                    containerElement={<Link to="/home/monitoring/activity" />}
                    primaryText="Active"
                />
            </List>
            <List>
                <Subheader>Registry</Subheader>
                <ListItem
                    key="registry-target"
                    containerElement={<Link to="/home/registry/target" />}
                    primaryText="Target"
                />
                <ListItem
                    key="registry-subscriber"
                    containerElement={<Link to="/home/registry/subscriber" />}
                    primaryText="Subscriber"
                />
            </List>
            <List>
                <Subheader>History</Subheader>
                <ListItem
                    key="history-activity"
                    containerElement={<Link to="/home/history/activity" />}
                    primaryText="Activity"
                />
            </List>
        </Paper>
    );
}
