export function onAsyncComplete(that, actionName) {
    return (data) => {
        const action = that[`${actionName}Complete`];

        action.call(that, data);
    };
}

export function onAsyncFail(that, actionName) {
    return (reason) => {
        const action = that[`${actionName}Fail`];

        if (that.notifications) {
            that.notifications.error(`Failed to ${actionName} ${that.name}`, reason.toString());
        }

        action.call(that, reason);
    };
}
