$(function(){
    // 去空格
    function delSpace(val) {
        return val.replace(/\s/g, "");
    }

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
})