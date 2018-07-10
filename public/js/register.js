$(function(){
    // 去空格
    function delSpace(val) {
        return val.replace(/\s/g, "");
    }  

    $(".register").click(function () {
        var username = delSpace($("#username").val());
        var password = delSpace($("#password").val());
        var email = delSpace($("#email").val());

        var isEmail = regexp = /^([0-9a-zA-Z_.-])+@([0-9a-zA-Z_-])+(\.([a-zA-Z_-])+)+$/;
        
        if (username == "" || password == "" || email == "") {
            layer.open({
                content: "请输入完整信息",
                skin: "msg",
                time: 3 //2秒后自动关闭
            });
        }else{
            if (isEmail.test(email)) {
                $.ajax({
                    type: "post",
                    url: "/register/registerAjax",
                    dataType: "json",
                    data: {
                        "username" : username,
                        "password" : password,
                        "email": email
                    },
                    success: function (res) {
                        if (res.code == 200) {
                            layer.open({
                                content: res.msg,
                                btn: "我知道了",
                                shadeClose: false,
                                yes: function (index) {
                                    layer.close(index);
                                    window.location.href = "/login";
                                }
                            });
                        }else{
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
                
            }else{
                layer.open({
                    content: "邮箱格式不正确",
                    skin: "msg",
                    time: 3 //2秒后自动关闭
                });
            }
        }
    })

    $(".tologin").click(function () {
        window.location.href = "login";
    })
})