// user statuses 
const USER_STATUSES = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    SUSPENDED: 'suspended',
    DELETED: 'deleted'
};

const GITHUB_SEARCH_TYPES = {
    REPOSITORIES: 'repositories',
    CODE: 'code',
    COMMITS: 'commits',
    ISSUES: 'issues',
    USERS: 'users',
    PACKAGES: 'packages',
    WIKIS: 'wikis'
};

const API_BASE_URL = 'https://api.github.com/search';

const REPORT_MODULES = {
    daily: { key: 'daily', unit: 'day' },
    weekly: { key: 'week', unit: 'week' },
    monthly: { key: 'monthly', unit: 'month' }
};

module.exports = {
    USER_STATUSES,
    GITHUB_SEARCH_TYPES,
    API_BASE_URL,
    REPORT_MODULES
};

