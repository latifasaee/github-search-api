const SearchLog = require('../models/Search');

const logSearch = async (userId, keyword) => {
    if (!userId || !keyword) {
        throw new Error('Missing required fields to sreach service.');
    }

    try {
        const searchLog = new SearchLog({ userId, keyword });
        await searchLog.save();
    } catch (error) {
        console.error('Error logging search:', error);
    }
};

module.exports = logSearch;