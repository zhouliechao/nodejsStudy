$(function(){
    // 去空格
    function delSpace(val) {
        return val.replace(/\s/g, "");
    }

    $("#email").val(getCookie("inputEmail"));
    $("#password").val(getCookie("inputPassword"));
    $("#remember-password input").attr("checked",true);

    $(".login").click(function () {
        var password = delSpace($("#password").val());
        var email = delSpace($("#email").val());

        var isEmail = regexp = /^([0-9a-zA-Z_.-])+@([0-9a-zA-Z_-])+(\.([a-zA-Z_-])+)+$/;

        if (email == "" || password == "") {
            layer.open({
                content: "请输入邮箱和密码",
                skin: "msg",
                time: 3 //2秒后自动关闭
            });
        } else {
            if (isEmail.test(email)) {
                $.ajax({
                    type: "post",
                    url: "/login/loginAjax",
                    dataType: "json",
                    data: {
                        "password": password,
                        "email": email
                    },
                    success: function (res) {
                        if (res.code == 200) {
                            if ($("#remember-password input").is(":checked")) {
                                setCookie("inputEmail", email, 365);
                                setCookie("inputPassword", password, 365);
                            }else{
                                document.cookie = "inputEmail=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                                document.cookie = "inputPassword=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                            }
                            location.href = res.data.url;
                        } else {
                            layer.open({
                                content: res.msg,
                                btn: "我知道了",
                                yes: function (index) {
                                    layer.close(index);
                                }
                            });
                        }
                    },
                    error: function () {
                        layer.open({
                            content: "服务器异常",
                            skin: "msg",
                            time: 3
                        })
                    }
                })

            } else {
                layer.open({
                    content: "邮箱格式不正确",
                    skin: "msg",
                    time: 3 //2秒后自动关闭
                });
            }
        }
    })

    $(".toregister").click(function () {
        window.location.href = "/register";
    })

    //设置cookie
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    //获取cookie
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }
})