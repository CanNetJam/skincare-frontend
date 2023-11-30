import React, { useState, useEffect } from 'react';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <section>
        <div className="mx-auto  max-w-screen-xl px-4 sm:pt-8 pt-16 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>
            <p className="mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit natus?
            </p>
          </header>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.productid} className="shadow-md rounded-md overflow-hidden">
                <Link to={`/products/${product.productid}`} className="group block overflow-hidden">
                  <img
                    src={`http://localhost:8081/${product.pimage}`} // Make sure the path is correct
                    alt="product-image"
                    className="h-[350px] w-full object-cover transition duration-300 group-hover:scale-105 sm:h-[450px]"
                  />
                  <div className="relative bg-white pt-3 p-2">
                    <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">{product.pname}</h3>
                    <p className="mt-2">
                      <span className="tracking-wider text-gray-900">₱ {product.pprice}</span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Products;
