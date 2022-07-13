var mysql   = require("mysql2");

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'receiver'
});

exports.con = connection;
exports.dbConnect = () =>{

connection.connect(function(err){
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("DB connected:)");
    }
});
}