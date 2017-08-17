const express = require("express"); //Express
const path = require ("path");
const session = require("express-session"); //Express Session
const app = express();
const mustache = require ("mustache");
const mustacheExpress = require('mustache-express');
const bodyParser = require ("body-parser");

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//mustache
app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{}
}));

//Redirect to login if originalUrl is not "/login/"
// app.use((req, res, next) => {
//     if (req.originalUrl === '/') {
//       next();
//     }
//   res.redirect("/login/")
// });

// NOTE: Not working
app.use((err, req, res, next) => {
  if (req.originalUrl === "/"){
    next();
  }
  res.redirect('/login/');
});

const list = [
  {
    username: "",
    password: "",
  }
];

const data = {
  users:list
};

app.get('/login/', function (req, res) {
  res.render("users", data);
});

// NOTE: Don't need this...I believe
app.post("/", function(req, res){
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  let response = `Here are your credentials for the site: <br/>
  This is your username: ${username} <br/>
  This is your password: ${password}`
  res.send(response);
});

app.post("/", function (req, res) {
  console.log(list);
  list.push({username:req.body.username});
  list.push({username:req.body.password});
  res.redirect('/');
})

app.listen(3000, function () {
  console.log('Creating login page');
})

//Left To Do
//1. User redirect if not logged in. Define log in?
//2. authentication. Have the redirect with completed information. But need to authenticate.
//3. Valid usernames/passwords kept as a data structure.

//Using Express, Mustache, and express-session, create an app with a login page. When a user goes to /, and they are not logged in, redirect them to /login/. Upon entering a valid username and password, they should be authenticated and sent back to /. The root page should show that they are logged in and what username they are logged in as.

// The valid usernames and passwords should be kept as a data structure in your application.
