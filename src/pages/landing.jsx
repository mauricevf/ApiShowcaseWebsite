import { useState, useEffect } from 'react';
import '../App.css';
import React from 'react';

function App() {
  const [items, setItems] = useState([]);

  async function getData() {
    try {
      const response = await fetch('http://145.24.223.71:8000/songs/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      const data = await response.json();
      console.log(data);
      setItems(data.items || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Top Songs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 text-center flex flex-col h-full">
             <a href={`http://localhost:5173/songs/${item.id}`}>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{item.song}</h2>
              </a>
              <p className="text-sm text-gray-600 mb-1">Artist: {item.artist}</p>
              <p className="text-sm text-gray-600 mb-1">Album: {item.album}</p>
              <p className="text-sm text-gray-600">Genre: {item.genre}</p>
            </div>
          ))
        ) : (
          <p>No songs found...</p>
        )}
      </div>
      <div>
        <button
          onClick={() => window.location.href = 'http://localhost:5173/songs/create'}
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Song
        </button>
      </div>
    </div>
  );
}

export default App;
