const { Router } = require('express');
const router = Router();
const User = require('../database/schemas/User');
const { hashPassword, comparePassword } = require('../utils/helpers');
const passport = require('passport');


/*router.post('/login', async (req, res) => {
    const { email, password} = req.body;
    if (!email || !password) return res.send(400);
    const userDB = await User.findOne({email});
    if (!userDB) return res.send(401);
    const isValid = comparePassword(password, userDB.password);
    if (isValid) {
        console.log('Authenticated Successfully!');
        req.session.user = userDB;
        return res.send(200);
    } else {
        return res.send(401);
    } 
    
});*/

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('Logged in')
    res.send(200);
})

router.post('/register', async (req, res) => {
    const { username, email } = req.body;
    const userDB = await User.findOne({ $or: [{email}]});
    if (userDB) {
        res.status(400).send({ msg: 'User already exists!'});
    } else {
        const password = hashPassword(req.body.password);
        console.log(password);
        const newUser = await User.create({username, password, email});
        res.send(201);
    }
});

router.get('/discord', passport.authenticate('discord'), (req, res) => {
    res.send(200);
});

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.send(200);
});




module.exports = router;