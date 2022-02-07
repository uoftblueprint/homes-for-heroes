const catchAllErrorHandler = (error, req, res) => {
  // TODO: Implement production level logging
  console.error(req.method, req.url, error);
  res.status(500).send(error);
}

module.exports = catchAllErrorHandler;