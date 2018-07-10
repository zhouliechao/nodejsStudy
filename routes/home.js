var express = require('express');
var router = express.Router();

// 连接mysql
var mysql = require("mysql");
var config = require("../database/config");
//使用连接池
var pool = mysql.createPool(config.mysql);
/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.user) {
        res.cookie("username", req.session.user);
        res.render('home', {
            username: req.session.user
        });
    }else{
        res.redirect('/login')
    }
});



module.exports = router;