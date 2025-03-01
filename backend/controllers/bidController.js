// const Bid = require('../models/Bid');
// const Auction = require('../models/Auction');

// const placeBid = async (req, res) => {
//     const { auctionId, bidAmount } = req.body;

//     try {
//         const auction = await Auction.findById(auctionId);
//         if (!auction) return res.status(404).json({ message: 'Auction not found' });

//         if (bidAmount <= auction.highestBid)
//             return res.status(400).json({ message: 'Bid must be higher than the current highest bid' });

//         auction.highestBid = bidAmount;
//         auction.highestBidder = req.user.id;
//         await auction.save();

//         const bid = new Bid({
//             auction: auctionId,
//             bidder: req.user.id,
//             bidAmount
//         });

//         await bid.save();
//         res.status(201).json(bid);
//     } catch (error) {
//         res.status(500).json({ message: 'Error placing bid' });
//     }
// };

// module.exports = { placeBid };

const Bid = require('../models/bidModel');
const Auction = require('../models/auctionModel');
const User = require('../models/userModel');

// Place a Bid
const placeBid = async (req, res) => {
    try {
        const { auctionId, bidAmount } = req.body;
        const userId = req.user.id; // Extract user ID from the request (assuming authMiddleware is used)

        // Check if auction exists
        const auction = await Auction.findById(auctionId);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        // Check if the auction has ended
        if (new Date() > new Date(auction.endTime)) {
            return res.status(400).json({ message: 'Auction has ended' });
        }

        // Check if bid is higher than the last highest bid
        const highestBid = await Bid.findOne({ auction: auctionId }).sort({ bidAmount: -1 });
        if (highestBid && bidAmount <= highestBid.bidAmount) {
            return res.status(400).json({ message: 'Your bid must be higher than the current highest bid' });
        }

        // Create a new bid
        const newBid = new Bid({
            auction: auctionId,
            user: userId,
            bidAmount,
        });

        await newBid.save();

        res.status(201).json({ message: 'Bid placed successfully', bid: newBid });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Highest Bid for an Auction
const getHighestBid = async (req, res) => {
    try {
        const { auctionId } = req.params;

        const auctionExists = await Auction.findById(auctionId);
        if (!auctionExists) {
            return res.status(404).json({ message: "Auction not found" });
        }
        
        const highestBid = await Bid.findOne({ auction: auctionId })
            .sort({ bidAmount: -1 })
            .populate('user', 'name'); // Populate user details

        if (!highestBid) {
            return res.status(404).json({ message: 'No bids found for this auction' });
        }

        res.status(200).json({ highestBid });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { placeBid, getHighestBid };

