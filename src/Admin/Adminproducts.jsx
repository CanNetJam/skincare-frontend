import React from 'react';
import axios from 'axios';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Sidemenu from '../Components/Sidemenu';

function Adminproducts() {
  const initialValues = {
    pname: '',
    pdescription: '',
    pprice: '',
    pimage: '', 
    pstocks: '',
  };

  const validationSchema = Yup.object().shape({
    pname: Yup.string().required('Product Name is required'),
    pdescription: Yup.string().required('Product Description is required'),
    pprice: Yup.number().required('Price is required'),
    pimage: Yup.mixed().required('Product Image is required'),
    pstocks: Yup.number().required('Stocks is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const data = {
        pname: values.pname,
        pdescription: values.pdescription,
        pprice: values.pprice,
        pimage: values.pimage,
        pstocks: values.pstocks,
      };
  
      const response = await axios.post('http://localhost:8081/products', data);
  
      console.log('Form Data:', data);
  
      Swal.fire({
        icon: 'success',
        title: 'Product Added!',
        text: 'You have successfully added a product.',
      }).then(() => {
        // Additional logic after successful submission
      });
    } catch (error) {
      console.error('Error details:', error);
      let errorMessage = 'Failed to add product. Please try again.';
      if (error.response) {
        errorMessage = error.response.data.error || errorMessage;
      } else if (error.request) {
        errorMessage = 'No response received from the server. Please try again.';
      } else {
        errorMessage = error.message || errorMessage;
      }
      Swal.fire({
        icon: 'error',
        title: 'Failed to add product!',
        text: errorMessage,
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  


  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Sidemenu />
      </div>
      <div style={{ flex: 4, padding: '20px' }}>
        <h1 className='text-2xl mb-2 text-gray-800'>Products</h1>
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
                  <label htmlFor="pname" className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <Field
                    type="text"
                    id="pname"
                    name="pname"
                    className="mt-1 p-2 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                  />
                  <ErrorMessage name="pname" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <text htmlFor="pdescription" className="block text-sm font-medium text-gray-700">
                    Product Description
                  </text>
                  <Field
                    type="text"
                    id="pdescription"
                    name="pdescription"
                    className="mt-1 p-2 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                  />
                  <ErrorMessage name="pdescription" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label htmlFor="pprice" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <Field
                    type="number"
                    id="pprice"
                    name="pprice"
                    placeholder="₱ "
                    className="mt-1 p-2 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                  />
                  <ErrorMessage name="pprice" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label htmlFor="pimage" className="block text-sm font-medium text-gray-700">
                    Product Image
                  </label>
                  <Field
                    type="file"
                    id="pimage"
                    name="pimage"
                    className="mt-1 p-1 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                  />
                  <ErrorMessage name="pimage" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label htmlFor="pstocks" className="block text-sm font-medium text-gray-700">
                    Stocks
                  </label>
                  <Field
                    type="number"
                    id="pstocks"
                    name="pstocks"
                    className="mt-1 p-2 w-full rounded-md border-gray-200 bg-gray-100 text-sm text-gray-700 shadow-sm"
                  />
                  <ErrorMessage name="pstocks" component="div" className="text-red-500 text-sm" />
                </div>
              </div>
              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                >
                  Save Products
                </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Adminproducts;

