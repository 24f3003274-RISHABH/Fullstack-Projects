const express=require('express')

const router=express.Router();
const {body , validationResult}=require('express-validator')

const userModel=require('../models/user.model')
const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');




router.get('/test',(req,res)=>{
  res.send('user test route')
})


router.get('/register',(req,res)=>{
  res.render('register')
})
/*

*/ 

router.post('/register',
  body('email').trim().isEmail().isLength({min:10}),
  body('password').trim().isLength({ min: 5 }),
  body('username').trim().isLength({ min: 3 }),
  async(req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array(),
        message:'Invalid Data'
      })

    }
    const {username,email,password}=req.body;
    const hashPassword=await bcrypt.hash(password,10)
    const newUser= await userModel.create({
      email,
      username,
      password:hashPassword
    })
    // res.json({message:'User registered successfully'}) 
    res.json(newUser)
    // industry me use hota data ko send karne ke liye
  }
);

router.get('/login',(req,res)=>{
  res.render('login')
})
router.post('/login',
  body('username').trim().isLength({min:3}),
  body('password').trim().isLength({min:5}),
  async(req,res)=>{
  const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({
        error:errors.array(),
        message:'Invalid Data'
      })
    }
    const {username,password}=req.body;

    const user=await userModel.findOne({
      username:username
    })
    if(!user){
      return res.status(400).json({
        message:'username or password is incorrect'
      })
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(400).json({
        message:'username or password is incorrect'
      })
    }

    const token=jwt.sign({
      userId:user._id,
      email:user.email,
      username:user.username
    },
    process.env.JWT_SECRET,
  )
  
  res.cookie('token',token)
  res.send('Login Successfully')

  }
  )

// /user/test
module.exports=router;