const mysql=require("mysql");

const conn=mysql.createConnection({

    user:"root",
    host:"localhost",
    password:"",
    database:"photohub"


});


conn.connect((error)=>{
if(error) throw error;
console.log("connection save !")
});



module.exports=conn




