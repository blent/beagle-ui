export default class ApiError extends Error {
    constructor(err) {
        super(err.message);

        this.status = err.response ? err.response.status : -1;
        this.statusText = err.response ? err.response.statusText : '';
    }
}
