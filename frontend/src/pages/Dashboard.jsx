import React from "react";
import "./Dashboard.css";

const Dashboard = ({ auctions }) => {
  return (
    <div className="dashboard-container">
      <h2>Auction Dashboard</h2>
      <div className="auction-list">
        {auctions.map((auction) => (
          <div key={auction.id} className="dashboard-card">
            <img src={auction.image} alt={auction.itemName} />
            <h3>{auction.itemName}</h3>
            <p>Highest Bid: ₹{auction.highestBid}</p>
            <p>
              {new Date(auction.auctionTime) < new Date() ? (
                <strong>Winner: {auction.winner || "Not Yet Decided"}</strong>
              ) : (
                <span>Ongoing Auction</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
