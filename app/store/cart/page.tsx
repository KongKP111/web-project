"use client";

import { useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([
    { id: 1, name: "Game 1", price: 29.99 },
    { id: 2, name: "Game 2", price: 49.99 },
  ]);

  const totalPrice = cart.reduce((acc, game) => acc + game.price, 0);

  const checkout = () => {
    alert("Redirecting to payment options...");
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>
      </header>
      <section className="p-8">
        <div className="bg-white shadow-md p-4 rounded">
          <h2 className="text-xl font-semibold">Cart Items</h2>
          <ul>
            {cart.map((game) => (
              <li key={game.id} className="flex justify-between py-2">
                <span>{game.name}</span>
                <span>${game.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <div className="flex justify-between">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full"
            onClick={checkout}
          >
            Proceed to Checkout
          </button>
        </div>
      </section>
    </main>
  );
}
