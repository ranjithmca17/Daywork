const express = require('express');
const { AdminSignup, AdminLogin } = require('../Controllers/adminController');
const { fetchAdmin } = require('../Middleware/adminauthMiddleware');

const adminRouter = express.Router();

adminRouter.post('/signup', AdminSignup);
adminRouter.post('/login', AdminLogin);
adminRouter.get('/verify-token', fetchAdmin, (req, res) => {
    res.json({ success: true, user: req.admin });
});

module.exports = { adminRouter };
