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
  saveUninitialized: false,
  cookie:{}
}));


//Checking if user/password present with session
app.use(function(req, res, next) {
    req.session.users = {
        user: "password"
    };
    next();
});

//If username/password present then "/" else go to "/login/"
app.post("/", function(req, res, next) {
    if (req.session.username) {
        res.send(`Congratulations! <br/>
          This is your usesrname: ${req.session.username} <br/>
          This is your password: ${req.session.password}
          <img src="http://media1.giphy.com/media/c54YHGDH63jJC/giphy.gif"/>`);
    } else {
        res.redirect("/login/")
    };
    next();
});

//Using the form from mustache at "/login/"
app.get('/login/', function (req, res) {
  res.render("users");
});

//This is wrong. I know it's wrong. Doesn't it need to push? Especially to compare?

let list = [{
  user: "password"
}]
app.post("/login/", function (req, res) {
  console.log(list);
  list.push({username:req.body.username});
  list.push({username:req.body.password});
  res.send('/');
})

app.listen(3000, function () {
  console.log('Creating login page');
})
