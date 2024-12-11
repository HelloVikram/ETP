const express = require('express');
const router = express.Router();
const passwordcontroller=require('../Controller/password');

router.post('/password/forgotpassword',passwordcontroller.fogotpassword);

module.exports=router;