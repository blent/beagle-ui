export default function create(actions, defaultQuery) {
    return (nextState, replace, done) => {
        actions.find(defaultQuery);
        done();
    };
}
