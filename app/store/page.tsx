"use client";

import { useEffect, useState } from "react";

interface Game {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function StorePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [cart, setCart] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const res = await fetch("/api/games");
      const data: Game[] = await res.json();
      setGames(data);
    };
    fetchGames();
  }, []);

  const addToCart = (game: Game) => {
    setCart((prevCart) => [...prevCart, game]);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="/" className="text-lg font-bold">Home</a>
            <a href="#" className="text-lg">About Us</a>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => alert("Cart feature in progress!")}>
              🛒 Cart
            </button>
            <span>Hello, Username</span>
            <button className="text-red-500" onClick={() => alert("Logging out...")}>
              Logout
            </button>
          </div>
        </nav>
      </header>
      <section className="p-8">
        <h1 className="text-3xl font-bold mb-4">Store</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {games.map((game) => (
            <div key={game.id} className="bg-white shadow-md p-4 rounded">
              <img src={game.imageUrl} alt={game.name} className="mb-4 rounded" />
              <h2 className="text-xl font-semibold">{game.name}</h2>
              <p className="text-gray-500">Price: ${game.price}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => addToCart(game)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
