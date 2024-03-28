const mysqlconnection = require('./connection')

const express = require('express');
const bodyParser = require('body-parser')
const PORT = 8085
const app = express()

const cors = require('cors');
app.use(cors());


app.use(bodyParser.json())
app.use(express.json())


//create get api
app.get('/employee', (req, resp) => {
    mysqlconnection.query('SELECT * From employee_data', (err, res) => {
        if (err) {
            console.log(err)
        } else {
            resp.send(res)
            console.log(res)
        }
    })
})


//get single user data

app.get('/singleemp/:id', (req, resp) => {
    mysqlconnection.query('SELECT * From employee_data WHERE id=?', [req.params.id], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            resp.send(res)
        }
    })
})

//create delete api
app.delete('/deleteemp/:id', (req, resp) => {
    mysqlconnection.query('DELETE  From employee_data WHERE id=?', [req.params.id], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            resp.send(res)
        }
    })
})


//insert employeee

app.post('/insertemp', (req, resp) => {
    const emp = req.body
    const empData = [emp.employeename, emp.age, emp.exprience, emp.salary]
    mysqlconnection.query('INSERT INTO  employee_data(employeename,age,exprience,salary) values(?)', [empData], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            resp.send(res)
        }
    })
})

//update employee api

app.patch('/updateemp/:id', (req, resp) => {
    const emp = req.body;
    console.log(emp);
    console.log("update part start");
    const empId = req.params.id;
    // +emp.id,
    mysqlconnection.query(`UPDATE employee_data SET employeename="${emp.employeename}",age=${emp.age},exprience="${emp.exprience}",salary=${emp.salary} WHERE id=${empId}`, (err, res) => {
        if (err) {
            console.log("error value", err)
        } else {
            resp.send(res)
        }
    })
})


app.listen(PORT, () => {
    console.log('Express server running on port no 8085')
})


