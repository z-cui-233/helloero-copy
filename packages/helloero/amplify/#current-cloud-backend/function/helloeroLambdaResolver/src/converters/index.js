/* eslint-disable @typescript-eslint/no-var-requires */
const { mapWabikenResponse } = require('./wabiken.js');
const { mapPlayInfo } = require('./playInfo.js');
const { mapWabitErrorResponse } = require('./error.js');

module.exports = {
  mapPlayInfo,
  mapWabitErrorResponse,
  mapWabikenResponse,
};
