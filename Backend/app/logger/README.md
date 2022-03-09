# How to implement the logger

Import the `index.js` file from this folder into your module and use the exported object as a generic winston logger.

## Example
```js
const logger = require('../logger');

const exampleModule = {
  exampleMethod(object, string, number, integer) {
    logger.debug('Here is my object: %o', object);
    logger.info('Here is my string: %s', string);
    logger.warn('Here is my number: %d', number);
    logger.error('Here is my integer: %i', integer);
  },
};

module.exports = exampleModule;
```

For more information about the availible logging API, check out the [winston repository's README](https://github.com/winstonjs/winston).

## Warning
Try not to print user supplied information directly, (just in case there is another log4shell exploit out there for `winston`) and instead use the string interpolation with the options found [here](https://nodejs.org/dist/latest/docs/api/util.html#util_util_format_format_args).
