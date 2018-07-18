const express = require('express');
const router = express.Router();
const controller = require('../controllers/gsmController')

router.get('/list', controller.get);
router.post('/send', controller.post);

module.exports = router;