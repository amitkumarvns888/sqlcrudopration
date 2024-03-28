const mysql=require('mysql2')

var mysqlconnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Amit1234@',
    database:'employeedetails'
})

mysqlconnection.connect((err)=>{
    if(err){
        console.log(`error in db connection  ${JSON.stringify(err,undefined,2)}`)
    }else{
        console.log('db connect succesfully')
    }
})

module.exports = mysqlconnection