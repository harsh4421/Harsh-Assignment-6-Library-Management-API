const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const { signToken } = require('../utils/jwt');
const users = require('../models/userModel');
const safe = (u) => { if (!u) return u; const { password, ...rest } = u; return rest; };

async function register(req,res,next){ try {
  const {name,email,password}=req.body; const role=req.body.role || 'student';
  if (role === 'librarian' && process.env.ALLOW_LIBRARIAN_REGISTRATION !== 'true') throw new ApiError(403,'Librarian registration is disabled.');
  if (await users.findUserByEmail(email)) throw new ApiError(409,'Email is already registered.');
  const user=await users.createUser({name,email,password:await bcrypt.hash(password,12),role});
  const token=signToken({userId:user.userId,role:user.role}); res.status(201).json({message:'Registration successful.',token,user:safe(user)});
} catch(e){next(e)} }
async function login(req,res,next){ try { const {email,password}=req.body; const user=await users.findUserByEmail(email); if(!user || !(await bcrypt.compare(password,user.password))) throw new ApiError(401,'Invalid email or password.'); const token=signToken({userId:user.userId,role:user.role}); res.json({message:'Login successful.',token,user:safe(user)}); } catch(e){next(e)} }
async function getProfile(req,res,next){ try { const user=await users.findUserById(req.user.userId); if(!user) throw new ApiError(404,'User not found.'); res.json({user:safe(user)}); }catch(e){next(e)} }
async function updateProfile(req,res,next){ try { const updates={}; if(req.body.name) updates.name=req.body.name.trim(); if(req.body.email){const owner=await users.findUserByEmail(req.body.email); if(owner && owner.userId!==req.user.userId) throw new ApiError(409,'Email is already in use.'); updates.email=req.body.email;} if(req.body.password) updates.password=await bcrypt.hash(req.body.password,12); if(!Object.keys(updates).length) throw new ApiError(400,'No profile fields were supplied.'); const user=await users.updateUser(req.user.userId,updates); res.json({message:'Profile updated.',user:safe(user)}); }catch(e){next(e)} }
module.exports={register,login,getProfile,updateProfile};
