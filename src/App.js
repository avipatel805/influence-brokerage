import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Search } from "lucide-react";

const initialInfluencers = [
  { name: "Taylor Swift", category: "Music", price: 1850, volume: 500000, news: "Taylor Swift announces new album release date!" },
  { name: "MrBeast", category: "Trending Influencer", price: 1320, volume: 400000, news: "MrBeast launches latest high-budget giveaway challenge." },
  { name: "Kim Kardashian", category: "Reality TV", price: 1650, volume: 450000, news: "Kim Kardashian reveals new skincare line." },
  { name: "Elon Musk", category: "Tech", price: 2100, volume: 600000, news: "Elon Musk teases new AI-driven Tesla model." },
  { name: "Beyoncé", category: "Music", price: 1750, volume: 470000, news: "Beyoncé's latest tour sells out in record time." },
  { name: "Drake", category: "Music", price: 1600, volume: 420000, news: "Drake hints at an upcoming collaboration with Kendrick Lamar." },
  { name: "Dwayne Johnson", category: "Movies", price: 1950, volume: 500000, news: "Dwayne Johnson to star in a new superhero movie." },
  { name: "Zendaya", category: "Movies", price: 1800, volume: 460000, news: "Zendaya receives critical acclaim for her latest role." },
];

function Market() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [influencers, setInfluencers] = useState(initialInfluencers);

  useEffect(() => {
    const interval = setInterval(() => {
      setInfluencers((prevInfluencers) =>
        prevInfluencers.map((influencer) => {
          const newPrice = Math.max(500, influencer.price + Math.floor(Math.random() * 200 - 100));
          return {
            ...influencer,
            price: newPrice,
            volume: influencer.volume + Math.floor(Math.random() * 5000 - 2500),
            priceChange: newPrice >= influencer.price ? "green" : "red",
          };
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container">
      <h1>Influencer Market</h1>
      <div className="category-buttons">
        {["All", "Music", "Movies", "Trending Influencer"].map((cat) => (
          <button 
            key={cat} 
            className={`button ${category === cat ? "active" : ""}`} 
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="search-container">
        <input
          className="search-input"
          placeholder="Search influencers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid-container">
        {influencers
          .filter((influencer) => category === "All" || influencer.category === category)
          .map((influencer) => (
            <div key={influencer.name} className="card">
              <h2>{influencer.name}</h2>
              <p>{influencer.category}</p>
              <p className={`price ${influencer.priceChange}`}>${influencer.price}</p>
              <p className="volume">Volume: {influencer.volume.toLocaleString()}</p>
              <p className="news">News: {influencer.news} (Information is not accurate.)</p>
              <div className="buy-button">Buy</div>
            </div>
          ))}
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <div className="page-container">
      <h1>My Portfolio</h1>
      <p>Portfolio content goes here.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/market" />} />
      </Routes>
      <div className="page-container">
        <nav className="nav-bar">
          <Link to="/market">Market</Link>
          <Link to="/portfolio">My Portfolio</Link>
        </nav>
        <Routes>
          <Route path="/market" element={<Market />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}