const PATH_QUERY_QUERY = ['data', 'query'];
const PATH_QUERY_RESULT = ['data', 'result'];

export default {
    getQueryParams() {
        return this.props.source.getIn(PATH_QUERY_QUERY);
    },

    getQueryResult() {
        return this.props.source.getIn(PATH_QUERY_RESULT);
    }
};
