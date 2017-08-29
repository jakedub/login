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
app.set('views', './views');
app.set('view engine', 'mustache');

//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

let users = {
      'jon': '1234',
      'jim': '1234'
    };



app.get('/', function(req, res){
  let myUser = {};
  myUser.username = req.session.username
  myUser.password = req.session.password
  if (typeof req.session.username !== 'undefined'){
    res.render('index', myUser);
  }
  else{
    console.log('redirected to login!');
    res.redirect('/login');
  }
});

app.get('/login', function(req, res){
  res.render('login');
})

app.post('/login/auth', function(req, res){
  let name = req.body.username;
  let password = req.body.password;
  console.log(req.body);
  if (users[name] === password){
    req.session.username = name
    req.session.password = password
    res.redirect('/');
  }
  else{
    res.redirect('/login');
    console.log('nope');
  }
});

app.listen(3000,function () {
  console.log('Should be working');
})
