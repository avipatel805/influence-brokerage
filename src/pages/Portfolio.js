import { useState } from "react";

export default function Portfolio({ holdings, sellStock }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center">My Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {Object.keys(holdings).length > 0 ? (
          Object.entries(holdings).map(([name, count]) => (
            count > 0 && (
              <div key={name} className="p-6 rounded-xl shadow-lg bg-gray-800 flex flex-col justify-between">
                <h2 className="text-xl font-bold text-gray-200">{name}</h2>
                <p className="text-sm text-gray-400">Shares: {count}</p>
                <button onClick={() => sellStock(name, 1000)} className="mt-auto w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg text-lg">Sell</button>
              </div>
            )
          ))
        ) : (
          <p className="text-center text-gray-400 mt-6">You don't own any stocks yet.</p>
        )}
      </div>
    </div>
  );
}
