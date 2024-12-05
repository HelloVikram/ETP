const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const usercontroller=require('../Controller/user');
const expensecontroller=require('../Controller/expense');

router.post('/user/login',usercontroller.login )

router.post('/user/signup',usercontroller.signup )

router.post('/expense/add-expense', authenticate.authenticate,expensecontroller.addExpense )

router.get('/expense/get-expense', authenticate.authenticate,expensecontroller.getExpense )

router.delete('/expense/delete-expense/:id',authenticate.authenticate,expensecontroller.deleteExpense )

module.exports = router;