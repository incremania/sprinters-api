const express = require('express');
const router = express.Router();
const newsletter = require('../controllers/newsLetterController')


router
.post('/', newsletter)



module.exports = router