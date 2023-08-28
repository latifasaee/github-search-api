
const User = require('../models/User');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
        const user = new User({
            name,
            email,
            password,
            role: 'user',
            approved: false
        });

        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findByCredenials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.json({ user, token });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

const logOutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        });
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
};

const updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email'];
    const filteredUpdates = updates.filter((update) => allowedUpdates.includes(update));

    try {
        filteredUpdates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);

    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logOutUser,
    updateUser,
    deleteUser
};






