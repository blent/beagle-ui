import { Record } from 'immutable';

const Credentials = Record({
    username: '',
    authenticated: false
}, 'Credentials');

export default function create(value) {
    return new Credentials(value);
}
