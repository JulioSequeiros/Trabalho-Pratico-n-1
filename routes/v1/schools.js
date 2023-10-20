const schoolRouter = require('express').Router();
const controller = require('../../controllers/v1/student');

//students CRUD
schoolRouter.get('/', controller.getAll); //read all
schoolRouter.get('/:number', controller.getById); //read one by his id (student number)
schoolRouter.post('/create', controller.create); //create new student
schoolRouter.put('/update', controller.update); //update student
schoolRouter.delete('/delete/:number', controller.delete); //delete student

module.exports = schoolRouter;