export default function create(peripherals, defaultQuery) {
    return (nextState, replace, done) => {
        peripherals.find(defaultQuery);
        done();
    };
}
