import React from 'react';
import { Link } from 'react-router-dom';
import photo1 from '../assets/4.jpg';
import photo2 from '../assets/5.jpg';
import photo3 from '../assets/6.jpg';
import photo4 from '../assets/7.jpg';
import photo5 from '../assets/8.jpg';
import photo6 from '../assets/9.jpg';
import photo7 from '../assets/10.jpg';
import photo8 from '../assets/11.jpg';



function ProductsView() {
  return (
    <section className='pb-6'>
  <div className="max-w-screen min-h-screen h-auto px-4 py-4 mx-auto sm:px-6 sm:py-8 lg:px-8">
    <header className="text-center">
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
        Best Sellers
      </h2>

      <p className="max-w-lg mx-auto text-gray-500">
        Not sure where to start? Then try our best sellers below! These are the people's choice, so its guaranteed to be effective. 
      </p>
    </header>

    <ul className="h-full grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
      <li>
        <Link to={`/details/product/`} className="group block">
        <div className="h-[250px] sm:h-[350px] relative overflow-hidden">
          <div className="absolute left-0 top-0 h-16 w-16">
            <div className="absolute transform z-10 -rotate-45 bg-gray-900 text-center text-white text-lg font-semibold py-1 left-[-40px] top-[32px] w-[180px]">
              Best Seller
            </div>
          </div>
          <img
            src={photo1}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
          />

          <img
            src={photo2}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
          />
        </div>

        <div className="mt-3">
          <h3
            className="text-md text-gray-900 group-hover:underline group-hover:underline-offset-4"
          >
            Klued - 5% Mandelic Acid Clarifying Toner
          </h3>

          <p className="mt-1.5 max-w-[40ch] text-xs text-gray-800">
          AHA toner that is less irritating yet effectively brightens uneven skin tone and refines your skin texture. 
          </p>
        </div>
        </Link>
      </li>

      <li>
        <Link to={`/details/product/`} className="group block">
          <div className="relative h-[250px] sm:h-[350px] overflow-hidden">
            <div className="absolute left-0 top-0 h-16 w-16">
              <div className="absolute transform z-10 -rotate-45 bg-gray-900 text-center text-white text-lg font-semibold py-1 left-[-40px] top-[32px] w-[180px]">
                Best Seller
              </div>
            </div>
            <img
              src={photo3}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
            />

            <img
              src={photo4}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
            />
          </div>

          <div className="mt-3">
            <h3
              className="text-md text-gray-900 group-hover:underline group-hover:underline-offset-4"
            >
              Klued - 2% Salicylic Acid Gentle Cleanser
            </h3>

            <p className="mt-1.5 max-w-[40ch] text-xs text-gray-800">
            A Salicylic Acid Cleanser with pH level 5.5. This non-stripping, non-drying, unscented, lightly foaming cleanser is effectively cleansing and unclogging the skin.
            </p>
          </div>
        </Link>
      </li>

      <li>
        <Link to={`/details/product/`} className="group block">
        <div className="relative h-[250px] sm:h-[350px] overflow-hidden">
          <div className="absolute left-0 top-0 h-16 w-16">
            <div className="absolute transform z-10 -rotate-45 bg-gray-900 text-center text-white text-lg font-semibold py-1 left-[-40px] top-[32px] w-[180px]">
              Best Seller
            </div>
          </div>
          <img
            src={photo5}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
          />

          <img
            src={photo6}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
          />
        </div>

        <div className="mt-3">
          <h3
            className="text-md text-gray-900 group-hover:underline group-hover:underline-offset-4"
          >
          Klued - Double Oat Moisturizer
          </h3>

          <p className="mt-1.5 max-w-[40ch] text-xs text-gray-800">
          A lightweight yet moisturizing moisturizer for all skin type, Klued Double Oat Moisturizer has skin loving ingredients supporting skin barrier.
          </p>
        </div>
        </Link>
      </li>

      <li>
        <Link to={`/details/product/`} className="group block">
        <div className="relative h-[250px] sm:h-[350px] overflow-hidden">
          <div className="absolute left-0 top-0 h-16 w-16">
            <div className="absolute transform z-10 -rotate-45 bg-gray-900 text-center text-white text-lg font-semibold py-1 left-[-40px] top-[32px] w-[180px]">
              Best Seller
            </div>
          </div>
          <img
            src={photo7}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
          />

          <img
            src={photo8}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
          />
        </div>

        <div className="mt-3">
          <h3
            className="text-md text-gray-900 group-hover:underline group-hover:underline-offset-4"
          >
            Klued - 5% Niacinamide Serum
          </h3>

          <p className="mt-1.5 max-w-[40ch] text-xs text-gray-800">
          Brightening, Repairing, Clarifying, Hydrating. Klued 5% Niacinamide Serum your new bestie serum targeting skin redness and irritation rich in skin-loving and repairing ingredients to support your skin barrier to smoother skin.
          </p>
        </div>
        </Link>
      </li>
    </ul>
  </div>
</section>
  )
}

export default ProductsView