const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Return all courses
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.courses.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
};

// Return course by their id (course number)
exports.getById = async (req, res) => {
    const number = req.params.number;
    try {
        const response = await prisma.courses.findUnique({
            where: {
                number: number,
            },
        });
        if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Not Found', msg: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
};

// Create course
exports.create = async (req, res) => {
    const { sigla, name, number } = req.body;
    try {
        const course = await prisma.courses.create({
            data: {
                number: number,
                name: name,
                sigla: sigla,
            },
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};

// Update course
exports.update = async (req, res) => {
    const { sigla, name, morada, website,number } = req.body;
    try {
        const course = await prisma.courses.update({
            where: {
                number: number,
            },
            data: {
                name: name,
                sigla: sigla,
            },
        });
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};

// Delete course by their id (course number)
exports.delete = async (req, res) => {
    const number = req.params.number;
    try {
        await prisma.courses.delete({
            where: {
                number: number,
            },
        });
        res.status(204).send(); // Using 204 No Content for successful deletion
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};
