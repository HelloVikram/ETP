const express=require('express');
const app=express();
const userroutes=require('./routes/user');
const expenseroutes=require('./routes/expense');
const purchaseroutes=require('./routes/purchase');
const premiumroutes=require('./routes/premium');
const passwordroutes=require('./routes/forgetpassword');
const { v4: uuidv4 } = require('uuid');
uuidv4();

const cors=require('cors');
app.use(cors());

const db=require('./util/database');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userroutes);
app.use(expenseroutes);
app.use(purchaseroutes);
app.use(premiumroutes);
app.use(passwordroutes);

const user=require('./Model/signup');
const expense=require('./Model/expense');
const orders=require('./Model/orders');
const ForgotPasswordRequests=require('./Model/forgetpassword');

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(orders);
orders.belongsTo(user);

user.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(user);

db.sync().then((res)=>{
    app.listen(3000);
    console.log("database sync successfull...");
})
.catch(err=>console.log("Error in syncing database",err))
