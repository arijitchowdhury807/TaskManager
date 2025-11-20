const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { taskCreateValidation } = require('../utils/validators');
const taskController = require('../controllers/taskController');

router.use(auth);
router.get('/', taskController.listTasks);
router.post('/', taskCreateValidation, taskController.createTask);
router.get('/:id', taskController.getTask);
router.put('/:id', taskCreateValidation, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
