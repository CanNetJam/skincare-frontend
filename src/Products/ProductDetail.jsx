import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import photo1 from '../assets/routine.png';
import photo2 from '../assets/do.png';
import photo3 from '../assets/dont.png';
import photo4 from '../assets/howtouse.png';
import photo5 from '../assets/precaution.png';
import photo6 from '../assets/ingredients.png';

const ProductDetail = () => {
  const { productid } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isChecked, setIsChecked] = useState(false); 

  const handleAddToCart = async () => {
    try {
      let cart = localStorage.getItem("items")
      let items = []
      const obj= {
        client: null,
        product: product,
        quantity: quantity
      }

      if ( cart == null) {
        items[0] = obj
        localStorage.setItem("items", JSON.stringify(items));
      }
      if (cart !== null) {
        let currentCart = JSON.parse(localStorage.getItem("items"))
        if (currentCart !== null) {
          currentCart.map((a)=> {
            if (a.productid !== product.productid){
              currentCart.push(obj)
            }
          })
          localStorage.setItem("items", JSON.stringify(currentCart));
        } 
        if (currentCart[0] === undefined) {
          items[0] = obj
          localStorage.setItem("items", JSON.stringify(items));
        }
      }
      //const savedCards = JSON.parse(localStorage.getItem("droppedCards"));
      /*
      const response = await fetch('http://localhost:8081/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productid: productid,
          cquantity: quantity,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Product added to cart:', data);
      Swal.fire({
        icon: 'success',
        title: 'Product added to cart',
        showConfirmButton: true,
        timer: 500,
      });
      // You can redirect to the cart page or any other page after successfully adding the product to the cart
      */
    } catch (error) {
      console.error('Error adding product to cart:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
      });
    }
  };
  //let haha = JSON.parse(localStorage.getItem("testing"))
  //console.log(haha)
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8081/products/${productid}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchProduct();
  }, [productid]);

  if (!product) {
    return <div>Loading...</div>; 
  }
  
  return (
    <div>
      <div>
        <Navbar/>
      </div>

      <div className='grid grid-cols-2'>
        <div>
            <img src={product.pimage} alt="Product" className='' />
        </div>

        <div className='p-5'> 
          <p className='text-3xl text-gray-800 mt-5 font-sans '>{product.pname}</p>
          <p className='text-gray-700 mt-4'>{product.pdescription}</p>
          <p className='text-gray-800 mt-2 text-xl'>₱ {product.pprice}</p>
          <div className="rating rating-xs">
          <input
            type="radio"
            name="rating-5"
            className="mask mask-star-2 bg-orange-400"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <input
              type="radio"
              name="rating-5"
              className="mask mask-star-2 bg-orange-400"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <input
              type="radio"
              name="rating-5"
              className="mask mask-star-2 bg-orange-400"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <input
              type="radio"
              name="rating-5"
              className="mask mask-star-2 bg-orange-400"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <input
              type="radio"
              name="rating-5"
              className="mask mask-star-2 bg-orange-400"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
          </div>
          <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="bg-gray-200"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            className='bg-blue-500 hover:bg-blue-600 rounded-md p-1 text-white w-3/4 mt-4'
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
      </div>
  
      <div>
      <p className='text-gray-800 text-sm p-4 text-center rounded-md font-sans font-century-italic italic'>
        Here are some guides in using our skincare products that will help you achieve optimal results,
         ensuring a nourished and radiant complexion.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 m-10">

      <div className="space-y-4">
  <details className="group rounded-lg border border-gray-200">
    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 p-4 bg-gray-100 rounded-t-lg">
    <div>
        <img src={photo1} alt="" className='h-20 w-20 flex ' />
      </div>
      <p className="font-medium">Recommended Routines</p>
      <span className="relative h-5 w-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
    </summary>
    <div className="p-4 bg-white rounded-b-lg">
      <p className="text-gray-800 text-lg font-semibold mb-2">Normal Skin</p>
      <p>Day: 2% Salicylic Cleanser - Vitamin C 15% Serum - 5% Niacinamide - Double Oat Moisturizer - Sunscreen</p>
      <p>Night: 2% Salicylic Cleanser - 5% Niacinamide - Double Oat Moisturizer</p>
      <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">Dry Skin</p>
      <p>Day: 2% Salicylic Cleanser - 5% Niacinamide - Double Oat Moisturizer - Sunscreen</p>
      <p>Night: 2% Salicylic Cleanser - 5% Mandelic Toner - 5% Niacinamide - Double Oat Moisturizer</p>
      <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">Oily Skin</p>
      <p>Day: 2% Salicylic Cleanser - 5% Niacinamide - Double Oat Moisturizer - Sunscreen</p>
      <p>Night: 2% Salicylic Cleanser - 2% BHA Toner - 5% Niacinamide - Double Oat Moisturizer</p>
      <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">Night:</p>
      <p>MWF - 2% Salicylic Cleanser - 5% Mandelic Toner - 5% Niacinamide - Double Oat Moisturizer</p>
      <p>TTHS - 2% Salicylic Cleanser - 2% BHA Toner - 5% Niacinamide - Double Oat Moisturizer</p>
      <p>Sunday - 2% Salicylic Cleanser - 5% Niacinamide - Double Oat Moisturizer</p>
      <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">Combination Skin</p>
      <p>Day: 2% Salicylic Cleanser - Vitamin C 15% Serum - 5% Niacinamide - Double Oat Moisturizer - Sunscreen</p>
      <p>Night: 2% Salicylic Cleanser - 5% Mandelic Toner - 5% Niacinamide - Double Oat Moisturizer</p>
    </div>
  </details>
</div>

<div className="space-y-4">
  <details className="group rounded-lg border border-gray-200">
    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 p-4 bg-gray-100 rounded-t-lg">
    <div>
        <img src={photo5} alt="" className='h-20 w-20 flex ' />
      </div>
      <p className="font-medium">Precautions</p>
      <span className="relative h-5 w-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 opacity-100 group-open:opacity-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 opacity-0 group-open:opacity-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
    </summary>
    <div className="p-4 bg-white rounded-b-lg">
      <p className="text-gray-800 text-lg font-semibold mb-2">Patch Testing:</p>
      <p>
      When adding new products to your skincare routine, we always recommend patch testing. Apply a small amount of the product on dry cleansed skin behind the ear or on your inner arm. Wait at least 24 hours to see if any irritation occurs. If you notice any irritation such as redness, itchiness or burning, rinse off and discontinue use. Please note, it can take up to 72 hours for a reaction to present itself. Introduce new products slowly, and one at a time, so that you can easily identify any sources of irritation.
      </p>
      <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">Pregnancy or Breastfeeding:</p>
      <p>We do not recommend this product if pregnant or breastfeeding, consult your doctor before use.</p>
      <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">Children Under Age 12:</p>
      <p>This product is only recommended for people age 13 and above.</p>
      <p className="text-gray-800 text-sm font-semibold mt-4 mb-2 italic">FOR EXTERNAL USE ONLY</p>
    </div>
  </details>
</div>

<div className="space-y-4">
  <details className="group rounded-lg border border-gray-200">
    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 p-4 bg-gray-100 rounded-t-lg">
    <div>
        <img src={photo2} alt="" className='h-20 w-20 flex ' />
      </div>
      <p className="font-medium">Do's</p>
      <span className="relative h-5 w-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
    </summary>
    <div className="p-6 bg-gray-50 rounded-b-lg">
      <div className=" leading-relaxed">
        <p className="text-gray-800 text-lg font-semibold mb-2">1. Apply Moisturizer and Sunscreen</p>
        <p>Using Salicylic Acid Gentle Cleanser can be drying so it's important to always wear moisturizer
        and sunscreen after use.</p>
        
      </div>
      <div>
        <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">2. Start low and slow</p>
        Trying a new product can be exciting but we should always be careful and go slow. Start by using it 
        for 2-3 times a week to see how your skin would react.
      </div>
      <div>
        <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">3. Lessen the use when Purging</p>
        It is normal to experience purging when using Salicylic Acid, 
        but most people don't know what to do once it starts. By decreasing the use of the product,
        it helps your skin feel more comfortable and lessen the irritation your skin may feel when purging.
      </div>
      <div>
        <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">4. Know when to consult a Doctor</p>
        Each person may have different reactions when using a product, which is why it's
        important to determine what product is most suitable for yourself. If you experience continues breakouts, 
        it's better to stop and immediately consult a doctor.
      </div>
      <div>
        <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">5. Be Patient</p>
        Salicylic is not a magic cure for acne and oily skin. It takes time for it to work, 
        and you might not even see the results right away. It takes weeks to months to see an
        improvement in your skin. Be patient and consistent with the use of the product, and don't 
        expect overnight results.
      </div>
    </div>
  </details>
</div>




<div className="space-y-4">
  <details className="group rounded-lg border border-gray-200">
    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900 p-4 bg-gray-100 rounded-t-lg">
    <div>
        <img src={photo6} alt="" className='h-20 w-20 flex ' />
      </div>
     
      <p className="font-medium">Key Ingredients</p>
      <span className="relative h-5 w-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
    </summary>
    <div className="p-6 bg-gray-50 rounded-b-lg">
      <div className="leading-relaxed ">
        <p className="text-gray-800 text-lg font-semibold mb-2">Mandelic Acid</p> 
        <p>helps in brightening the skin, lightening melasma, and fading dark spots.</p>
      </div>
      <div>
        <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">Hyaluronic Acid</p>
        <p>can attract up to 1,000 times its weight in water, making it effective at hydrating the skin and keeping it moist and plump.</p> 
      </div>
      <div>
        <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">Licorice Extract</p> 
        <p> is a great anti-inflammatory and calming ingredient that quickly soothes stressed skin.</p>
      </div>
      <div>
        <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">Centella Asiatica</p>
        <p>is a well-known ingredient for its soothing effect and has anti-inflammatory properties that soothe compromised skin.</p> 
      </div>
    </div>
  </details>
</div>


  <div className="space-y-4">
    <details
      className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary
        className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900"
      >
        <div>
        <img src={photo4} alt="" className='h-20 w-20 flex ' />
      </div>
        <p className="font-medium">
          How to use?
        </p>

        <span className="relative h-5 w-5 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 opacity-100 group-open:opacity-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 opacity-0 group-open:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </summary>

      <div className="mt-4 leading-relaxed">
      Apply toner gently with a cotton pad to the face and neck in the evening 2-3 times a week.
      <p className=" italic mt-4 mb-2">(This can also be used on elbow/knee with discoloration areas.)</p>
      </div>

      <div>
     <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">When to use:</p> 
       <p className="text-gray-800 text-lg  mt-4 mb-2 italic">Night Only</p> 
       <p>For beginners: Start with 2-3 times a week and slowly increase use once your skin can tolerate it.</p> 
      </div>
      <div>
       <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">Proper Strorage:</p>
      <p>Place in it a cool, dry, and well-ventilated place away from sunlight.</p>
        <p className="text-gray-800 text-sm font-semibold mt-4 mb-2 italic"> **This can also be used on elbow/knee with discoloration areas.</p>  
      </div>
    </details>
  </div>

  <div className="space-y-4">
    <details
      className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
      open
    >
      <summary
        className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900"
      >
        <div>
        <img src={photo3} alt="" className='h-20 w-20 flex ' />
      </div>
        <p className="font-medium">
          Dont's
        </p>

        <span className="relative h-5 w-5 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </summary>

      <div className="mt-4 leading-relaxed ">
        <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">1. Do not Overdo it</p>
      It is easy to go overboard, especially if you are expecting immediate results. 
      Salicylic Acid contains exfoliating properties so overdoing it can be stripping 
      and might compromise your skin barrier.
      </div>
      <div>
        <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">2. Do not Refrigerate</p>
      Storing Salicylic Acid in the refrigerator can crystallize it. Once it crystallizes, 
      stop using it and quickly throw it away.
            </div>
            <div>
              <p className="text-gray-800 text-lg font-semibold mt-4 mb-2">3. Do not get it in your Eyes, Nose, and Mouth</p>
            To avoid irritation, rinse it off with water right away if it does get on these areas.
            </div>
      </details>
    </div>
  
  </div>
  <div>
    <Footer/>
  </div>
    </div>
  );
};

export default ProductDetail;
