//import express module after installation
const Xexpress = require("express")
let app = Xexpress();

//import mysql2 module after installation
const xmysql = require("mysql2")

//static folder
app.use(Xexpress.static("sf"));

let dbParams = { //hudappa
    host: 'localhost',
    user: 'root',
    database: 'projectwork',
    port: '3306',
    password: 'cdac',
}

const conn = xmysql.createConnection(dbParams) // database connection established

//create server with express JS
app.listen(900, () => {
    console.log("Server is listening at port no 900...")
})

//login URI without AJAX 
app.get("/login", (req, res) => {

    let uid = req.query.userID;
    let pass = req.query.password;

    let loginstatusOP = { status: false, message: "Invalid userID or Password!" };

    conn.query("select * from user_details where user_id=? and password =?", [uid, pass],
        (err, rows) => {
            if (err) {
                console.log("ERROR occured")
                console.log(err)
            }
            else {
                if (rows.length > 0) {
                    loginstatusOP.status = true;
                    loginstatusOP.message = "Login Successfull!"
                }
            }
            res.send(loginstatusOP.message)// as its used without ajax so response will be send on new page and page will refresh at client machine
        })
})

//Update Password with AJAX in jquery
app.get("/updatePass", (req, res) => {

    let oldPass = req.query.oldpass;
    console.log(oldPass, typeof oldPass)

    let uid = req.query.userID;
    console.log(uid, typeof uid)

    let newPass = req.query.newpass;
    console.log(newPass, typeof newPass)

    let loginstatusOP = { status: false, message: "Invalid Password, Please enter the correct one!" };

    conn.query("update user_details set password=? where user_id =? and password =?;", [newPass, uid, oldPass],
        (err, res1) => {
            if (err) {//this will be called if the array element are not passed as per the ?
                //NOTE :this wont be called even if the query is incorrect to update the db
                console.log("ERROR occured")
                console.log(err)
            }
            else {
                if (res1.affectedRows == 1) {
                    loginstatusOP.status = true;
                    loginstatusOP.message = "PassWord Updated Successfully!"
                }
            }
            console.log(loginstatusOP)
            res.send(loginstatusOP)// as its used without ajax so response will be send on new page and page will refresh at client machine
        })
})

//New registration with AJAX in jquery
app.get("/register", (req, res) => {

    let fname = req.query.fname;
    let lname = req.query.lname;
    let EmailID = req.query.EmailID;
    let password = req.query.password;

    let regStatusOP = { status: false, message: "Registration failed!", userid: -1 };

    conn.query("insert into user_details(fname,lname,email_id,password) values(?,?,?,?) ", [fname, lname, EmailID, password],
        (err, res1) => {
            if (err) {
                console.log("ERROR occured")
                console.log(err)
            }
            else {
                if (res1.affectedRows === 1) {
                    // console.log(res1)
                    regStatusOP.status = true;
                    regStatusOP.message = "Registration Successfull!"
                    regStatusOP.userid = res1.insertId;
                }
            }
            console.log(regStatusOP)
            res.send(regStatusOP)
            // window.location.reaplce("index.html")
        })

})

//get feedback from users with ajax jquery
app.get("/feedback", (req, res) => {
    let name = req.query.name;
    let email = req.query.email;
    let message = req.query.message;

    let output = { feed_status: false, message: "Could not add feedback" }

    console.log(name, email, message)
    conn.query("insert into user_feedback(name,emailID,message) values (?,?,?)", [name, email, message],
        (err, res1) => {
            if (err) {
                console.log("Some error occured!")
                console.log(err)
            }
            else {
                if (res1.affectedRows === 1) {
                    output.feed_status = true;
                    output.message = "Thank you for contacting! We will reach out to you within next 24 hours"
                }
            }
            res.send(output)
        })
})