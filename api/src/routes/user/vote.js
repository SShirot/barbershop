const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const voteController = require('../../controllers/user/voteController');

router.get('/', auth, voteController.getAll);
router.get('/:id', auth,voteController.getById);
router.post('/', auth, voteController.create);
router.put('/:id', auth, voteController.update);
router.delete('/:id',auth, voteController.delete);

module.exports = router;
