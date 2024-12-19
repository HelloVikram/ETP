const Sequelize=require('sequelize');

const db=new Sequelize(process.env.dbname,process.env.dbuser,process.env.dbpassword,{
dialect:'mysql',
host:process.env.host
});
module.exports=db;