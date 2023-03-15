const express = require("express")
const app = express()
require("./db/conn");
const router = require("../src/router/router");

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

require('dotenv').config();
var port = process.env.PORT || 4000 ;

var path = require("path");

app.use(express.static(path.join(__dirname, '../public')));
var ejs = require("ejs");
var ejs_folder_path = path.join(__dirname, "../templates");
app.set("view engine", "ejs");
app.set("views", ejs_folder_path); 

const sessions = require('express-session');
// const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SECRET_KEY || "thisismysecrctekey",
    saveUninitialized:true,
    // cookie: { maxAge: oneDay },
    resave: false 
}));

app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
