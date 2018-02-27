var express = require('express');
var crypto = require('crypto');
var request = require('request');
var config = require('../config/config');

var router = express.Router();

/**
    코인 리스트 출력
    @param currency 코인명(특정 코인을 출력하려고 할 때) 없을 시 모든 코인 출력
    @param exchange 거래소명(Coinone, Poloniex) 없을 시 두 거래소 모두 출력
**/
router.get('/ticker', function(req, res){

    var currency = req.body.currency;
    var exchange = req.body.exchange;

    request.get(config.CoineoneUrl + '/ticker?currency=' + currency, function(error, response, coinOne) {
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
