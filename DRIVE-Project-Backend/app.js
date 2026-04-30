// const express=require('express');
// const userRouter=require('./routes/user.routes')
// const dotenv=require('dotenv');



// dotenv.config();
// const connectionToDB=require('./config/db')
// connectionToDB();

// const app=express();
// app.set('view engine','ejs')
// app.use(express.urlencoded({ extended: true }));

// const cookieParser=require('cookie-parser')
// app.use(cookieParser())

// const indexRouter=require('./routes/index.routes')
// app.use('/',indexRouter)



// app.use('/user',userRouter)

// app.listen(3000,()=>{
//   console.log('Server is running on port 3000')
// })
// // json web token
// // jsw



const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Connect to database
const connectionToDB = require('./config/db');
connectionToDB();

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Serve static files (logo, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./routes/index.routes');
const userRouter = require('./routes/user.routes');

app.use('/', indexRouter);
app.use('/user', userRouter);

// Civic page routes
app.get('/newprob', (req, res) => res.render('newprob'));
app.get('/pendingprob', (req, res) => res.render('pendingprob'));
app.get('/resolvedprob', (req, res) => res.render('resolvedprob'));
app.get('/heatmap', (req, res) => res.render('heatmap'));
app.get('/acknowledge', (req, res) => res.render('acknowledge'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/notification', (req, res) => res.render('notification'));

// 404 fallback
app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

// JWT setup (future use)
// const jwt = require('jsonwebtoken');
// app.use((req, res, next) => {
//   const token = req.cookies.token;
//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;
//     } catch (err) {
//       console.log('Invalid token');
//     }
//   }
//   next();
// });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
