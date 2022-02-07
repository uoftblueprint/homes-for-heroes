const QueryData = function() {
    this.appendQueryParam = function(param, column) {
        if (!param) return;
        const sub = `${column} = "${param}"`;
        this.query = (this.query) ? `${this.query} AND ${sub}` : sub;
    }
}

module.exports = QueryData;
