// const mongoose = require('mongoose');

// const auctionSchema = new mongoose.Schema({
//     itemName: { type: String, required: true },
//     description: { type: String },
//     startingBid: { type: Number, required: true },
//     highestBid: { type: Number, default: 0 },
//     highestBidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     auctionEndTime: { type: Date, required: true },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Auction', auctionSchema);


const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: String,
    description: String,
    startingBid: Number,
    endTime: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Auction', auctionSchema);
