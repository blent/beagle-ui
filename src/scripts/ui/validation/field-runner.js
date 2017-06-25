import isFunction from 'lodash/isFunction';

export default function fieldRunner(field, values) {
    return field.withMutations((input) => {
        const that = input;
        const value = values[field.name];

        that.isValid = that.rules.every((rule) => {
            if (rule.fn(values, value) === false) {
                that.isValid = false;

                if (isFunction(rule.message) === false) {
                    that.message = rule.message;
                } else {
                    that.message = rule.message(field.name, value);
                }

                return false; // exit
            }

            that.message = null;

            return true;
        });
    });
}
