const express = require('express');
const { getRamadanSchedules, createRamadanSchedules, uploadRamadanSchedules } = require('../controllers/ramadanController');

const router = express.Router();

router.get('/', getRamadanSchedules);
router.post('/', createRamadanSchedules);
router.post('/upload', uploadRamadanSchedules);


module.exports = router;