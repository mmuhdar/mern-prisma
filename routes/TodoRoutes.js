const express = require('express');

const Todos = require('../controllers/TodoControllers');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.get('/', authentication ,Todos.getTodoByUser);
router.post('/', authentication ,Todos.createTodoByUser);

module.exports = router;
