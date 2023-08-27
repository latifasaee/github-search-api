const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.post('/user/suspend', authenticate, authorize(['admin']), adminController.suspendUser);
router.post('/users/reject', authenticate, authorize(['admin']), adminController.rejectUser);
router.post('/users/approve', authenticate, authorize(['admin']), adminController.approveUser);
router.post('/users/delete', authenticate, authorize(['admin']), adminController.deleteUser);
router.get('/reports', authenticate, authorize(['admin']), adminController.getReports);

module.exports = router;