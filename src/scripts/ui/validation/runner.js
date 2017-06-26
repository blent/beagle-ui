import isFunction from 'lodash/isFunction';

export function isStateValid(state) {
    return state.fields.every(i => i.isValid);
}

export function fieldRunner(field, values, verbose = true) {
    return field.withMutations((input) => {
        const that = input;
        const value = values[field.name];

        that.isValid = that.rules.every((rule) => {
            if (rule.fn(values, value) === false) {
                that.isValid = false;

                if (verbose !== false) {
                    if (isFunction(rule.message) === false) {
                        that.message = rule.message;
                    } else {
                        that.message = rule.message(field.name, value);
                    }
                }

                return false; // exit
            }

            that.message = null;

            return true;
        });
    });
}

export function stateRunner(state, values, verbose = true) {
    return state.withMutations((input) => {
        const that = input;
        const seq = that.fields.keys();

        let item = seq.next();

        while (item.done === false) {
            const fieldName = item.value;
            const fieldResult = fieldRunner(that.fields.get(fieldName), values, verbose);

            if (fieldResult.isValid === false) {
                that.isValid = false;
                that.setIn(['fields', fieldName], fieldResult);
            }

            item = seq.next();
        }
    });
}
