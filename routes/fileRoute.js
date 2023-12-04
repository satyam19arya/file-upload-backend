const router = require('express').Router();
const fileController = require('../controllers/fileController');

router.post('/localFileUpload', fileController.localFileUpload);

module.exports = router;