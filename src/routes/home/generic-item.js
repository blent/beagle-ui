export default function create(actions) {
    return (nextState, replace, done) => {
        if (nextState.params.id) {
            actions.get(nextState.params.id);
        } else {
            actions.create();
        }

        done();
    };
}
