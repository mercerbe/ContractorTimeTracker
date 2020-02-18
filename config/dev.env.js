"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_API_KEY: '"AIzaSyCvJb0055i0x3GfZwSWqVgyR-_Fo3BREM8"',
  VUE_APP_AUTH_DOMAIN: '"contractortimetracker.firebaseapp.com"',
  VUE_APP_DATABASE_URL: '"https://contractortimetracker.firebaseio.com"',
  VUE_APP_PROJECT_ID: '"contractortimetracker"',
  VUE_APP_STORAGE_BUCKET: '"contractortimetracker.appspot.com"',
  VUE_APP_MESSAGING_SENDER_ID: '"28383091564"',
  VUE_APP_APP_ID: '"1:28383091564:web:4870ccb01a1879acf83149"',
  VUE_APP_MEASUREMENT_ID: '"G-QHLLLVPWS6"'
});
