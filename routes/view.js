var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
    res.render('index.ejs', {loginInfo: req.session.loginInfo});
});

router.get('/login', function(req, res){
    res.render('login.ejs');
});

module.exports = router;
