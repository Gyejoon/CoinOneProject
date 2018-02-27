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

    request.get(config.CoineoneUrl, function(error, response, coinOne) {
        if(error) throw error;

        request.get(config.PoloniexUrl, function(error2, response2, poloniex){
            if(error2) throw error2;

            request.get(config.exchangeUrl, function(error3, response3, exchange){
                if(error3) throw error3;

                var data1 = JSON.parse(coinOne);
                var data2 = JSON.parse(poloniex);
                var data3 = JSON.parse(exchange);

                res.json({
                    coinOne: data1,
                    poloniex: data2,
                    exchange: data3
                });
            });
        });
    });


});


module.exports = router;
