export default function create(authentication) {
    return (nextState, replace, done) => {
        return authentication.isAuthenticated().then((isAuth) => {
            if (isAuth) {
                replace('/home/overview');
            }

            done();

            return null;
        }).catch(done);
    };
}
