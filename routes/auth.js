const bcrypt = require('bcryptjs');
const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validations/validation');

// SIGNUP OR REGISTER
router.post('/register', async (req, res) => {
    // validate our input
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if Email exists
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({user: user.email});
    } catch(err){
        res.status(400).send(err);
    }
});

// SIGNIN OR LOGIN
router.post('/login', async (req, res) => {
    // validate our input
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if user exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email or Password is wrong E');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or Password is wrong P');

    // create and assign a token
    const token = jwt.sign();

    res.send("Logged In!");

});


module.exports = router;