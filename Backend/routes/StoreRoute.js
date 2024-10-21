

const express = require('express');
// const { signup, login } = require('../controllers/storeController');
const {signup,login}=require("../Controllers/StoreController")

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;



