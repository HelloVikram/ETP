const express=require('express');
const app=express();
const userroutes=require('./routes/user');
const expenseroutes=require('./routes/expense');
const purchaseroutes=require('./routes/purchase');
const premiumroutes=require('./routes/premium');
const passwordroutes=require('./routes/forgetpassword');
const helmet=require('helmet');
const compression=require('compression');
const morgan=require('morgan');
const fs=require('fs');
const path=require('path')
const { v4: uuidv4 } = require('uuid');
uuidv4();

const cors=require('cors');
app.use(cors());

const db=require('./util/database');
require('dotenv').config();
const accesslogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flag:'a'});

app.use(helmet());
app.use(compression())
app.use(morgan('combined',{stream:accesslogStream}));

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
const savedurls=require('./Model/savedurl');

user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(orders);
orders.belongsTo(user);

user.hasMany(ForgotPasswordRequests);
ForgotPasswordRequests.belongsTo(user);

user.hasMany(savedurls);
savedurls.belongsTo(user);

db.sync().then((res)=>{
    app.listen(process.env.port);
    console.log("database sync successfull...");
})
.catch(err=>console.log("Error in syncing database",err))
