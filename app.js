const express=require('express');
const app=express();
const userroutes=require('./routes/user');
const expenseroutes=require('./routes/expense');
const purchaseroutes=require('./routes/purchase');
const premiumroutes=require('./routes/premium');

const cors=require('cors');
app.use(cors());

const db=require('./util/database');
require('dotenv').config();

app.use(express.json());

app.use(userroutes);
app.use(expenseroutes);
app.use(purchaseroutes);
app.use(premiumroutes);

const user=require('./Model/signup');
const expense=require('./Model/expense');
const orders=require('./Model/orders');

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(orders);
orders.belongsTo(user);

db.sync().then((res)=>{
    app.listen(3000);
    console.log("database sync successfull...");
})
.catch(err=>console.log("Error in syncing database",err))
