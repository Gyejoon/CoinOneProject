var globalbtc = localStorage.getItem('btc');
var globaleth = localStorage.getItem('eth');
var globalbch = localStorage.getItem('bch');
var globalltc = localStorage.getItem('ltc');
var globaletc = localStorage.getItem('etc');
var globalxrp = localStorage.getItem('xrp');

$(function(){

    var update = localStorage.getItem('update');

    if(update == null){
        setTimeout("location.reload();", 30000);
    } else {
        $(".update").val(update).prop("selected", true);
        setTimeout("location.reload();", update);
    }

    if(globalbtc != null) $(".btc").prop("checked", stringToBoolean(globalbtc));
    if(globaleth != null) $(".eth").prop("checked", stringToBoolean(globaleth));
    if(globalbch != null) $(".bch").prop("checked", stringToBoolean(globalbch));
    if(globalltc != null) $(".ltc").prop("checked", stringToBoolean(globalltc));
    if(globaletc != null) $(".etc").prop("checked", stringToBoolean(globaletc));
    if(globalxrp != null) $(".xrp").prop("checked", stringToBoolean(globalxrp));

    getTicker();

    $(".update").change(function(){
        localStorage.setItem('update', $(this).val());
        location.reload();
    });

    $(".reset").click(function(){
        localStorage.clear();
        location.reload();
    });

    $(".apply").click(function(){

        var localBTC = $(".btc").prop("checked");
        var localETH = $(".eth").prop("checked");
        var localBCH = $(".bch").prop("checked");
        var localLTC = $(".ltc").prop("checked");
        var localETC = $(".etc").prop("checked");
        var localXRP = $(".xrp").prop("checked");

        localStorage.setItem('btc', localBTC);
        localStorage.setItem('eth', localETH);
        localStorage.setItem('bch', localBCH);
        localStorage.setItem('ltc', localLTC);
        localStorage.setItem('etc', localETC);
        localStorage.setItem('xrp', localXRP);

        location.reload();
    });

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
            var coinOne = data.coinOne;
            var poloniex = data.poloniex;
            var rate = data.exchange[2].rate;

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

                if(globalbtc != null){
                    if(stringToBoolean(globalbtc))
                        addTable(btc.currency, btc.last, btcusd, btcusd * rate, btc.yesterday_last, btc.volume);
                } else {
                    addTable(btc.currency, btc.last, btcusd, btcusd * rate, btc.yesterday_last, btc.volume);
                }

                if(globaleth != null){
                    if(stringToBoolean(globaleth))
                        addTable(eth.currency, eth.last, ethusd, ethusd * rate, eth.yesterday_last, eth.volume);
                } else {
                    addTable(eth.currency, eth.last, ethusd, ethusd * rate, eth.yesterday_last, eth.volume);
                }

                if(globalbch != null){
                    if(stringToBoolean(globalbch))
                        addTable(bch.currency, bch.last, bchusd, bchusd * rate, bch.yesterday_last, bch.volume);
                } else {
                    addTable(bch.currency, bch.last, bchusd, bchusd * rate, bch.yesterday_last, bch.volume);
                }

                if(globalltc != null){
                    if(stringToBoolean(globalltc))
                        addTable(ltc.currency, ltc.last, ltcusd, ltcusd * rate, ltc.yesterday_last, ltc.volume);
                } else {
                    addTable(ltc.currency, ltc.last, ltcusd, ltcusd * rate, ltc.yesterday_last, ltc.volume);
                }

                if(globaletc != null){
                    if(stringToBoolean(globaletc))
                        addTable(etc.currency, etc.last, etcusd, etcusd * rate, etc.yesterday_last, etc.volume);
                } else {
                    addTable(etc.currency, etc.last, etcusd, etcusd * rate, etc.yesterday_last, etc.volume);
                }

                if(globalxrp != null){
                    if(stringToBoolean(globalxrp))
                        addTable(xrp.currency, xrp.last, xrpusd, xrpusd * rate, xrp.yesterday_last, xrp.volume);
                } else {
                    addTable(xrp.currency, xrp.last, xrpusd, xrpusd * rate, xrp.yesterday_last, xrp.volume);
                }

            }
        }
    });
};

var addTable = function(krw, krwlast, usdlast, usdkrw, yesterdaylast, volume){

    var margin = krwlast - Math.round(usdkrw);
    var before = krwlast - yesterdaylast;
    var margincolor =  margin > 0 ? '<span class="red">' : '<span class="blue">';
    var beforecolor = before > 0 ? '<span class="red">' : '<span class="blue">';

    $(".tbody").append(
        '<tr>'
        + '<td><b>' + krw.toUpperCase() + '</b></td>'
        + '<td>&#8361<span>' + numberWithCommas(krwlast) + '</span></td>'
        + '<td>$' + numberWithCommas(Math.round(usdlast * 100)/100) + '</td>'
        + '<td>&#8361<span>' + numberWithCommas(Math.round(usdkrw)) + '</span></td>'
        + '<td>&#8361' + margincolor + numberWithCommas(margin) + ' (' + Math.round((margin / Math.round(usdkrw) * 100) * 100) / 100 + '%)' + '</span></td>'
        + '<td>&#8361' + beforecolor + numberWithCommas(before) + ' (' + Math.round((before / krwlast * 100) * 100) / 100  + '%)' + '</span></td>'
        + '<td>&#8361<span>' + numberWithCommas(Math.round(volume) * krwlast) + '</span></td>'
        + '</tr>'
    );
};


function numberWithCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
function stringToBoolean(x) { return x === 'true'; }
