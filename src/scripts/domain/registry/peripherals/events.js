import { Record } from 'immutable';

const PeripheralEvents = Record({
    ALL: '*',
    FOUND: 'found',
    LOST: 'lost'
});

export default new PeripheralEvents();
