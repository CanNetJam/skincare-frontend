import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch('http://localhost:8081/cart');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCartData(data.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
      <div className="relative w-screen max-w-sm border border-gray-600 bg-white px-4 py-8 sm:px-6 lg:px-8" aria-modal="true" role="dialog" tabIndex="-1">
        <button
          className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
          onClick={onClose}
        >
          <span className="sr-only">Close cart</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mt-4 space-y-6 max-h-96 overflow-y-auto">
          <ul className="space-y-4">
            {cartData.map((item, index) => (
              <li key={index} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.cname}
                  className="h-16 w-16 rounded object-cover"
                />
                <div>
                  <h3 className="text-sm text-gray-900">{item.cname}</h3>
                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">Price:</dt>
                      <dd className="inline">{item.cprice}</dd>
                    </div>
                    <div>
                      <dt className="inline text-md">Quantity:</dt>
                      <dd className="inline">{item.cquantity}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-4 text-center">
            <Link
              to="/cartdetails"
              className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
            >
              View my cart ({cartData.length})
            </Link>

            <a
              href="#"
              className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
            >
              Checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
