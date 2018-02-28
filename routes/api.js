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

    request.get(config.CoineoneUrl + 'ticker?currency=all', function(error, response, coinOne) {
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

/**
    API 키 등록
    @param accessToken
    @param secretKey
    accessToken과 secretKey를 입력받아 세션에 저장한다.
**/
router.post('/login', function(req, res){

    var accessToken = req.body.accessToken;
    var secretKey = req.body.secretKey;

    var session = req.session;
    session.loginInfo = {accessToken: accessToken, secretKey: secretKey};

    return res.redirect('/');
});


/**
    API 키 삭제
    @param accessToken
    @param secretKey
    세션정보를 삭제한다.
**/
router.get('/logout', function(req, res){

    req.session.destroy(err => { if(err) throw err; });

    return res.redirect('/');
});

/**
    API 키를 이용하여 코인원 내 정보 가져오기
**/
router.get('/getInfo', function(req, res){

    var session = req.session.loginInfo;

    if(session != undefined){
        var payload = {
            "access_token" : session.accessToken,
            "nonce": Date.now()
        };

        payload = new Buffer(JSON.stringify(payload)).toString('base64');

        var signature = crypto
            .createHmac("sha512", session.secretKey.toUpperCase())
            .update(payload)
            .digest('hex');

        var headers = {
            'content-type':'application/json',
            'X-COINONE-PAYLOAD': payload,
            'X-COINONE-SIGNATURE': signature
        };

        var options = {
            url: config.CoineoneUrl + 'v2/account/user_info/',
            headers: headers,
            body: payload
        };

        request.post(options, function(error, response, body){
            if(error) throw error;

            res.send(body);
        });
    } else {
        res.json({message: "로그인이 필요합니다."});
    }

});

module.exports = router;
