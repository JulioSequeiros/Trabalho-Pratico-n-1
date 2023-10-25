const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Return all students
exports.getAll = async (req, res) => {
    try {
        const response = await prisma.schools.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
};

// Return student by their id (student number)
exports.getById = async (req, res) => {
    const number = req.params.number;
    try {
        const response = await prisma.schools.findUnique({
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
    const { sigla, name, morada, website, number } = req.body;
    try {
        const school = await prisma.schools.create({
            data: {
                number: number,
                name: name,
                sigla: sigla,
                morada: morada,
                website: website
            },
        });
        res.status(201).json(school);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};

// Update student
exports.update = async (req, res) => {
    const { sigla, name, morada, website,number } = req.body;
    try {
        const school = await prisma.schools.update({
            where: {
                number: number,
            },
            data: {
                name: name,
                sigla: sigla,
                morada: morada,
                website: website
            },
        });
        res.status(200).json(school);
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};

// Delete student by their id (student number)
exports.delete = async (req, res) => {
    const number = req.params.number;
    try {
        await prisma.schools.delete({
            where: {
                number: number,
            },
        });
        res.status(204).send(); // Using 204 No Content for successful deletion
    } catch (error) {
        res.status(400).json({ error: 'Bad Request', msg: error.message });
    }
};
