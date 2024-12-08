const express = require('express');
const router = express.Router();

const usercontroller=require('../Controller/user');

router.post('/user/login',usercontroller.login);

router.post('/user/signup',usercontroller.signup);

module.exports = router;