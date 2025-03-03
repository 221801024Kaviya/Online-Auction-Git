import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await fetch("http://localhost:5000/api/auctions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Send token in headers
          },
        });
  
        if (response.status === 401) {
          console.error("Unauthorized! Please log in again.");
          // Redirect to login page if needed
        }
  
        const data = await response.json();
        setAuctions(data || []);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };
  
    fetchAuctions();
  }, []);
  
  
  return (
    <div className="dashboard-container">
      <h2>Auction Dashboard</h2>
      <div className="auction-list">
        {auctions.length > 0 ? (
          auctions.map((auction) => (
            <div key={auction._id} className="dashboard-card">
              <img src={auction.image} alt={auction.itemName} />
              <h3>{auction.itemName}</h3>
              <p><strong>Highest Bid:</strong> ₹{auction.highestBid}</p>
              <p>
                {new Date(auction.auctionTime) < new Date() ? (
                  <strong>Winner: {auction.winner || "Not Yet Decided"}</strong>
                ) : (
                  <span>Ongoing Auction</span>
                )}
              </p>
            </div>
          ))
        ) : (
          <p>No auctions available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
