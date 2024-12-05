const express=require('express');
const app=express();
const routes=require('./routes/user');
const cors=require('cors');
app.use(cors());
const db=require('./util/database');
require('dotenv').config();

app.use(express.json());
app.use(routes);

const user=require('./Model/signup');
const expense=require('./Model/expense');

user.hasMany(expense);
expense.belongsTo(user);

db.sync().then((res)=>{
    app.listen(3000);
    console.log("database sync successfull...");
})
.catch(err=>console.log("Error in syncing database",err))
