import Api from './core/api';
import Stats from '../models/monitoring/stats';

export default class SystemMonitoringApi extends Api {
    constructor(client) {
        super({
            client,
            mapper: Stats,
            endpoints: {
                query: 'monitoring/system'
            }
        });
    }
}
