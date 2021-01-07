const express = require('express'),
  PORT = process.env.PORT || 3380,
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
    })

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"))
app.use(require('body-parser')());
app.use(require("cookie-parser")(require("./modules/credentials.js")))

app.use(require("./api/script.js"))


app.get("/home", (req, res) => {
  if (req.cookies.usrname != undefined || "") {
    res.render('home', { s_or_l: "Sign out", s_or_lg: "/sign-out", usrname: req.cookies.usrname })
  }
  else
  res.render('home', { s_or_l: "Log in", s_or_lg: "/login", usrname: false});
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
  res.redirect("/")
})
app.post("/login", (req, res) => {
  if(req.body.usrname !== undefined || ""){
    res.cookie("usrname", req.body.usrname, {maxAge: 60*60*5})
  }
  res.redirect("/")
})

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
