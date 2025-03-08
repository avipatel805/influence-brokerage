// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
// // import "./styles.css";
// // import "./index.css";

// const initialInfluencers = [
//   { name: "Taylor Swift", category: "Music", price: 1850, volume: 500000, news: "Taylor Swift announces new album release date!" },
//   { name: "MrBeast", category: "Trending Influencer", price: 1320, volume: 400000, news: "MrBeast launches latest high-budget giveaway challenge." },
//   { name: "Kim Kardashian", category: "Reality TV", price: 1650, volume: 450000, news: "Kim Kardashian reveals new skincare line." },
//   { name: "Elon Musk", category: "Tech", price: 2100, volume: 600000, news: "Elon Musk teases new AI-driven Tesla model." },
//   { name: "Beyoncé", category: "Music", price: 1750, volume: 470000, news: "Beyoncé's latest tour sells out in record time." },
//   { name: "Drake", category: "Music", price: 1600, volume: 420000, news: "Drake hints at an upcoming collaboration with Kendrick Lamar." },
//   { name: "Dwayne Johnson", category: "Movies", price: 1950, volume: 500000, news: "Dwayne Johnson to star in a new superhero movie." },
//   { name: "Zendaya", category: "Movies", price: 1800, volume: 460000, news: "Zendaya receives critical acclaim for her latest role." },
// ];

// function Market() {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [influencers, setInfluencers] = useState(initialInfluencers);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setInfluencers((prevInfluencers) =>
//         prevInfluencers.map((influencer) => {
//           const newPrice = Math.max(500, influencer.price + Math.floor(Math.random() * 200 - 100));
//           return {
//             ...influencer,
//             price: newPrice,
//             volume: influencer.volume + Math.floor(Math.random() * 5000 - 2500),
//             priceChange: newPrice >= influencer.price ? "text-green-400" : "text-red-400",
//           };
//         })
//       );
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <h1 className="text-4xl font-bold text-center">Influencer Market</h1>
//       <div className="flex justify-center space-x-4 mt-6">
//         {["All", "Music", "Movies", "Trending Influencer"].map((cat) => (
//           <button 
//             key={cat} 
//             className={`px-4 py-2 rounded-lg text-lg font-semibold ${category === cat ? "bg-blue-500" : "bg-gray-700"}`} 
//             onClick={() => setCategory(cat)}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>
//       <div className="flex justify-center items-center gap-2 mt-6">
//         <input
//           className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
//           placeholder="Search influencers..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         {influencers
//           .filter((influencer) => category === "All" || influencer.category === category)
//           .map((influencer) => (
//             <div key={influencer.name} className="p-6 rounded-xl shadow-lg bg-gray-800 flex flex-col justify-between">
//               <h2 className="text-xl font-bold text-gray-200">{influencer.name}</h2>
//               <p className="text-sm text-gray-400">{influencer.category}</p>
//               <p className={`text-2xl font-bold ${influencer.priceChange}`}>${influencer.price}</p>
//               <p className="text-sm text-gray-500">Volume: {influencer.volume.toLocaleString()}</p>
//               <p className="text-sm text-blue-400">News: {influencer.news} (Information is not accurate.)</p>
//               <button className="mt-auto w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-lg">Buy</button>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// function Portfolio() {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <h1 className="text-4xl font-bold text-center">My Portfolio</h1>
//       <p className="text-center mt-4">Portfolio content goes here.</p>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/market" />} />
//       </Routes>
//       <div className="p-6 space-y-4 bg-gray-900 min-h-screen">
//         <nav className="flex justify-start space-x-6 bg-gray-900 p-4 shadow-md">
//           <Link to="/market" className="text-blue-400 text-lg font-semibold hover:text-blue-500">Market</Link>
//           <Link to="/portfolio" className="text-blue-400 text-lg font-semibold hover:text-blue-500">My Portfolio</Link>
//         </nav>
//         <Routes>
//           <Route path="/market" element={<Market />} />
//           <Route path="/portfolio" element={<Portfolio />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }


import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import Market from "./pages/Market";
import Portfolio from "./pages/Portfolio";
import Navbar from "./components/Navbar";

export default function App() {
  const [balance, setBalance] = useState(10000);
  const [holdings, setHoldings] = useState({});

  const buyStock = (name, price) => {
    if (balance >= price) {
      setBalance(balance - price);
      setHoldings((prev) => ({
        ...prev,
        [name]: (prev[name] || 0) + 1,
      }));
    } else {
      alert("Not enough funds!");
    }
  };

  const sellStock = (name, price) => {
    if (holdings[name] && holdings[name] > 0) {
      setBalance(balance + price);
      setHoldings((prev) => ({
        ...prev,
        [name]: prev[name] - 1,
      }));
    } else {
      alert("You don't own this stock!");
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/market" />} />
      </Routes>
      <div className="p-6 space-y-4 bg-gray-900 min-h-screen">
        <Navbar />
        <div className="text-white text-lg font-semibold text-right pr-6">💰 Balance: ${balance.toLocaleString()}</div>
        <Routes>
          <Route path="/market" element={<Market buyStock={buyStock} />} />
          <Route path="/portfolio" element={<Portfolio holdings={holdings} sellStock={sellStock} />} />
        </Routes>
      </div>
    </Router>
  );
}
