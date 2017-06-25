import fieldRunner from './field-runner';

export default function Runner(state, values) {
    return state.withMutations((input) => {
        const that = input;

        that.fields.keys().forEach((fieldName) => {
            const fieldResult = fieldRunner(that.fields.get(fieldName), values);

            if (fieldResult.isValid === false) {
                that.set('isValid', false);
                that.setIn(['fields', fieldName], fieldResult);
            }
        });
    });
}
