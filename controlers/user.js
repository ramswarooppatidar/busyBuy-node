const {User} = require('../model/user');
const mongoose = require('mongoose');

async function createUser(req, res){
    const user = req.body;
    const newUser = new User({
        name : user.name,
        username : user.username,
        password : user.password,
        cart : [],
        myOrder : []
    })
    try {
        await newUser.save();
        res.status(201).send("User created successfully");
    } catch (error) {
        console.error("Error creating user in MongoDB:", error);
        res.status(500).send("Error creating user");
    }
}

async function getAllUsers(req, res) {
        const allUsers = await User.find({});
        // console.log(allUsers);
        res.status(200).json(allUsers);
        // res.status(500).json({ message: 'Failed to get users' });
    }

// async function updateCartByUserId(req, res){
//     const userId = req.params.id;
//     const updatedCart = req.body.cart;
//     const update = await User.updateCartByUserId(userId, updatedCart);
// }
async function updateCartByUserId(req, res){
    console.log("BACKED : ")
    const userId = req.params.userId;
    const updatedCart = req.body.cart;
    console.log("BACKED : ",userId, updatedCart)
    const result = await User.updateOne(
        // { _id: new ObjectId(userId) }, // Convert userId to ObjectId
        // {_id : mongoose.Types.ObjectId(userId)},
        { _id: userId },
        { $set: { cart: updatedCart } }
    );
    
    if (result.modifiedCount === 1) {
        res.status(200).send(`Successfully updated cart for user with id: ${userId}`);
    } else {
        res.status(404).send(`User with id: ${userId} not found`);
    }
}
async function updateMyOrderByUserId(req, res){
    const userId = req.params.userId;
    const updateMyOrder = req.body.myOrder;
    const result = await User.updateOne(
        // {_id: new ObjectId(userId)},
        // {_id : mongoose.Types.ObjectId(userId)},
        { _id: userId },
        { $set: {myOrder : updateMyOrder}}
    )
    if(result.modifiedCount === 1){
        res.status(200).send(`Successfully updated myOrder for user with id: ${userId}`);
    }else{
        res.status(404).send(`User with id: ${userId} not found`);
    }
}

async function getUserByUserId(req, res){
    const userId = req.params.userId;
    console.log("inside getUserByUserId :", userId)
    try{
        // const user = await User.findOne({ _id: new ObjectId(userId) });
        const user = await User.findOne({ _id: userId });
        console.log("user is ", user)
         if(user){
            res.status(200).send(user);
         }else{
            res.status(404).send({message : `user with id ${userId} noy found`})
         }
    }catch(error){
        console.error("Error fetching user from MongoDB:", error);
        res.status(500).send({message : "Internal server error"})
    }
    
}

module.exports = {
    createUser,
    getAllUsers,
    updateCartByUserId,
    getUserByUserId,
    updateMyOrderByUserId
}