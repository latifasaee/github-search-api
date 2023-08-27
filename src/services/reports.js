const moment = require('moment');
const Search = require('../models/Search');

const { REPORT_MODULES } = require('../config/constants');

const generate = async (unit, keyword = null) => {
    const errorResponse = {};
    if (!unit) {
        errorResponse.error = 'Missing required params to report service.';
        return errorResponse;
    }

    try {
        const { unit } = REPORT_MODULES[unit];
        const startDate = moment.startOf(unit);
        const endDate = moment.endOf(unit);

        const queryOptions = {
            timestamp: { $gte: startDate.toDate(), $lte: endDate.toDate() }
        };
        if (keyword) { queryOptions.keyword = keyword; };

        const reportData = await Search.find(options);

        if (keyword) {
            // Generate report based on keyword and time period
            return generateKeywordReport(reportData);

        } else {
            // Generate report based on time period only
            return generateGeneralReport(reportData);
        }

    } catch (error) {
        errorResponse.error = 'Failed to generate report.';
        return errorResponse;
    };
};


const generateKeywordReport = async (reportData) => {
    try {
        const searchReport = {
            searchCount: 0,
            keywordCount: {}
        };

        // Count keyword searches
        reportData.forEach(log => {
            const { keyword } = log;
            if (!searchReport.keywordCount[keyword]) {
                searchReport.keywordCount[keyword] = 1;
            } else {
                searchReport.keywordCount[keyword]++;
            }
            searchReport.searchCount++;
        });

        return searchReport;
    } catch (error) {
        return {
            error: 'An error occurred while generating the report.'
        };
    }
};

function generateGeneralReport(reportData) {
    try {
        const formattedData = {
            searchCount: 0,
            searchesByUsers: {},
            keywords: [],
        };

        // Count searches by user and keyword within given time period
        reportData.forEach(log => {
            const { userId, keyword } = log;

            if (!formattedData.searchesByUsers[userId]) {
                formattedData.searchesByUsers[userId] = 1;
            } else {
                formattedData.searchesByUsers[userId]++;
            }

            if (!formattedData.keywords.includes(keyword)) {
                formattedData.keywords.push(keyword);
            }
            searchReport.searchCount++;
        });

        return formattedData;
    } catch (error) {
        return {
            error: 'An error occurred while generating the report.'
        };
    }
}

module.exports = {
    generate
};
