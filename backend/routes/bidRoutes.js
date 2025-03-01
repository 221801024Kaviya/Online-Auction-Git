// const express = require('express');
// const { placeBid, getBidsForAuction } = require('../controllers/bidController');
// const { protect } = require('../middleware/authMiddleware');

// const router = express.Router();

// // Place a new bid (User must be authenticated)
// router.post('/:auctionId', protect, placeBid);

// // Get all bids for a specific auction
// router.get('/:auctionId', getBidsForAuction);

// module.exports = router;


const express = require('express');
const { placeBid, getHighestBid } = require('../controllers/bidController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/place', protect, placeBid);
router.get('/highest/:auctionId', getHighestBid);

module.exports = router;
