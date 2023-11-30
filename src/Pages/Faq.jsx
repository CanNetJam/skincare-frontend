import React from 'react'
import Navbar from '../Components/NavBar'
import Footer from '../Components/Footer'

function Faq() {
  return (
    <div className='sm:pt-0 pt-16'>   

        <div>
            <Navbar/>
        </div>

        <div className='text-cyan-600 text-5xl text-center mb-4 flex-auto'>
          Klued FAQs
        </div>

        <div className='mx-10'>
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
          <div className="collapse-title text-xl font-medium">
          Q: Is this FDA Approved?
          </div>
          <div className="collapse-content"> 
            <p>A: YES! We have a License To Operate and this product has been Approved/Notified by the FDA.</p>
          </div>
        </div>
        </div>

        <div className=' mx-10 mt-2'>
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
          <div className="collapse-title text-xl font-medium">
          Q: Is it safe for daily use?
          </div>
          <div className="collapse-content"> 
            <p>A: Yes! As a gentle cleanser with pH 5.5 it is safe to use daily or as frequently as you prefer, day and night.</p>
          </div>
        </div>
        </div>

        <div className=' mx-10 mt-2'>
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
          <div className="collapse-title text-xl font-medium">
          Q: Do i need to use another cleanser other than this to follow up?
          </div>
          <div className="collapse-content"> 
            <p>A: This cleanser alone is enough and does not need a follow up cleanser. But you may use another cleanser as you prefer for makeup removal or for a double cleanse.</p>
          </div>
        </div>
        </div>

        <div className=' mx-10 mt-2'>
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
          <div className="collapse-title text-xl font-medium">
          Q: When can i double cleanse?
          </div>
          <div className="collapse-content"> 
            <p>A: We recommend double cleansing in your night time routine or before going to bed after a long day of work or being outside to remove sunscreen and makeup and to wash away any leftover impurities.</p>
          </div>
        </div>
        </div>


        <div className=' mx-10 mt-2'>
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
          <div className="collapse-title text-xl font-medium">
          Q: How long can i use this?
          </div>
          <div className="collapse-content"> 
            <p>A: This can be used as your maintenance cleanser or on a long term basis.</p>
          </div>
        </div>
        </div>


        <div className=' mx-10 mt-2'>
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
          <div className="collapse-title text-xl font-medium">
          Q: Can i use this on my body?
          </div>
          <div className="collapse-content"> 
            <p>A: Yes! Especially areas with breakouts such as chest and back.</p>
          </div>
        </div>
        </div>


        <div className=' mx-10 mt-2'>
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
          <div className="collapse-title text-xl font-medium">
          Q: What percentage of Salicylic acid is in this bottle?
          </div>
          <div className="collapse-content"> 
            <p>A: 2% Salicylic Acid Cleanser. The maximum allowed by the FDA.</p>
          </div>
        </div>
        </div>


        <div className=' mx-10 mt-2'>
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
          <div className="collapse-title text-xl font-medium">
          Q: What is the pH level of this product?
          </div>
          <div className="collapse-content"> 
            <p>A: The pH Level of this product is 5.5</p>
          </div>
        </div>
        </div>


        <div className=' mx-10 mt-2'>
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
          <div className="collapse-title text-xl font-medium">
          Q: When will i see result?
          </div>
          <div className="collapse-content"> 
            <p>A: Products can take up to six weeks to show full results, due to the time it takes for your skin cells to turnover and the results of any products to reach the surface. Consistency is key, so apply regularly even if you’re not seeing the effects straight away. It can be very tempting to increase use of some products to try and see quicker results, don't overdo it though. More is not necessarily more, and overuse can cause irritation and sensitivity.</p>
          </div>
        </div>
        </div>


        <div className=' mx-10 mt-2 mb-10'>
        <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-200">
          <div className="collapse-title text-xl font-medium">
          Q: Is this product safe for pregnant?
          </div>
          <div className="collapse-content"> 
            <p>A: We do not recommend this product if pregnant or breastfeeding</p>
          </div>
        </div>
        </div>

        <div>
          <Footer/>
        </div>


       


    </div>
  )
}

export default Faq