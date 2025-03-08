import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
        prevInfluencers.map((influencer) => ({
          ...influencer,
          price: Math.max(500, influencer.price + Math.floor(Math.random() * 200 - 100)),
          volume: influencer.volume + Math.floor(Math.random() * 5000 - 2500),
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Market</h1>
      <div className="flex space-x-4 mt-4">
        {["All", "Music", "Movies", "Trending Influencer"].map((cat) => (
          <Button key={cat} onClick={() => setCategory(cat)}>{cat}</Button>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Search className="w-5 h-5" />
        <Input
          placeholder="Search influencers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {influencers
          .filter((influencer) => category === "All" || influencer.category === category)
          .map((influencer) => (
            <Card key={influencer.name} className="p-4">
              <CardContent>
                <h2 className="text-lg font-semibold">{influencer.name}</h2>
                <p className="text-sm text-gray-500">{influencer.category}</p>
                <p className="text-xl font-bold">${influencer.price}</p>
                <p className="text-sm text-gray-700">Volume: {influencer.volume.toLocaleString()}</p>
                <p className="text-sm text-blue-500">News: {influencer.news} (Information is not accurate.)</p>
                <Button className="mt-2 w-full">Buy</Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <div>
      <h1 className="text-2xl font-bold">My Portfolio</h1>
      <p>Portfolio content goes here.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="p-6 space-y-4">
        <nav className="flex space-x-4">
          <Link to="/market" className="text-blue-500">Market</Link>
          <Link to="/portfolio" className="text-blue-500">My Portfolio</Link>
        </nav>
        <Routes>
          <Route path="/market" element={<Market />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/" element={<Market />} />
        </Routes>
      </div>
    </Router>
  );
}
