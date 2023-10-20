const courseRouter = require('express').Router();
const controller = require('../../controllers/v2/course');

//students CRUD
courseRouter.get('/', controller.getAll); //read all
courseRouter.get('/:number', controller.getById); //read one by his id (student number)
courseRouter.post('/create', controller.create); //create new student
courseRouter.put('/update', controller.update); //update student
courseRouter.delete('/delete/:number', controller.delete); //delete student

module.exports = courseRouter;