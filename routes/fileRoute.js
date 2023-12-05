const router = require('express').Router();
const fileController = require('../controllers/fileController');

router.post('/localFileUpload', fileController.localFileUpload);
router.post('/imageUpload', fileController.imageUpload);

module.exports = router;