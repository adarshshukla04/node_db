var express = require("express");
var mysql   = require("mysql2");
var bodyParser    = require("body-parser");
const db            = require("./utils/db.js");
var flash = require('express-flash');
var session = require("express-session");
var path = require('path');

const app = express();
app.set('view engine', 'ejs');

/*
app.use(bodyParser.urlencoded({ extended:  false}));
app.use(bodyParser.json());
*/

app.use(express.json());

const oneDay = 1000*60*60*24; //milisec*sec*min*hrs

app.use(session({
    secret: "gdngdbfsfgbda",
    saveUninitialized: true,
    cookie: { maxAge: oneDay},
    resave: false
}));

app.use(flash());

//DB connection
db.dbConnect();

const updateroute = require('./routes/update');
const { dbConnect } = require("./utils/db");
app.use('/update', updateroute);

app.listen(8080, () =>{
    console.log('Server is listening');
});

app.get('/', (req, res)=>{
    const sql =  "select * from receiver_n";
    db.con.query(sql, function(err, result){
        if (err)
        {
            console.log(err);
        }
        else{
            res.render('index.ejs', {data: result});
        }
    });
    
});

app.get('/update', (req, res) =>{
    res.render('add.ejs');
});

app.post('/update', (req, res)=>{
    const {channel, freq, pow} = req.body;
    //const ch = req.body.channel;
    console.log(channel);
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
});

