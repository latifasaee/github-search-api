const User = require('../models/User');
const reports = require('../services/reports');

const { USER_STATUSES, REPORT_MODULES } = require('../config/constants');

const approveUser = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'userId id required.' });
    };

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        user.approved = true;
        user.status = USER_STATUSES.APPROVED;
        await user.save();
        res.json({ message: 'User approved successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while approveing user.' });
    }
};

const rejectUser = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'userId id required.' });
    };

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        user.status = USER_STATUSES.REJECTED;
        await user.remove();
        res.json({ message: 'User rejected successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while rejecting user.' });
    }
};

const suspendUser = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'userId id required.' });
    };

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        user.approved = false;
        user.status = USER_STATUSES.SUSPENDED;
        await user.save();
        res.json({ message: 'User suspended successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while suspending user.' });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'userId id required.' });
    };

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        user.status = USER_STATUSES.DELETED;
        await user.save();
        res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting user.' });
    }
};

const getReports = async (req, res) => {
    try {
        const { reportModule, keyword = null } = req.body;

        if (!Object.values(REPORT_MODULES).includes(reportModule)) {
            return res.status(400).json({ message: 'Invalid report module.' });
        }

        if (keyword) {
            const getkeywordReport = await reports.generate(reportModule, keyword);
            return res.status(200).json(getkeywordReport);
        };

        const getReport = await Report.generate(reportModule);

        res.status(200).json(getReport);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while generating report.' });
    }
};

module.exports = {
    approveUser,
    rejectUser,
    suspendUser,
    deleteUser,
    getReports
};
