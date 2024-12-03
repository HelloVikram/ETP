const db = require('../Model/signup');
const expensedb=require('../Model/expense');
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

router.post('/expense/add-expense', async(req,res,next)=>{
   const{amount,description,category}=req.body;
   try{
      const response= await expensedb.create({amount:amount,description:description,category:category});
      console.log("Expense db created successfully");
      res.status(201).json(response);
   }catch(err){
      res.status(500).json({Error:'Error in creating Expensedb'})
   }
   
})

router.get('/expense/get-expense',async(req,res)=>{
   try{
      const response=await expensedb.findAll();
      res.status(200).json(response);
   }catch(err){
      res.status(400).json({Error:'Error in fetching data',details:err.message});
   }
})

router.delete('/expense/delete-expense/:id',async(req,res)=>{
       const eid=req.params.id;
       if (isNaN(eid)) {
         return res.status(400).json({ error: 'Invalid expense ID' });
     }

      try{
       const response=await expensedb.destroy({where:{id:eid}}) ;
       console.log(`Expense with ID ${eid} deleted successfully`);
        res.status(200).json({ message: `Expense with ID ${eid} deleted successfully` });
      }catch(err){
         console.error('Error deleting expense:', err);
         res.status(500).json({ error: 'Error deleting expense' });
      }
})

module.exports = router;