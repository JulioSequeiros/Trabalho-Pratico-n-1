const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Return all students
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.students.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
};

// Return student by their id (student number)
exports.getById = async (req, res) => {
    const number = req.params.number;
    try {
        const response = await prisma.students.findUnique({
            where: {
                number: number,
            },
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Not Found', msg: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
};

// Create student
exports.create = async (req, res) => {
    const { number, name, city, birthday } = req.body;
    try {
        const student = await prisma.students.create({
            data: {
                number: number,
                name: name,
                city: city,
                birthday: birthday,
            },
        });
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};

// Update student
exports.update = async (req, res) => {
    const { number, name, city, birthday } = req.body;
    try {
        const student = await prisma.students.update({
            where: {
                number: number,
            },
            data: {
                name: name,
                city: city,
                birthday: birthday,
            },
        });
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};

// Delete student by their id (student number)
exports.delete = async (req, res) => {
    const number = req.params.number;
    try {
        await prisma.students.delete({
            where: {
                number: number,
            },
        });
        res.status(204).send(); // Using 204 No Content for successful deletion
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};
