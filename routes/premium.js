const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const premiumController=require('../Controller/premium');

router.get('/premium/leaderboard',authenticate.authenticate,premiumController.leaderboard);

module.exports=router;