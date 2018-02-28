$(function(){
    $(".back").click(function(){
        location.href = "/";
    });

    $(".submit").click(function(){
        $("#form").attr("action", "/api/login");
        $("#form").attr("method", "POST");
        $("#form").submit();
    });
});
