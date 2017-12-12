import Activity from '../models/monitoring/peripheral-activity';
import Api from './core/api';

export default class ActivityMonitoringApi extends Api {
    constructor(client) {
        super({
            client,
            mapper: Activity,
            endpoints: {
                query: 'monitoring/activity'
            }
        });
    }
}
