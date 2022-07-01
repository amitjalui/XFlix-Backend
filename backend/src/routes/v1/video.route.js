const express = require('express');
const validate = require('../../middlewares/validate')
const { videoValidation } = require('../../validations/index.js');
const { videoController }  = require('../../controllers/index.js');

const router = express.Router();

router.get('/:videoId', validate(videoValidation.getVideo), videoController.getVideoById);
router.get('/', validate(videoValidation.searchVideos), videoController.getVideos);
router.post('/', validate(videoValidation.addVideo), videoController.addVideo);
router.patch('/:videoId/views', validate(videoValidation.updateViews), videoController.changeViews);
router.patch('/:videoId/votes', validate(videoValidation.updateVotes), videoController.changeVotes);


module.exports = router;
