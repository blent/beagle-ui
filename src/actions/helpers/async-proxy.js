import isFunction from 'lodash/isFunction';
import forEach from 'lodash/forEach';

function handleSuccess(that, actionName, data) {
    const action = that[`${actionName}Complete`];

    return action.call(that, data);
}

function handleFailure(that, actionName, reason) {
    const action = that[`${actionName}Fail`];

    if (that.notifications) {
        that.notifications.error(`Failed to ${actionName} ${that.name}`, reason.toString());
    }

    return action.call(that, reason);
}

function handleResult(that, actionName, res) {
    if (res.ok() === true) {
        return handleSuccess(that, actionName, res.data());
    }

    return handleFailure(that, actionName, res.error());
}

export default function wrap(Class) {
    class AsyncProxy extends Class {}

    const list = Object.getOwnPropertyNames(Class.prototype);

    forEach(list, (name) => {
        if (isFunction(AsyncProxy.prototype[name]) && name !== 'constructor') {
            AsyncProxy.prototype[name] = function asyncMethod(...args) {
                const promise = Class.prototype[name].apply(this, args);

                promise
                    .then((res) => {
                        return handleResult(this, name, res);
                    })
                    .catch((reason) => {
                        return handleFailure(this, name, reason);
                    });

                return null;
            };
        }
    });

    return AsyncProxy;
}
