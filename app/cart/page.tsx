"use client";

import { useState, useEffect } from "react";

interface Game {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<Game[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const totalPrice = cart.reduce((total, game) => total + game.price, 0);

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true); // Open the checkout modal
  };

  const handlePaymentSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const handleFinishPayment = () => {
    alert(`Payment via ${paymentMethod} successful!`);
    alert("Returning to Store...");
    setCart([]); // Clear the cart
    localStorage.removeItem("cart"); // Clear the cart in localStorage
    window.location.href = "/store"; // Redirect to store
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg p-4 sticky top-0 z-50">
        <nav className="flex justify-between items-center container mx-auto">
          <span className="text-xl font-bold text-gray-800">Cart</span>
        </nav>
      </header>

      <section className="p-8">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

        <div className="space-y-4">
          {cart.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            cart.map((game) => (
              <div key={game.id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="font-semibold text-lg">{game.name}</h2>
                <p>Price: ${game.price}</p>
              </div>
            ))
          )}
        </div>

        <div className="mt-4">
          <h2 className="font-bold text-xl">Total Price: ${totalPrice}</h2>
        </div>

        {cart.length > 0 && (
          <div className="mt-6">
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-lg"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </section>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>

            <div className="space-y-4">
              <button
                className="w-full bg-green-600 text-white py-2 rounded-lg"
                onClick={() => handlePaymentSelect("PromptPay")}
              >
                PromptPay
              </button>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
                onClick={() => handlePaymentSelect("PayPal")}
              >
                PayPal
              </button>
              <button
                className="w-full bg-yellow-600 text-white py-2 rounded-lg"
                onClick={() => handlePaymentSelect("TrueMoney")}
              >
                TrueMoney
              </button>
            </div>

            {paymentMethod && (
              <div className="mt-4 text-center">
                <p className="text-lg">You selected: {paymentMethod}</p>
                <button
                  className="bg-green-600 text-white py-2 px-6 rounded-lg mt-4"
                  onClick={handleFinishPayment}
                >
                  Finish Payment
                </button>
              </div>
            )}

            <button
              className="w-full mt-4 text-center text-red-500"
              onClick={() => setIsCheckoutModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
