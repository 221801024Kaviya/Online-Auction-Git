import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostAuction.css";

const PostAuction = ({ addAuction }) => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [auctionTime, setAuctionTime] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName || !description || !amount || !auctionTime || !image) {
      alert("All fields are required!");
      return;
    }
    else{
      alert("Item added Successfully!")
    }

    const newAuction = {
      id: Date.now(),
      itemName,
      description,
      amount: parseFloat(amount),
      auctionTime,
      image,
      highestBid: parseFloat(amount),
      winner: "",
    };

    addAuction(newAuction);
    navigate("/auction-details");
  };

  return (
    <div className="post-auction-container">
      <h2>Post an Auction</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Starting Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <input type="datetime-local" value={auctionTime} onChange={(e) => setAuctionTime(e.target.value)} required />
        <input type="file" accept="image/*" onChange={handleImageUpload} required />
        {image && <img src={image} alt="Auction Preview" className="preview-image" />}
        <button type="submit">Post Auction</button>
      </form>
    </div>
  );
};

export default PostAuction;
