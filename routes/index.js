var express = require('express');
var api = require('./api');
var view = require('./view');

var router = express.Router();

router.use('/', view);
router.use('/api', api);

module.exports = router;
