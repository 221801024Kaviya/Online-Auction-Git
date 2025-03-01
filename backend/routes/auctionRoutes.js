// const express = require('express');
// const { getAuctions, createAuction } = require('../controllers/auctionController');
// const authMiddleware = require('../middleware/authMiddleware');

// const router = express.Router();

// router.get('/', getAuctions);
// router.post('/', authMiddleware, createAuction);

// module.exports = router;


const express = require('express');
const { createAuction, getAllAuctions } = require('../controllers/auctionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', protect, createAuction);
router.get('/', getAllAuctions);

module.exports = router;
