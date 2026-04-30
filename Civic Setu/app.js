const express=require('express');
const userRouter=require('./routes/user.routes')
const dotenv=require('dotenv');

dotenv.config();
const connectionToDB=require('./config/db')
connectionToDB();

const app=express();
app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }));

const cookieParser=require('cookie-parser')
app.use(cookieParser())

const indexRouter=require('./routes/index.routes')
app.use('/',indexRouter)



app.use('/user',userRouter)

app.listen(3000,()=>{
  console.log('Server is running on port 3000')
})
// json web token
// jsw
