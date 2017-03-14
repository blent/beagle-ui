import { Record } from 'immutable';

const PeripheralActivityModel = Record({
    key: '',
    kind: '',
    proximity: '',
    registered: false,
    time: null
});

export default function create(values) {
    return new PeripheralActivityModel(values);
}
