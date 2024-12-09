const user=require('../Model/signup');
const expense=require('../Model/expense');
const Sequelize = require('sequelize');

const leaderboard=async(req,res)=>{
    try{
       const result=[];
       const User= await user.findAll();
       const exp=await expense.findAll();
      
        User.forEach(async (element) => {
          
          let total=0;
           exp.forEach(el=>{
             if(element.id==el.userId)
              total+=el.amount;
          })
          result.push({"name":element.name,"total":total});
       });
       result.sort((a,b)=>b.total-a.total);
       console.log(result);
       res.status(200).json({result});
    }catch(err){
       console.log("Error in fatchig leaderboard",err);
    }
    }
    module.exports={leaderboard}