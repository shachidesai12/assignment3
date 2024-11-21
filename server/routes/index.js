var express = require('express');
var router = express.Router();
const passport = require('passport');
const DB = require('../config/db');
let userModel = require('../model/User');
let User = userModel.User;


/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});


/* GET login page. */
router.get('/login', function(req, res, next) {
  if(!req.user)
  {
    response.render('auth/login',
      {
        title:'Login',
        message:req.flash('loginMessage'),
        displayName: req.user ? req.user.displayName:''
      }
    )
  }
  else
  {
    return res.redirect('/')
  }
})
router.post('/login', function(req,res,next){
  passport.authenticate('local',(err,user,info)=>{
    if(err)
    {
      return next(err)
    }
    if(!user)
    {
      req.flash('loginMssage','Authentication Error');
      return res.redirect('/login');
    }
    req.login(user,(err)=>{
      if (err)
      {
        return next (err)
      }
      return res.redirect('/tasklist')
    })
  })(req,res,next)
})
router.get('/register',function(req,res,next){
  if(!req.user)
  {
    res.render('auth/register',{
      title:'Register',
      message:req.flash('registerMessage'),
      displayName: req.user?req.user.displayName:''    //if user exists show displayName else nothing, since we only have two statemnets can use ? instead of if else
    })
  } 
  else{
    return res.redirect('/')
  }
})
router.post('/register',function(req,res,next){
  let newUser =  new User({
    username: req.body.username,
    //password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName
  })
  User.register(newUser,req.body.password,(err) => {
    if(err)
    {
      console.log("Error: Inserting new user");
      if(err.name=="UserExistError")
      {
        req.flash('registerMessage','Registration Error: User already exists')
      }
      return res.render('auth/register',{
        title:'Register',
        message: req.flash('registerMessage'),
        displayName:req.user?req.user.displayName:''
      })
    }
    else 
    {
      return passport.authenticate('local')(req,res,() =>{
        res.redirect('/tasklist')
      })
    }
  })
})
router.get('/logout',function(req,res,next){
  req.logOut(function(err){
    if(err)
    {
      return next(err);
    }
  })
  res.redirect('/')
})
module.exports = router;
