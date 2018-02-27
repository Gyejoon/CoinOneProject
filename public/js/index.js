// 환율 정보 API
var URI = {
    exchange: 'http://api.manana.kr/exchange/rate.json'
};

$(function(){

    getTicker();

    setTimeout("location.reload();", 20000);

});


var getTicker = function(){

    $.ajax({
        type: 'GET',
        url: '/api/ticker',
        dataType: "json",
        error: function(err){
            alert('통신중 에러가 발생했습니다.');
        },
        success: function(data){
            $.ajax(URI.exchange).done(function(exchange){
                var coinOne = data.coinOne;
                var poloniex = data.poloniex;
                var rate = exchange[2].rate;

                if(coinOne.errorCode === "0"){

                    var btc = coinOne.btc;
                    var eth = coinOne.eth;
                    var bch = coinOne.bch;
                    var ltc = coinOne.ltc;
                    var etc = coinOne.etc;
                    var xrp = coinOne.xrp;

                    var btcusd = poloniex.USDT_BTC.last;
                    var ethusd = poloniex.USDT_ETH.last;
                    var bchusd = poloniex.USDT_BCH.last;
                    var ltcusd = poloniex.USDT_LTC.last;
                    var etcusd = poloniex.USDT_ETC.last;
                    var xrpusd = poloniex.USDT_XRP.last;

                    addTable(btc.currency, btc.last, btcusd, btcusd * rate, btc.yesterday_last, btc.volume);
                    addTable(eth.currency, eth.last, ethusd, ethusd * rate, eth.yesterday_last, eth.volume);
                    addTable(bch.currency, bch.last, bchusd, bchusd * rate, bch.yesterday_last, bch.volume);
                    addTable(ltc.currency, ltc.last, ltcusd, ltcusd * rate, ltc.yesterday_last, ltc.volume);
                    addTable(etc.currency, etc.last, etcusd, etcusd * rate, etc.yesterday_last, etc.volume);
                    addTable(xrp.currency, xrp.last, xrpusd, xrpusd * rate, xrp.yesterday_last, xrp.volume);
                }
            });
        }
    });
};

var addTable = function(krw, krwlast, usdlast, usdkrw, yesterdaylast, volume){
    $(".tbody").append(
        '<tr>'
        + '<td><b>' + krw.toUpperCase() + '</b></td>'
        + '<td>&#8361<span>' + numberWithCommas(krwlast) + '</span></td>'
        + '<td>$' + numberWithCommas(Math.round(usdlast * 100)/100) + '</td>'
        + '<td>&#8361<span>' + numberWithCommas(Math.round(usdkrw)) + '</span></td>'
        + '<td>&#8361<span class="red">' + numberWithCommas(krwlast - Math.round(usdkrw)) + '</span></td>'
        + '<td>&#8361<span class="blue">' + numberWithCommas(krwlast - yesterdaylast) + '</span></td>'
        + '<td>&#8361<span>' + numberWithCommas(Math.round(volume) * krwlast) + '</span></td>'
        + '</tr>'
    );
};


function numberWithCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
