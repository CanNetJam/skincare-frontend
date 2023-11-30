import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Adminlogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Send the login data to the server
    axios
      .post('http://localhost:8081/admin/login', { email, password })
      .then((response) => {
        console.log(response.data); // Handle the response data as needed
        // Optionally, you can navigate to a different page upon successful login
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
        }).then(() => {
          navigate('/admin/dashboard');
        });
      })
      .catch((error) => {
        console.error('Error in sending login data:', error);
        // Handle the error state or display an error message to the user
        if (error.response && error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed!',
            text: 'Email and password do not match. Please try again.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed!',
            text: 'An unexpected error occurred. Please try again later.',
          });
        }
      });
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <div>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg shadow-2xl">
            <h1 className="text-center text-2xl font-bold text-gray-800 sm:text-3xl">Admin Login</h1>
            <form
              action=""
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
              onSubmit={handleFormSubmit}
            >
              <p className="text-center text-lg font-medium text-gray-700">Sign in to your account</p>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                className="block w-full rounded-lg bg-gray-800 px-5 py-3 text-sm font-medium text-white"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
