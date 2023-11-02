const bcrypt = require('bcryptjs');
const authenticateUtil = require('../../utils/authenticate.js');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (user) {
            const passwordIsValid = bcrypt.compareSync(password, user.password);

            if (passwordIsValid) {
                const accessToken = authenticateUtil.generateAccessToken({
                    id: user.id,
                    name: user.name,
                    isAdmin: user.isAdmin,
                });
                return res.status(200).json({ name: user.name, token: accessToken });
            }
        }

        res.status(401).json({ msg: 'Invalid email or password' });
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};

exports.signup = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        const existingUser = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ msg: 'User with this email already exists' });
        }

        const newUser = await prisma.users.create({
            data: {
                email: email,
                name: name,
                password: bcrypt.hashSync(password, 8),
                isAdmin: isAdmin,
            },
        });

        return this.signin(req, res);
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};
