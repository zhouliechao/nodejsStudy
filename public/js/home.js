$(function () {
    //读取cookie值
    function getCookie (name) {
        var cookies = document.cookie;
        cookies = cookies.split("; ");
        
        for (let i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].split("=");
            
            if (cookie[0] == name) {
                return cookie[1];
            }
        }
    }
    var username = "username";
    username = getCookie(username);
})