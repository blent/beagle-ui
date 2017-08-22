/* eslint-disable react/forbid-prop-types, react/prop-types */
import React from 'react';
import Card from '../card/card';
import Toolbar from './toolbar';

function renderToolbar(props) {
    return (
        <Toolbar
            title={props.title}
            loading={props.loading}
            hideSave={props.hideSave}
            hideDelete={props.hideDelete}
            hideCancel={props.hideCancel}
            disableSave={props.disableSave}
            disableDelete={props.disableDelete}
            disableCancel={props.disableCancel}
            onSaveClick={props.onSaveClick}
            onDeleteClick={props.onDeleteClick}
            onCancelClick={props.onCancelClick}
            submit={props.submit}
        />
    );
}

export default function FormCard(props) {
    return (
        <Card
            key={props.key}
            loading={props.loading}
            toolbarElement={renderToolbar(props)}
        >
            {props.children}
        </Card>
    );
}
