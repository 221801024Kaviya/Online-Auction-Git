const Auction = require("../models/auctionModel");

// Create Auction
const createAuction = async (req, res) => {
    try {
        const { itemName, description, amount, auctionTime } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

        if (!itemName || !description || !amount || !auctionTime || !imageUrl) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const auction = new Auction({
            itemName,
            description,
            amount: parseFloat(amount),
            auctionTime,
            image: imageUrl,
            highestBid: parseFloat(amount),
            winner: "",
        });

        await auction.save();
        res.status(201).json({ message: "Auction created successfully!", auction });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// // Get all auctions
// const getAuctions = async (req, res) => {
//     try {
//         const auctions = await Auction.find();
//         res.json(auctions);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch auctions" });
//     }
// };

// const getAllAuctions = async (req, res) => {
//     try {
//         const auctions = await Auction.find();
//         res.json(auctions);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

const getAllAuctions = async (req, res) => {
    try {
        const auctions = await Auction.find().select("itemName description amount auctionTime image currentBid");
        res.status(200).json(auctions);
    } catch (error) {
        console.error("Error fetching auctions:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const closeAuction = async (req, res) => {
    try {
        const { auctionId } = req.params;

        const auction = await Auction.findById(auctionId);
        if (!auction) return res.status(404).json({ message: "Auction not found" });

        if (auction.endTime > new Date()) {
            return res.status(400).json({ message: "Auction is still active" });
        }

        const highestBid = await Bid.findOne({ auction: auctionId }).sort({ bidAmount: -1 });

        auction.winner = highestBid ? highestBid.user : null;
        await auction.save();

        res.status(200).json({
            message: "Auction closed successfully",
            winner: highestBid ? highestBid.user : "No winner",
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//get winners
const getWinners = async (req, res) => {
    try {
        const closedAuctions = await Auction.find({ winner: { $ne: null } })
            .populate("winner", "username");

        res.status(200).json({ closedAuctions });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = { createAuction, getAllAuctions, closeAuction, getWinners };
