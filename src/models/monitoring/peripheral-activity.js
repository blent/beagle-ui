import { Record } from 'immutable';

const PeripheralActivity = Record({
    key: '',
    kind: '',
    proximity: '',
    registered: false,
    time: null
}, 'PeripheralActivity');

export default function create(values) {
    return new PeripheralActivity(values);
}
