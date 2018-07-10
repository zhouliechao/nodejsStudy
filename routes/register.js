var express = require('express');
var router = express.Router();

// 连接mysql
var mysql = require("mysql");
var config = require("../database/config");
//使用连接池
var pool = mysql.createPool(config.mysql);
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register');
});

//数据库操作
router.post("/registerAjax", function (req, res, next) {//注册接口
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    
    pool.getConnection(function (err, connection) {
        var $selectsql = "select * from user_info where email=?";
        
        connection.query($selectsql, [email], function (err, result) {
            if (result.length != 0) { //账号存在，无法重复注册
                result = {
                    code: 300,
                    msg: "该邮箱已被注册"
                };
                res.json(result);
                connection.release();
            } else {
                var $insertsql = "INSERT INTO user_info(username,password,email) VALUE(?,?,?)";
                connection.query($insertsql, [username, password, email], function (err, result) {
                    if (result) {
                        result = {
                            code: 200,
                            msg: "注册成功"
                        }
                    } else {
                        result = {
                            code: 400,
                            msg: "注册失败"
                        }
                    }
                    res.json(result);
                    connection.release();
                })
            }
        })
    })
})
module.exports = router;
