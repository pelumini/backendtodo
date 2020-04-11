const router = require('express').Router();
const Todo = require('../model/Todo');
const {registerValidation, loginValidation} = require('../validations/validation');

// Get all Todos
router.get('/', async (req, res) => {
    


});



// SIGNUP OR REGISTER
router.post('/register', async (req, res) => {
    // validate our input
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


});

// SIGNIN OR LOGIN
router.post('/login', async (req, res) => {
    // validate our input
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


});


module.exports = router;