const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();


const PORT = process.env.PORT || 8080;
require("dotenv").config();
const session = require("express-session");
var SequelizeStore = require('connect-session-sequelize')(session.Store);


const db = require("./models");
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(cors({
  origin: ["https://yoututor2020.herokuapp.com"],
  credentials:true
})); 

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new SequelizeStore({
    db: db.sequelize
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000
  }
}))

app.use(express.static("public"))



const logInRoute = require("./controllers/loginController.js");
const studentRoute = require("./controllers/studentController.js");
const reviewRoute = require("./controllers/reviewController.js");
const signupRoute = require("./controllers/signupController.js");
const teacherRoute = require("./controllers/teacherController.js");
const filterRoute = require("./controllers/filterController.js");
const matchingRoute = require("./controllers/matchingController.js");


app.use(logInRoute);
app.use(studentRoute);
app.use(reviewRoute);
app.use(signupRoute);
app.use(teacherRoute);
app.use(filterRoute);
app.use(matchingRoute);


// app.use("/route", teacherRoute);

//SET ALL ROUTES// let signupRoute = require("./controllers/signupController.js");
// app.use(signupRoute);

//app.use(/*/route*/, teacherRoute);



db.sequelize.sync({
  force: false
}).then(function () {
  app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
  });
}).catch(err => {
  throw err;
});