import { Record } from 'immutable';

const PeripheralModel = Record({
    key: '',
    kind: '',
    proximity: '',
    registered: false,
    time: null
});

export default function create(values) {
    return new PeripheralModel(values);
}
