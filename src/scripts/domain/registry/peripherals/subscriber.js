import { Record } from 'immutable';
import Endpoint from '../endpoints/endpoint';

const Subscriber = Record({
    id: null,
    name: null,
    event: null,
    enabled: null,
    endpoint: null
});

export default function create(values) {
    return new Subscriber({
        id: values.id,
        name: values.name,
        event: values.event,
        enabled: values.enabled,
        endpoint: Endpoint(values.endpoint)
    });
}
