import React from 'react';
import axios from 'axios';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Sidemenu from '../Components/Sidemenu';

function AdminCreate() {
  const initialValues = {
    afname: '',
    alname: '',
    acnumber: '',
    aemail: '',
    apassword: '',
    agender: '',
    abirthday: '',
  };

  const validationSchema = Yup.object().shape({
    afname: Yup.string().required('Required'),
    alname: Yup.string().required('Required'),
    acnumber: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .required('Required'),
    aemail: Yup.string().email('Invalid email').required('Required'),
    apassword: Yup.string().required('Required'),
    agender: Yup.string().required('Required'),
    abirthday: Yup.string().required('Required'),
  });

  const onSubmit = (values) => {
    axios
      .post('http://localhost:8081/adminaccounts', values)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have successfully registered.',
        }).then(() => {
          // navigate('/login');
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
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Sidemenu />
      </div>
      <div style={{ flex: 4, padding: '20px' }}>
        <h1 className='text-2xl mb-2 text-gray-800'>Create an Admin Account</h1>
        <hr />
        <br />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
             <div className="grid grid-cols-3 gap-6">
                <div>
                  <label htmlFor="afname" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="afname"
                    name="afname"
                    className="mt-1 p-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                  /> 
                  <ErrorMessage name="afname" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label htmlFor="alname" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="alname"
                    name="alname"
                    className="mt-1 p-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                  />
                  <ErrorMessage name="alname" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label htmlFor="acnumber" className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <Field
                    type="text"
                    id="acnumber"
                    name="acnumber"
                    className="mt-1 p-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                  />
                  <ErrorMessage name="acnumber" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label htmlFor="aemail" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    id="aemail"
                    name="aemail"
                    className="mt-1 p-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                  />
                  <ErrorMessage name="aemail" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label htmlFor="apassword" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="apassword"
                    name="apassword"
                    className="mt-1 p-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                  />
                  <ErrorMessage name="apassword" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="agender" className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <Field
                    type="text"
                    id="agender"
                    name="agender"
                    className="mt-1 p-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                  />
                  <ErrorMessage name="agender" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label htmlFor="abirthday" className="block text-sm font-medium text-gray-700">
                    Birthday
                  </label>
                  <Field
                    type="date"
                    id="abirthday"
                    name="abirthday" // Corrected the name prop to 'birthday'
                    className="mt-1 p-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                  />
                  <ErrorMessage name="abirthday" component="div" className="text-red-500 text-sm" />{' '}
                  {/* Corrected the name prop to 'birthday' */}
                </div>
              </div>
              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mt-5 text-sm"
                >
                  Create an account
                </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AdminCreate;

