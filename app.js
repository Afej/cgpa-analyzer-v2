const express = require("express"),
  path = require("path"),
  exphbs = require('express-handlebars'),
  flash = require('connect-flash'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  mongoose = require('mongoose');

const app = express();

// Load routes
const users = require('./routes/user');

// Passport config
require("./config/passport")(passport);

// DB config
const db = require("./config/database");

// connecting to mongoose
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));


// handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body-parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname, "public")));

// Express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});


// Use routes
app.use('/users', users);

const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server started on port ${port}`);
});