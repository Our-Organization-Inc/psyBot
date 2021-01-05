const express = require('express'),
  app = express(),
  handlebars = require('express3-handlebars')
    .create({
      defaultLayout: 'main', helpers: {
        section: function (name, options) {
          if (!this._sections) this._sections = {};
          this._sections[name] = options.fn(this);
          return null;
        }
      }
    }),
  data = {
    users: ["pop"],
    pass: ["ppppp"],
    email: ["ppddpd"]
  }

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"))
app.use(require('body-parser')());
app.use(require("cookie-parser")(require("./modules/credentials.js")))
app.use(require("./api/script.js"))


app.get("/home", (req, res) => {
  if (req.cookies.usrname) {
    res.render('home', { s_or_l: "Sign out", s_or_lg: "/sign-out", usrname: req.cookies.usrname })
  }
  else
  res.render('home', { s_or_l: "Log in", s_or_lg: "/login" });
})

app.get("/", (req, res) => {
  res.redirect(303, '/home');
})


app.get("/login", (req, res) => {
  if (req.cookies.usrname) {
    res.redirect('/');
  }
  res.render('sign-in', {
    s_or_l: "Log in",
    s_or_lg: "/login",
    "s-cont": "Don\'t have an account",
    "s-text": "Sign up",
    "s-link": "/sign-up"
  })
})

app.get("/sign-up", (req, res) => {
  res.render("sign-in", {
    s_or_l: "Sign in",
    s_or_lg: "/sign-up",
    "s-cont": "Have an account",
    "s-text": "Log in",
    "s-link": "/login"
  });
})

app.get("/sign-out", (req, res)=>{
  res.clearCookie("usrname")
  res.redirect('/');
})

app.post("/sign-up", (req, res)=>{
  console.log(req.body.usrname, " just signed up")
  res.redirect("/")
})
app.post("/login", (req, res) => {
  console.log(req.body.usrname, "just logged in")
  if(req.body.usrname != undefined || ""){
    res.cookie("usrname", req.body.usrname, {maxAge: 60*60*2})
  }
  res.redirect("/")
})

app.listen(3380, () => {
  console.log(`Server started on http://localhost:3380/`);
});