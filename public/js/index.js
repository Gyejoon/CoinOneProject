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
            var coinOne = data.coinOne;
            var poloniex = data.poloniex;

            delete coinOne.result;
            delete coinOne.timestamp;

            if(coinOne.errorCode === "0"){
                delete coinOne.errorCode;

                console.log(poloniex.hasOwnProperty("USDT_BTC"));

                var arr = $.map(coinOne, function(e) {return e});

                for(var i=0; i<arr.length; i++){
                    var coin = arr[i].currency;

                    $(".tbody").append(
                        '<tr>'
                        + '<td><b>' + coin.toUpperCase() + '</b></td>'
                        + '<td>' + numberWithCommas(arr[i].last) + '</td>'
                        + '</tr>'
                    );
                }
            }
        }
    });
}

function numberWithCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
