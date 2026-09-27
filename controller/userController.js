const ApiError = require('../utils/ApiError');
const users = require('../models/userModel');
const safe = u => {const {password,...rest}=u;return rest;};
async function getAll(req,res,next){try{const list=await users.findAllUsers(req.query.role);res.json({count:list.length,users:list.map(safe)});}catch(e){next(e)}}
async function getOne(req,res,next){try{const u=await users.findUserById(req.params.id);if(!u)throw new ApiError(404,'User not found.');res.json({user:safe(u)});}catch(e){next(e)}}
async function updateRole(req,res,next){try{const u=await users.findUserById(req.params.id);if(!u)throw new ApiError(404,'User not found.');const updated=await users.updateUserRole(req.params.id,req.body.role);res.json({message:'User role updated.',user:safe(updated)});}catch(e){next(e)}}
async function remove(req,res,next){try{if(!await users.findUserById(req.params.id))throw new ApiError(404,'User not found.');await users.deleteUser(req.params.id);res.json({message:'User deleted successfully.'});}catch(e){next(e)}}
module.exports={getAll,getOne,updateRole,remove};
