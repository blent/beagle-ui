import Endpoint from '../models/endpoints/endpoint';
import Api from './core/api';

export default class EndpointsApi extends Api {
    constructor(client) {
        super({
            client,
            mapper: Endpoint,
            endpoints: {
                query: 'registry/endpoints',
                fetch: 'registry/endpoint',
                save: 'registry/endpoint',
                delete: 'registry/endpoint',
                deleteMany: 'registry/endpoints'
            }
        });
    }
}
