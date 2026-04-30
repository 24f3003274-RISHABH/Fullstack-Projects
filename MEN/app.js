// const http=require('http')

// const server=http.createServer((req,res)=>{
//   if(req.url=="/about"){
//     res.end("the about page")
//   }
//   if (req.url=="/profile"){
//     res.end("This is a sss proeefile page ")
//   }
//   if (req.url=="/"){
//     res.end("Home page  ee of my ")
//   }
// });

// server.listen(3000)


const express=require('express');
const morgan=require('morgan');
const userModel=require('./models/user')
const dbConnection=require('./config/db')

// app.use(express.json());
const app=express();

app.set('view engine','ejs')
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"))

app.use((req,res,next)=>{
  console.log("This is middleware")
  // res.send('This is middleware')
  // custom,built in ,third partiesmiddleware


  const a=2
  const b=3
  console.log(a+b)
  return next()
})

app.get('/',(req,res)=>{
   res.render('index')
 
})
app.get('/about',(req,res)=>{
  res.send('Abut page')
})



app.get('/profile',(req,res)=>{
  res.send('Profile page')
})
// app.use(express.urlencoded({ extended: true }));
app.post('/get-form-data',(req,res)=>{
  // res.send('Get form data page')
  console.log(req.body)
  res.send('data received')
})
// app.get('/get-form-data',(req,res)=>{
//   // res.send('Get form data page')
//   console.log(req.query)
//   res.send('data received')
// })

app.get('/register',(req,res)=>{
  res.render('register')
})

app.post('/register',async(req,res)=>{
  console.log(req.body)

  const {username,email,password}=req.body
  const newuser=await userModel.create({
    username:username,
    email:email,
    password:password
  })

  res.send(newuser)
})

// Read
app.get('/get-users',(req,res)=>{

  // method to to read the data from the database

  userModel.find({
    username:'Rishabh'
  }).then((users)=>{
    res.send(users)
    console.log(users)
  })
  // here if user is not found it will return empty is array 

  // method 2

  // userModel.findOne({
  //   username:'Rishabh'
  //  }).then((user)=>{
  //     res.send(user)
  //     console.log(user)
  //   })
  // in above if user will not be foound it will return null value
  })


// Update
app.get('/update-user',async(req,res)=>{
   await userModel.findOneAndUpdate({
    username:'Rishabh'
  },{
    email:'max@gmail.com'
  })
  res.send(' User Updated')
  console.log('User Updated')
})

// Delete
app.get('/delete-user',async(req,res)=>{
  await userModel.findOneAndDelete({
    username:'Rishabh'
  })
  res.send('user deleted')
})
app.listen(3000)