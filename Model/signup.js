const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const { toDefaultValue } = require('sequelize/lib/utils');


const user=sequelize.define('users',{
 id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
 },
 name:{
    type:Sequelize.STRING,
    allowNull:false,
 },
 email:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
 },
 password:{
    type:Sequelize.STRING,
    allowNull:false
 },
 isPremium:{
   type: Sequelize.BOOLEAN,
   defaultValue:false
}
});
module.exports=user;