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



//  create get api for exprience table

app.get('/exptable', (req, resp) => {
    mysqlconnection.query('SELECT * From exptable', (err, res) => {
        if (err) {
            console.log(err)
        } else {
            resp.send(res)
            console.log(res)
        }
    })
})
// create single exprience data

app.get('/singlexperiencetable/:id', (req, resp) => {
    const id = req.params.id
    console.log(id)
    mysqlconnection.query('SELECT * From exptable WHERE id=?', [req.params.id], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            resp.send(res)
        }
    })
})

app.get('/singlexptable/:id', (req, resp) => {
    const id = req.params.id
    console.log("my value is ", id)
    mysqlconnection.query('select etbl.id,etbl.company,etbl.year,etbl.fromtoperiod from employee_data edata inner JOIN exptable etbl ON edata.id=etbl.exp_id WHERE edata.id=?;', [req.params.id], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            resp.send(res)
        }
    })
})

//create delete api for exptable

app.delete('/exptabledelete/:id', (req, resp) => {
    const id = req.params.id
    console.log("backend", id)
    mysqlconnection.query('DELETE  From exptable WHERE id=?', [req.params.id], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            resp.send(res)
        }
    })
})


// create edit api for exprience table

app.patch('/updateexptable/:id', (req, resp) => {
    console.log("patch part start")
    const emp = req.body;
    console.log(emp);
    console.log("from to period", emp.fromtoperiod + "");
    console.log("update part start");
    const empId = req.params.id;
    // +emp.id,
    mysqlconnection.query(`UPDATE exptable SET company="${emp.company}",year="${emp.year}",fromtoperiod="${emp.fromtoperiod}" WHERE id=${empId}`, (err, res) => {
        if (err) {
            console.log("error value", err)
        } else {
            resp.send(res)
        }
    })
})
//create api for insert data in exprience table

app.post('/insertexptable/:id', (req, resp) => {
    const id = req.params.id
    console.log(id)
    const emp = req.body
    const empData = [emp.company, emp.year, emp.fromtoperiod, id]
    mysqlconnection.query(`INSERT INTO  exptable(company,year,fromtoperiod,exp_id) values(?)`, [empData], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            resp.send(res)
        }
    })
})


///******* Ralative data api start ******////

app.get('/singlerelativedata/:id', (req, resp) => {
    const id = req.params.id
    console.log(id)
    mysqlconnection.query('SELECT * From empref WHERE id=?', [req.params.id], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            resp.send(res)
        }
    })
})

app.get('/relativedata/:id', (req, resp) => {
    const id = req.params.id
    console.log("getting relative data", id)
    mysqlconnection.query('select etbl.id, etbl.name, etbl.contact, etbl.relation from employee_data edata inner JOIN empref etbl ON edata.id = etbl.ref_id WHERE edata.id =?;', [req.params.id], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            resp.send(res)
        }
    })
})

app.post('/insertreltable/:id', (req, resp) => {
    const id = req.params.id
    console.log(id)
    const relative = req.body
    const relData = [relative.relname, relative.contact, relative.relation, id]
    mysqlconnection.query(`INSERT INTO  empref(name,contact,relation,ref_id) values(?)`, [relData], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            resp.send(res)
        }
    })
})


app.delete('/relativedelete/:id', (req, resp) => {
    const id = req.params.id
    console.log("backend", id)
    mysqlconnection.query('DELETE  From empref WHERE id=?', [req.params.id], (err, res) => {
        if (err) {
            console.log(err)
        } else {
            resp.send(res)
        }
    })
})


app.patch('/relativeupdate/:id', (req, resp) => {
    console.log("patch part start")
    const rel = req.body;
    console.log(rel);
    console.log("update relative")
    const relId = req.params.id;
    // +emp.id,
    mysqlconnection.query(`UPDATE empref SET name="${rel.name}",contact="${rel.contact}",relation="${rel.relation}" WHERE id=${relId}`, (err, res) => {
        if (err) {
            console.log("error value", err)
        } else {
            resp.send(res)
        }
    })
})




///******* Ralative data api end ******////


app.listen(PORT, () => {
    console.log('Express server running on port no 8085')
})

