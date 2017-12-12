import Api from './core/api';
import Peripheral from '../models/peripherals/peripheral';

export default class PeripheralsApi extends Api {
    constructor(client) {
        super({
            client,
            mapper: Peripheral,
            endpoints: {
                query: 'registry/peripherals',
                fetch: 'registry/peripheral',
                save: 'registry/peripheral',
                delete: 'registry/peripheral',
                deleteMany: 'registry/peripherals'
            }
        });
    }
}
