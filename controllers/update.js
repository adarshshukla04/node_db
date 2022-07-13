var express = require('express');
var mysql2 = require('mysql2');
const db = require('../utils/db');

exports.updateget = (req, res, next)=>{
    res.render("add.ejs");
}

exports.doupdate = (req, res)=>{
    const {channel, freq, pow} = req.body;
    //const ch = req.body.channel;
    console.log(ch);
    console.log(freq);
    console.log(pow);
    var sql = `Update receiver_n set frequency=${freq}, power=${pow} where Channel='${channel}'`;
    db.con.query(sql, function(err, result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("Updated successfully");
            res.redirect("/");
        }
    });
}