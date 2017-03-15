import { Record } from 'immutable';

const Endpoint = Record({
    id: 0,
    name: null,
    url: null,
    method: 'GET',
    headers: null
});

export default function create(values) {
    return new Endpoint(values);
}
