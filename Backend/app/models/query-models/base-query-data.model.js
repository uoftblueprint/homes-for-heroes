const QueryData = function() {
  this.appendQueryParam = function(param, column) {
    if (!param) return;
    const sub = `${column} = ?`;
    this.query = (this.query) ? `${this.query} AND ${sub}` : sub;
    this.queryArray.push(param);
  };

  this.appendQueryParamNonStr = function(param, column) {
    if (param == null) return;
    const sub = `${column} = ?`;
    this.query = (this.query) ? `${this.query} AND ${sub}` : sub;
    this.queryArray.push(param);
  };

  this.appendQueryParamKeyword = function(param, column) {
    if (param == null) return;
    const sub = `${column} LIKE %?%`;
    this.query = (this.query) ? `${this.query} AND ${sub}` : sub;
    this.queryArray.push(param);
  }

  this.appendUpdateParam = function(param, column) {
    if (param == null) return;
    const sub = `${column} = ?`;
    this.query = (this.query) ? `${this.query}, ${sub}` : sub;
    this.queryArray.push(param);
  };
};

module.exports = QueryData;
