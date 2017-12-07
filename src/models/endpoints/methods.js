import { Record } from 'immutable';

const EndpointMethods = Record({
    GET: 'get',
    POST: 'post'
});

export default new EndpointMethods();
