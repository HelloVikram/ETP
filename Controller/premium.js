const user=require('../Model/signup');
const expenses=require('../Model/expense');
const Sequelize = require('sequelize');
const sequelize=require('../util/database');
const leaderboard=async(req,res)=>{
    try{
       const aggregate= await user.findAll({
         attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.amount')),'total']],
         include:[{
            model:expenses,
            attributes:[]
         }],
         group:['users.id'],
         order:[['total','desc']]
       });
       res.status(200).json(aggregate);
    }catch(err){
       console.log("Error in fatchig leaderboard",err);
    }
    }
    module.exports={leaderboard}