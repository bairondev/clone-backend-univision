const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// api/videos

//create video
router.post('/', 
    auth,
    [
        check('name', 'Name is mandatory').not().isEmpty(),
        check('description', 'Description is mandatory').not().isEmpty(),
        check('category', 'Category is mandatory').not().isEmpty(),
        check('video', 'Video url & id is mandatory').not().isEmpty()
    ],
    videoController.createVideo
);

// List videos
router.get('/',
    auth,
    videoController.getVideo
);

// PreviewVideo video
router.get('/preview/:id',
    auth,
    videoController.previewVideo
);

// My owner videos
router.get('/me', 
    auth,
    videoController.meVideo
);

// Update video
router.put('/:id', 
    auth,
    [
        check('name', 'Name is mandatory').not().isEmpty(),
        check('description', 'Description is mandatory').not().isEmpty(),
        check('category', 'Category is mandatory').not().isEmpty()
    ],
    videoController.updateVideo
);

// Delete video
router.delete('/:id', 
    auth,
    videoController.deleteVideo
);



module.exports = router;