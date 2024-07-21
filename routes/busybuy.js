const express = require('express');
const routers = express.Router();
const {createUser, getAllUsers, updateCartByUserId,  getUserByUserId, updateMyOrderByUserId} = require('../controlers/user')

 routers.post('/createUser', createUser)
 routers.get('/getAllusers', getAllUsers);
 routers.put('/updateCartByUserid/:userId', updateCartByUserId);
 routers.get('/getUserByUserId/:userId', getUserByUserId);
 routers.put('/updateMyOrderByUserId/:userId', updateMyOrderByUserId)

 module.exports = routers;