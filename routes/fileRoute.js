const router = require('express').Router();
const fileController = require('../controllers/fileController');

router.post('/localFileUpload', fileController.localFileUpload);
router.post('/imageUpload', fileController.imageUpload);
router.post('/videoUpload', fileController.videoUpload);
router.post('/imageSizeReducer', fileController.imageSizeReducer);

module.exports = router;