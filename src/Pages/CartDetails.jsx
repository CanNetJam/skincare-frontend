import React, { useState, useEffect } from 'react';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';

function CartDetails() {
  const [cartData, setCartData] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        let localData = JSON.parse(localStorage.getItem("items"))
        /*
        const response = await fetch('http://localhost:8081/cart');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();*/
        setCartData(localData);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchCartData();
  }, []);

  //console.log(cartData)
  useEffect(() => {
    const computeTotal = async () => {
      try {
        let summary = []
        cartData.map((a)=> {
          let haha = Number(a.product.pprice) * Number(a.quantity)
          summary.push(Number(haha))
        })

        let total = 0
        if (summary.length>1) {
          for (let i=0; i<summary.length; i++){
            total = summary[i] + total
          }
        }
        if (summary.length=1) {
          total = summary[0]
        }
        setCartTotal(total)
      } catch (error) {
        console.error('Error computing data:', error);
      }
    };
    computeTotal();
  }, [cartData]);

  function handleRemoveItem(props) {
      let currentCart = JSON.parse(localStorage.getItem("items"))
      currentCart.map((a)=> {
        if (a.product.productid === props.productid){
          currentCart.pop(props)
        }
      })
      localStorage.setItem("items", JSON.stringify(currentCart));
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <header className="text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
              </header>

              <div className="mt-8">
                <ul className="space-y-4">
                {cartData.map((item, index) => (
                    <li key={index} className="flex items-center gap-4">
                        <img src={item.image} alt={item.product.pname} className="h-16 w-16 rounded object-cover" />
                        <div>
                        <h3 className="text-sm text-gray-900">{item.product.pname}</h3>
                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                            <dt className="inline">Price:</dt>
                            <dd className="inline">{item.product.pprice}</dd>
                            </div>
                        </dl>
                        </div>
                        <div className="flex flex-1 items-center justify-end gap-2">
                        <form className=''>
                            <label htmlFor={`qty${index}`} className="sr-only"> Quantity </label>
                            <input
                            type="number"
                            min="1"
                            defaultValue={item?.quantity}
                            id={`qty${index}`}
                            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />
                        </form>
                        <button onClick={()=>handleRemoveItem(item?.product)} className="text-gray-600 transition hover:text-red-600">
                            <span className="sr-only">Remove item</span>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                            </svg>
                        </button>
                        </div>
                    </li>
                    ))}
                </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="mt-8 flex justify-end  border-gray-100 pt-8">
                    <div className="w-screen max-w-lg space-y-4">
                        <dl className="space-y-0.5 text-sm text-gray-700">

                        <div className="flex justify-between !text-base font-medium">
                            <dt>Total</dt>
                            <dd>{cartTotal}</dd>
                        </div>
                        </dl>

                        <div className="flex justify-end">
                        <a href="#" className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600">
                            Checkout
                        </a>
                        </div>
                    </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default CartDetails;
