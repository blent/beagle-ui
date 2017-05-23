export default {
    isLoading() {
        return this.props.source.get('isLoading') === true;
    },

    hasError() {
        return this.props.source.get('error') == null;
    },

    getError() {
        return this.props.source.get('error');
    },

    getErrorText() {
        const err = this.getError();

        if (err == null) {
            return null;
        }

        return err.toString();
    },

    getData() {
        return this.props.source.get('data');
    }
};
