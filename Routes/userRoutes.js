const express =require('express');
const { createUser, loginUser, listallprofessor } = require('../Controllers/user_controller');
const auth = require('../Middleware/auth');

const router =express.Router();

router.post('/addUser',createUser)
router.post('/login',loginUser)
router.get('/allProfessor',auth,listallprofessor)


module.exports=router