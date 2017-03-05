export default function create(activity, defaultQuery) {
    return (nextState, replace, done) => {
        activity.find(defaultQuery);
        done();
    };
}
