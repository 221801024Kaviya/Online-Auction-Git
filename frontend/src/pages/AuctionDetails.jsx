import React, { useEffect, useState } from "react";

const AuctionDetails = () => {
  const [auctions, setAuctions] = useState([]); // Ensure it's an array

  useEffect(() => {
    // Simulate fetching auction data
    const fetchAuctions = async () => {
      try {
        const response = await fetch("http://localhost:5000/auctions"); // Your API endpoint
        const data = await response.json();
        setAuctions(data || []); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching auctions:", error);
        setAuctions([]); // Fallback to empty array
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div>
      <h2>Auction Details</h2>
      {auctions.length > 0 ? (
        auctions.map((auction, index) => (
          <div key={index} className="auction-card">
            <img src={auction.image} alt={auction.name} />
            <h3>{auction.name}</h3>
            <p>{auction.description}</p>
            <p>Current Bid: ₹{auction.currentBid}</p>
            <button>Bid</button>
          </div>
        ))
      ) : (
        <p>No auctions available.</p>
      )}
    </div>
  );
};

export default AuctionDetails;
