import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Footer from '../Components/Footer';
import Navbar from '../Components/TopNav';
import photo1 from '../assets/1.jpg';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Registration = () => {
  const navigate = useNavigate();

  const initialValues = {
    fname: '',
    lname: '',
    cnumber: '',
    email: '',
    password: '',
    gender: '',
    birthday: ''
  };

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required('Required'),
    lname: Yup.string().required('Required'),
    cnumber: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
    birthday: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
  });

  const onSubmit = (values) => {
    // Simulating a successful registration
    const isRegistrationSuccessful = true; // Change this value to simulate success or failure
  
    if (isRegistrationSuccessful) {
      axios
        .post('http://localhost:8081/users', values)
        .then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'You have successfully registered.',
          }).then(() => {
            navigate('/login');
          });
        })
        .catch((error) => {
          console.error('Error details:', error); // Log the complete error details for debugging
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed!',
            text: 'Please check the form and try again.',
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed!',
        text: 'Please check the form and try again.',
      });
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="w-1/2">
          <img src={photo1} alt="Registration" className="object-cover h-screen w-full" />
        </div>
        <div className="w-1/2 bg-white p-8">
          <h1 className="text-3xl font-bold mb-4">Create an Account</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <Field
                      type="text"
                      id="fname"
                      name="fname"
                      className="mt-1 p-3 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                    />
                    <ErrorMessage name="fname" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <label htmlFor="lname" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      id="lname"
                      name="lname"
                      className="mt-1 p-3 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                    />
                    <ErrorMessage name="lname" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <label htmlFor="cnumber" className="block text-sm font-medium text-gray-700">
                      Contact Number
                    </label>
                    <Field
                      type="text"
                      id="cnumber"
                      name="cnumber"
                      className="mt-1 p-3 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                    />
                    <ErrorMessage name="cnumber" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 p-3 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="mt-1 p-3 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500" />
                  </div>
                  <div>
  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
    Gender
  </label>
  <Field
    type="text"
    id="gender"
    name="gender"
    className="mt-1 p-3 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
  />
  <ErrorMessage name="gender" component="div" className="text-red-500" />
</div>

<div>
  <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
    Birthday
  </label>
  <Field
    type="date"
    id="birthday"
    name="birthday" // Corrected the name prop to 'birthday'
    className="mt-1 p-3 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
  />
  <ErrorMessage name="birthday" component="div" className="text-red-500" /> {/* Corrected the name prop to 'birthday' */}
</div>

                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Create an account
                  </button>
                  <p className="text-gray-500 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 underline">
                      Log in
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registration;
