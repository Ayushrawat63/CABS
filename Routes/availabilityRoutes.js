const express =require('express');
const { createAvailability, getAvailability } = require('../Controllers/availability_controller');
const router =express.Router();

router.post('/create',createAvailability)

router.get('/:professorId',getAvailability)




module.exports=router