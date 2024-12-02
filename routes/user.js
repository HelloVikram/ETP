const db = require('../Model/signup');
const Sequelize=require('sequelize');
const express = require('express');
const router = express.Router();

router.post('/user/login',async (req,res)=>{
const email=req.body.email;
const password=req.body.password;
try{
   const user=await db.findOne({where:{email}});
   if(!user){
      return res.status(404).json({success:false,message:'User not found'});
   }
   const ispassword=await db.findOne({where:{password}});
   if(!ispassword){
      return res.status(401).json({success:false,message:'User not authorized'});
   }
   return res.status(200).json({success:true,message:'User login Successfull'})


}catch(err){
  res.status(500).json({success:false,message:'Internal server error'})
}
})
 

router.post('/user/signup', async (req, res) => {
   const name = req.body.name
   const email = req.body.email
   const password = req.body.password
   try {
      await db.create({
         name: name,
         email: email,
         password: password
      })
      res.status(200).json({ signupdata: 'Database created successfully' })
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