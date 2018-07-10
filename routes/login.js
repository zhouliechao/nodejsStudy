var express = require('express');
var router = express.Router();

// 连接mysql
var mysql = require("mysql");
var config = require("../database/config");
//使用连接池
var pool = mysql.createPool(config.mysql);
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login');
});

//数据库操作
router.post("/loginAjax", function (req, res, next) {//登录接口
    var email = req.body.email;
    var password = req.body.password;
    var returnJson;

    pool.getConnection(function (err, connection) {
        var $selectsql = "select * from user_info where email =?";

        connection.query($selectsql, [email], function (err, result) {
            if (result.length == 0) {
                returnJson = {
                    code: 404,
                    msg: "该邮箱不存在"
                }
            }else {
                if (result[0].password != password) {
                    returnJson = {
                        code: 500,
                        msg: "账号或密码错误"
                    }
                }else{
                    returnJson = {
                        code: 200,
                        msg: "登录成功",
                        data: {
                            url: "/home"
                        }
                    }
                    req.session.user = result[0].username;
                    req.session.email = result[0].email;
                }
            }
            res.json(returnJson);
            connection.release();
        })
    })
})

module.exports = router;