import React from 'react';
import photo1 from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Sidemenu() {
  return (
    <div className="h-screen flex bg-white">
      <div className="w-64 flex flex-col border-e">
        <div className="px-4 py-6">
          <span className="h-10 w-32 flex items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-600">
            <img src={photo1} alt="Logo " />
          </span>

          <ul className="mt-6 space-y-1">

          <li>
        <Link
          to="/admin/dashboard"
          className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
        >
          Dashboard
        </Link>
      </li>

      <li>
        <Link
          to="/admin/products"
          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          Products
        </Link>
      </li>

          <li>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="text-sm font-medium"> Orders </span>

            <span
              className="shrink-0 transition duration-300 group-open:-rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <ul className="mt-2 space-y-1 px-4">

            <li>
              <Link
                to='/admin/shipping'
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Shipping
              </Link>
            </li>

            <li>
              <a
                href=""
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Completed
              </a>
            </li>

            <li>
              <a
                href=""
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Cancellation
              </a>
            </li>

            <li>
              <a
                href=""
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Return/Refund
              </a>
            </li>


            <li>
              <a
                href=""
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Failed Delivery
              </a>
            </li>

            <li>
              <a
                href=""
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Unpaid
              </a>
            </li>
          </ul>
        </details>
      </li>

      <li>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="text-sm font-medium"> Accounts </span>

            <span
              className="shrink-0 transition duration-300 group-open:-rotate-180"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <ul className="mt-2 space-y-1 px-4">

            <li>
              <Link
                to="/accounts/createaccount"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Create Account
              </Link>
            </li>

            <li>
              <Link
                to='/accounts/useraccounts'
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                User Accounts
              </Link>
            </li>

            <li>
              <Link
                to='/accounts/adminaccounts'
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Admin Accounts
              </Link>
            </li>
          </ul>
        </details>
      </li>
 
          </ul>
        </div>

        <div className="border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <div>
              <p className="text-xs">
                <strong className="block font-medium">Carlo Carl</strong>
                <span> carl@kluedskincare.com </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidemenu;
