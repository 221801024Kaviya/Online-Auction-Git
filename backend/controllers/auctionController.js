// const Auction = require('../models/Auction');

// const getAuctions = async (req, res) => {
//     try {
//         const auctions = await Auction.find().populate('highestBidder', 'username');
//         res.json(auctions);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// const createAuction = async (req, res) => {
//     const { itemName, description, startingBid, auctionEndTime } = req.body;

//     try {
//         const auction = new Auction({
//             itemName,
//             description,
//             startingBid,
//             auctionEndTime,
//             createdBy: req.user.id
//         });

//         await auction.save();
//         res.status(201).json(auction);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to create auction' });
//     }
// };

// module.exports = { getAuctions, createAuction };

const Auction = require('../models/auctionModel');

const createAuction = async (req, res) => {
    try {
        const { title, description, startingBid, endTime } = req.body;

        const newAuction = new Auction({
            title,
            description,
            startingBid,
            endTime,
            createdBy: req.user.id,
        });

        await newAuction.save();
        res.status(201).json(newAuction);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAllAuctions = async (req, res) => {
    try {
        const auctions = await Auction.find();
        res.json(auctions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createAuction, getAllAuctions };
