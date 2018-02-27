var express = require('express');
var crypto = require('crypto');
var request = require('request');
var config = require('../config/config');

var router = express.Router();

/**
    코인 리스트 출력
    코인원과 Poloniex의 코인 시세 출력
**/
router.get('/ticker', function(req, res){

    request.get(config.CoineoneUrl + '/ticker?currency=all', function(error, response, coinOne) {
        if(error) throw error;

        request.get(config.PoloniexUrl, function(error2, response2, poloniex){
            if(error2) throw error2;
            
            var data1 = JSON.parse(coinOne);
            var data2 = JSON.parse(poloniex);

            res.json({
                coinOne: data1,
                poloniex: data2
            });
        });
    });


});


module.exports = router;
