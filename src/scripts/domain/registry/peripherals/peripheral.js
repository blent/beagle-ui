import { Record } from 'immutable';

const IBeaconPeripheral = Record({
    id: 0,
    kind: null,
    name: null,
    uuid: null,
    major: null,
    minor: null,
    enabled: false,
    subscribers: null
});

export default function create(values) {
    return new IBeaconPeripheral(values);
}
