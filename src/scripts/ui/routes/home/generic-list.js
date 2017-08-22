export default function create(actions, defaultQuery = null) {
    return (nextState, replace, done) => {
        actions.find(defaultQuery);
        done();
    };
}
