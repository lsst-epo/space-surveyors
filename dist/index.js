
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./space-surveyors.cjs.production.min.js')
} else {
  module.exports = require('./space-surveyors.cjs.development.js')
}
