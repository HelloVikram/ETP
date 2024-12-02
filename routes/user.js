const db = require('../Model/signup');
const Sequelize=require('sequelize');
const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt');
router.post('/user/login',async (req,res)=>{
const email=req.body.email;
const password=req.body.password;
try{
   const user=await db.findOne({where:{email}});
   if(!user){
      return res.status(404).json({success:false,message:'User not found'});
   }
   bcrypt.compare(password,user.password,(err,result)=>{
      if(err)
         throw new Error('Something went wrong');
   if(result==true){
      return res.status(200).json({success:true,message:'User login Successfull'})
   }
   else{
      return res.status(401).json({success:false,message:'Password is incorrect'})
   }
})
}catch(err){
  res.status(500).json({success:false,message:'Internal server error'})
}
})
 

router.post('/user/signup',  (req, res) => {
   const name = req.body.name
   const email = req.body.email
   const password = req.body.password
   try {
      const saltrounds=10;
      bcrypt.hash(password,saltrounds,async(err,hash)=>{
         await db.create({
            name: name,
            email: email,
            password: hash
         })
         res.status(200).json({ message: 'Database created successfully' })
      })
      
      
   } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
         res.status(409).json({ error: 'Email already exists' });
      } else {
         res.status(500).json({ error: 'Internal server error' });
      }
      console.log("Error in creating database...");
   }
})
module.exports = router;