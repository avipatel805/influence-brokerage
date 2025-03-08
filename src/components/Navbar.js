import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-start space-x-6 bg-gray-900 p-4 shadow-md">
      <Link to="/market" className="text-blue-400 text-lg font-semibold hover:text-blue-500">Market</Link>
      <Link to="/portfolio" className="text-blue-400 text-lg font-semibold hover:text-blue-500">My Portfolio</Link>
    </nav>
  );
}
