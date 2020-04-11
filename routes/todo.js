const router = require('express').Router();
const Todo = require('../model/Todo');
const {registerValidation, loginValidation} = require('../validations/validation');

// Get all Todos
router.get('/', (req, res) => {
    Todo.find({}, (error, todos) => {
        if(error) return res.status(400).send(error);
        res.send(todos);
      });
});

// Get a single Todo
router.get('/:id', (req, res) => {
    let id = req.params.id;
    Todo.findById(id, (error, todo) => {
        if(error) return res.status(400).send(error);
        res.send(todo);
      });
});

router.post('/add', async (req, res) => {
    const todo = new Todo({
        todo_description: req.body.todo_description,
        todo_responsible: req.body.todo_responsible,
        todo_priority: req.body.todo_priority,
        todo_completed: req.body.todo_completed,
    });

    try {
        const savedTodo = await todo.save();
        res.send({todo: todo.todo_description});
    } catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;