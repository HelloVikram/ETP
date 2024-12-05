const Sequelize = require('sequelize');
const expensedb = require('../Model/expense');

const addExpense=async (req, res, next) => {
    const { amount, description, category } = req.body;
    const userId = req.user.id;
    try {
       const response = await expensedb.create({ 
           amount: amount,
           description: description, 
           category: category,
           userId:userId
           });
       console.log("Expense db created successfully");
       res.status(201).json(response);
    } catch (err) {
       res.status(500).json({ Error: 'Error in creating Expensedb' })
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
       return res.status(400).json({ error: 'Invalid expense ID' });
    }
 
    try {
       const response = await expensedb.destroy({ where: { id: eid, userId:req.user.id } });
       console.log(`Expense with ID ${eid} deleted successfully`);
       res.status(200).json({ message: `Expense with ID ${eid} deleted successfully` });
    } catch (err) {
       console.error('Error deleting expense:', err);
       res.status(500).json({ error: 'Error deleting expense' });
    }
 }

 module.exports={addExpense,getExpense,deleteExpense};