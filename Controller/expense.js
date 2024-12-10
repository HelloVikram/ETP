const Sequelize = require('sequelize');
const expensedb = require('../Model/expense');
const user=require('../Model/signup');
const sequelize=require('../util/database');

const addExpense=async (req, res, next) => {
    const { amount, description, category } = req.body;
    const userId = req.user.id;
    const t=await sequelize.transaction();
    try {
       const response = await expensedb.create({ 
           amount: amount,
           description: description, 
           category: category,
           userId:userId
           },{transaction:t});
           
           const User= await user.findOne({where:{id:userId}})
           if(!User)
            throw new Error('User not found')
            await User.update({totalExpense:Number(User.totalExpense)+Number(amount)},{transaction:t});
       console.log("Expense db created successfully");
       await t.commit();
       return res.status(201).json({ success: true, message: 'Expense added successfully', response });
    } catch (err) {
      await t.rollback();
      return res.status(500).json({ success: false, message: 'Error adding expense', error: err.message });
    }
 }

 const getExpense=async (req, res) => {
    const userId=req.user.id;
    try {
       const response = await expensedb.findAll({
          where:{
             userId:userId
          }
       });
       res.status(200).json(response);
    } catch (err) {
       res.status(400).json({ message: 'Error in fetching data' });
    }
 }

 const deleteExpense= async (req, res) => {
    const eid = req.params.id;
    if (isNaN(eid)) {
       return res.status(400).json({success:false, message: 'Invalid expense ID' });
    }
    const t=await sequelize.transaction();
    try {
      const expense=await expensedb.findOne({where:{id:eid,userId:req.user.id},transaction:t}) ;
      if(!expense){
         throw new Error('Expense not available or not authorized')
       }
       const amount=expense.amount;
       await expensedb.destroy({ where: { id: eid, userId:req.user.id },transaction:t });
       console.log(`Expense with ID ${eid} deleted successfully`);
       const User = await user.findOne({ where: { id: req.user.id },transaction:t}); 
       if(!User)
         throw new Error("User not found!") ;
         await User.update({ totalExpense: Number(User.totalExpense) - Number(amount) },{transaction:t});
         res.status(200).json({  success:true, message: `Expense with ID ${eid} deleted successfully` });
       await t.commit();
    } catch (err) {
       console.error('Error deleting expense:', err.message);
       t.rollback();
       res.status(500).json({ success:false, message: 'Error deleting expense' });
    }
 }

const ispremium=async (req,res)=>{
  try{
   if(req.user){
      console.log(req.user.isPremium);
      res.status(200).json({ispremium:req.user.isPremium});
   }else {
      res.status(400).json({ success: false, message: 'User not found' });
  }
     
  }catch(err){
   res.status(500).json({success:false,message:'Error in finding premium user!'})
  }
}



 module.exports={addExpense,getExpense,deleteExpense,ispremium};