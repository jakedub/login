const express = require("express"); //Express
const path = require ("path");
const session = require("express-session"); //Express Session
const app = express();
const mustache = require ("mustache");
const mustacheExpress = require('mustache-express');
const bodyParser = require ("body-parser");

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

//Redirect to login. // NOTE: Needs to have an if/else statement concerning login
app.use((err, req, res, next)=>{
  res.redirect("/login/");
});

app.get("/login/", function (req, res){
  let html = '<form action="/" method="post">' +
            '<h1>Login Page</h1>' +
            '<p>Enter your username</p>' +
            '<input type="text" name="username" placeholder="username" />'+
            '<p>Enter your email</p>' +
            '<input type="password" name="password" placeholder="password" />' +
            '<button type="submit">Submit</button>' +
       '</form>';
 res.send(html);
})

app.post("/", function(req, res){
  console.log(req.body);
  let name = req.body.username;
  let email = req.body.email;
  let response = `
  Your username is ${username}
  Your password is ${password}`
  res.send(response); //displays the email address
});


app.listen(3000, function () {
  console.log('Starting to work');
})
//Using Express, Mustache, and express-session, create an app with a login page. When a user goes to /, and they are not logged in, redirect them to /login/. Upon entering a valid username and password, they should be authenticated and sent back to /. The root page should show that they are logged in and what username they are logged in as.

// The valid usernames and passwords should be kept as a data structure in your application.

//1. Install and set up Express, Mustache, and express-session. NOTE: Completed
//2. Create the app to have a login page. So a form with username/password. Use "/login/"
//3. User attempts to go to "/" and NOT logged in, redirect to /login/
//4. User enters valid username/password they are authenticated and redirected to "/" and see username/password.
