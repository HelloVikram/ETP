const Sequelize=require('sequelize');
const user=new Sequelize('expensedb','root','1234567890',{
dialect:'mysql',
host:'localhost'
});
module.exports=user;