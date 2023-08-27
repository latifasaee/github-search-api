const { logSearch } = require('../services/search');
const { GITHUB_SEARCH_TYPES, API_BASE_URL } = require('../config/constants');

const searchRepos = async (req, res) => {
    const { searchType, keyword } = req.params;

    const { user } = req;

    if (!user || !searchType || !keyword) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    if (!Object.values(GITHUB_SEARCH_TYPES).includes(searchType)) {
        return res.status(400).json({ message: 'Invalid search type.' });
    }

    const apiUrl = `${API_BASE_URL}/${searchType}/${encodeURIComponent(keyword)}`;

    try {
        const response = await axios.get(apiUrl);

        if (response.status !== 200 || !response.data) {
            return res.status(404).json({ message: 'No result was found for the given search.' });
        }
        if (response.data.items.length === 0) {
            return res.status(404).json({ error: `Unable to find the ${keyword}. Try another search.` });
        }

        // Save the search
        await logSearch(user._id, keyword);

        res.status(200).json(response.data.items);
    } catch (error) {
        res.status(500).json({ error: 'The github api is not available' });
    }
};

module.exports = { searchRepos };
