import React, { useState, useEffect } from 'react';
import { AiOutlinePlus, AiOutlineLine } from "react-icons/ai";
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';

function Faq() {
  const [question1, setQuestion1] = useState(false)
  const [question2, setQuestion2] = useState(false)
  const [question3, setQuestion3] = useState(false)
  const [question4, setQuestion4] = useState(false)
  const [question5, setQuestion5] = useState(false)
  const [question6, setQuestion6] = useState(false)
  const [question7, setQuestion7] = useState(false)
  const [question8, setQuestion8] = useState(false)
  const [question9, setQuestion9] = useState(false)
  const [question10, setQuestion10] = useState(false)
  const [question11, setQuestion11] = useState(false)
  const [question12, setQuestion12] = useState(false)

  useEffect(()=> {
    const windowOpen = () => {   
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    windowOpen()
  }, [])

  return (
    <div className='sm:pt-0 pt-16'>   
        <div>
            <Navbar/>
        </div>
              <div className="min-h-screen h-auto container mx-auto py-2 lg:flex grid">
                <div className="h-full w-full py-8 md:px-8 px-4">
                    <div>
                        <h3 className='font-bold lg:text-4xl text-3xl lg:py-6 py-4 text-center'>Frequently Asked Questions</h3>
                        <br/>
                        <p className='text-center'>Consequat anim consectetur dolore culpa fugiat tempor ad adipisicing. Pariatur velit anim irure quis do duis ex qui tempor consectetur labore cillum consectetur. Sit reprehenderit quis pariatur sint sint ea nisi quis commodo est culpa aliquip dolore culpa.</p>
                        <br/>

                        <div className="border-t-2 grid">
                            <div className="flex justify-between items-center">
                                <label onClick={()=> {
                                    if (question1===false) {
                                        setQuestion1(true)
                                    } else {
                                        setQuestion1(false)
                                    }
                                }} className="font-bold py-5 cursor-pointer">What is Oxidation?</label>
                                <label onClick={()=> {
                                    if (question1===false) {
                                        setQuestion1(true)
                                    } else {
                                        setQuestion1(false)
                                    }
                                }} className='cursor-pointer'>{question1!==true ? <AiOutlinePlus className='h-[25px] w-[25px]'/> : <AiOutlineLine className='h-[25px] w-[25px]'/>}</label>
                            </div>
                            {question1===true ? 
                            <p className="pb-5 transition ease-in duration-500">After contact with light, heat and air, vitamin C eventually oxidizes and loses its potency.</p>
                            :null}
                        </div>

                        <div className="border-t-2 grid">
                            <div className="flex justify-between items-center">
                                <label onClick={()=> {
                                    if (question2===false) {
                                        setQuestion2(true)
                                    } else {
                                        setQuestion2(false)
                                    }
                                }} className="font-bold py-5 cursor-pointer">How do you stop vitamin C serum from oxidizing?</label>
                                <label onClick={()=> {
                                    if (question2===false) {
                                        setQuestion2(true)
                                    } else {
                                        setQuestion2(false)
                                    }
                                }} className='cursor-pointer'>{question2!==true ? <AiOutlinePlus className='h-[25px] w-[25px]'/> : <AiOutlineLine className='h-[25px] w-[25px]'/>}</label>
                            </div>
                            {question2===true ? 
                            <p className="pb-5">Store it in a cool, dark, dry place to prevent your serum from oxidizing. Avoid sunlight exposure.</p>
                            :null}
                        </div>

                        <div className="border-t-2 grid">
                        <div className="flex justify-between items-center">
                                <label onClick={()=> {
                                    if (question3===false) {
                                        setQuestion3(true)
                                    } else {
                                        setQuestion3(false)
                                    }
                                }} className="font-bold py-5 cursor-pointer">Should I stop using retinol if my skin gets irritated?</label>
                                <label onClick={()=> {
                                    if (question3===false) {
                                        setQuestion3(true)
                                    } else {
                                        setQuestion3(false)
                                    }
                                }} className='cursor-pointer'>{question3!==true ? <AiOutlinePlus className='h-[25px] w-[25px]'/> : <AiOutlineLine className='h-[25px] w-[25px]'/>}</label>
                            </div>
                            {question3===true ? 
                            <p className="pb-5">Drier-than-usual, and even lightly peeling skin is all part of the process. It takes about three weeks of using retinol for your skin cells to adapt and begin to tolerate it. If the irritation is prolonged or very uncomfortable, use it once a week or switch to a weaker percentage, but it is still best to consult your Dermatologist if no improvement after three weeks.</p>
                            :null}
                        </div>

                        <div className="border-t-2 grid">
                            <div className="flex justify-between items-center">
                                <label onClick={()=> {
                                    if (question4===false) {
                                        setQuestion4(true)
                                    } else {
                                        setQuestion4(false)
                                    }
                                }} className="font-bold py-5 cursor-pointer">What's the best age to start using Retinol?</label>
                                <label onClick={()=> {
                                    if (question4===false) {
                                        setQuestion4(true)
                                    } else {
                                        setQuestion4(false)
                                    }
                                }} className='cursor-pointer'>{question4!==true ? <AiOutlinePlus className='h-[25px] w-[25px]'/> : <AiOutlineLine className='h-[25px] w-[25px]'/>}</label>
                            </div>
                            {question4===true ? 
                            <p className="pb-5">20s - We recommend most people start using retinol in their mid to late-20s, anywhere from 25-30. This is when collagen and elastin production start to slow down, so it's the perfect time to start reaping the preventative-aging benefits retinol has to offer. But always consult your dermatologist for recommendation.</p>
                            :null}
                        </div>

                        <div className="border-t-2 grid">
                          <div className="flex justify-between items-center">
                            <label onClick={()=> {
                                if (question5===false) {
                                    setQuestion5(true)
                                } else {
                                    setQuestion5(false)
                                }
                            }} className="font-bold py-5 cursor-pointer">Can I use Retinol with Vitamin C?</label>
                            <label onClick={()=> {
                                if (question5===false) {
                                    setQuestion5(true)
                                } else {
                                    setQuestion5(false)
                                }
                            }} className='cursor-pointer'>{question5!==true ? <AiOutlinePlus className='h-[25px] w-[25px]'/> : <AiOutlineLine className='h-[25px] w-[25px]'/>}</label>
                          </div>
                          {question5===true ? 
                            <p className="pb-5">There's no problem with using both retinol and vitamin C as part of your skincare routine. It is a "power couple" when it comes to aging. If you must use retinol and L-ascorbic acid at the same time, separate them for 30 minutes. Apply your vitamin C first since it has the lower pH of the two. You can also use Vitamin C in your AM and Retinol in your PM routine.</p>
                          :null}
                        </div>

                        <div className="border-t-2 grid">
                          <div className="flex justify-between items-center">
                            <label onClick={()=> {
                                if (question6===false) {
                                    setQuestion6(true)
                                } else {
                                    setQuestion6(false)
                                }
                            }} className="font-bold py-5 cursor-pointer">Can I use Retinol with Salicyclic Acid?</label>
                            <label onClick={()=> {
                                if (question6===false) {
                                    setQuestion6(true)
                                } else {
                                    setQuestion6(false)
                                }
                            }} className='cursor-pointer'>{question5!==true ? <AiOutlinePlus className='h-[25px] w-[25px]'/> : <AiOutlineLine className='h-[25px] w-[25px]'/>}</label>
                          </div>
                          {question6===true ? 
                            <p className="pb-5">Don't Use Retinol with Salicylic Acid (leave on). Salicylic acid is a type of BHA. It's a chemical exfoliant that's extremely effective in treating oily and acne-prone skin because of its ability to penetrate deep into pores and remove dead skin cells and other debris.

                            Layering these products is not recommended. Because both retinol and salicylic acid are powerful active ingredients that, when used together, are likely to irritate skin.
                            
                            But here are several ways you can use these products in conjunction:
                            
                            Alternate them by using a retinol product at night and a salicylic acid product in the morning. 
                            
                            Use a retinol product one day and a salicylic acid product the next. 
                            
                            Apply retinol after using a salicylic acid cleanser that is thoroughly rinsed off your skin. 
                            
                            Whichever way you choose, monitor your skin for signs of irritation.</p>
                          :null}
                        </div>

                        <div className="border-t-2 grid">
                          <div className="flex justify-between items-center">
                            <label onClick={()=> {
                                if (question7===false) {
                                    setQuestion7(true)
                                } else {
                                    setQuestion7(false)
                                }
                            }} className="font-bold py-5 cursor-pointer">Can I use Retinol with Glycolic Acid?</label>
                            <label onClick={()=> {
                                if (question7===false) {
                                    setQuestion7(true)
                                } else {
                                    setQuestion7(false)
                                }
                            }} className='cursor-pointer'>{question5!==true ? <AiOutlinePlus className='h-[25px] w-[25px]'/> : <AiOutlineLine className='h-[25px] w-[25px]'/>}</label>
                          </div>
                          {question7===true ? 
                            <p className="pb-5">Glycolic acid is an AHA. It offers a variety of benefits including a smoother and brighter complexion and the reduction of fine lines and pigmentation. Layering these products together is NOT recommended. When used at the same time they are likely to irritate skin.

                            Recommended Usage of Retinol and Glycolic Acid
                            
                            Alternate them by using a retinol product at night and a glycolic acid product in the morning. Or use a retinol product one day and a glycolic acid product the next.</p>
                          :null}
                        </div>

                        <div className="border-t-2 grid">
                          <div className="flex justify-between items-center">
                            <label onClick={()=> {
                                if (question8===false) {
                                    setQuestion8(true)
                                } else {
                                    setQuestion8(false)
                                }
                            }} className="font-bold py-5 cursor-pointer">Can I use Retinol with Azelaic Acid?</label>
                            <label onClick={()=> {
                                if (question8===false) {
                                    setQuestion8(true)
                                } else {
                                    setQuestion8(false)
                                }
                            }} className='cursor-pointer'>{question5!==true ? <AiOutlinePlus className='h-[25px] w-[25px]'/> : <AiOutlineLine className='h-[25px] w-[25px]'/>}</label>
                          </div>
                          {question8===true ? 
                            <p className="pb-5">Yes. Retinol and azelaic acid are safe and effective when used together and can be layered.

                            Neither an AHA nor a BHA, azelaic acid is a chemical compound with antibacterial and anti-inflammatory properties. It's found naturally in certain plants and is useful in treating acne and other skin conditions, including rosacea.</p>
                          :null}
                        </div>

                        <div className="border-t-2 grid">
                          <div className="flex justify-between items-center">
                            <label onClick={()=> {
                                if (question9===false) {
                                    setQuestion9(true)
                                } else {
                                    setQuestion9(false)
                                }
                            }} className="font-bold py-5 cursor-pointer">How to Layer Retinol and Azelaic Acid?</label>
                            <label onClick={()=> {
                                if (question9===false) {
                                    setQuestion9(true)
                                } else {
                                    setQuestion9(false)
                                }
                            }} className='cursor-pointer'>{question5!==true ? <AiOutlinePlus className='h-[25px] w-[25px]'/> : <AiOutlineLine className='h-[25px] w-[25px]'/>}</label>
                          </div>
                          {question9===true ? 
                            <p className="pb-5">After cleansing, first apply the retinol product. 

                            Let the retinol settle into your skin for about 20 minutes. 
                            
                            Apply azelaic acid.</p>
                          :null}
                        </div>

                        <div className="border-t-2 grid">
                          <div className="flex justify-between items-center">
                            <label onClick={()=> {
                                if (question10===false) {
                                    setQuestion10(true)
                                } else {
                                    setQuestion10(false)
                                }
                            }} className="font-bold py-5 cursor-pointer">Can I use Retinol with Lactic Acid?</label>
                            <label onClick={()=> {
                                if (question10===false) {
                                    setQuestion10(true)
                                } else {
                                    setQuestion10(false)
                                }
                            }} className='cursor-pointer'>{question5!==true ? <AiOutlinePlus className='h-[25px] w-[25px]'/> : <AiOutlineLine className='h-[25px] w-[25px]'/>}</label>
                          </div>
                          {question10===true ? 
                            <p className="pb-5">Lactic acid is an AHA that helps to exfoliate your skin. It's considered the gentlest of all the alpha-hydroxy acids. A naturally occurring substance in the body, it can improve skin's texture, reduce fine lines and wrinkles, and minimize dark spots.

                            Layering these products is NOT recommended. When used at the same time they are likely to irritate skin.
                            
                            Recommended Usage of Retinol and Lactic Acid
                            
                            Alternate them by using a retinol product at night and a lactic acid product in the morning. Or use a retinol product one day and a glycolic acid product the next.</p>
                          :null}
                        </div>

                        <div className="border-t-2 grid">
                          <div className="flex justify-between items-center">
                            <label onClick={()=> {
                                if (question11===false) {
                                    setQuestion11(true)
                                } else {
                                    setQuestion11(false)
                                }
                            }} className="font-bold py-5 cursor-pointer">Can I use Retinol with Adapalene?</label>
                            <label onClick={()=> {
                                if (question11===false) {
                                    setQuestion11(true)
                                } else {
                                    setQuestion11(false)
                                }
                            }} className='cursor-pointer'>{question5!==true ? <AiOutlinePlus className='h-[25px] w-[25px]'/> : <AiOutlineLine className='h-[25px] w-[25px]'/>}</label>
                          </div>
                          {question11===true ? 
                            <p className="pb-5">GNot really, mainly because retinol and adapalene are very similar ingredients. Both are a form of retinoid that just vary with the strength of potency. With both retinol and adapalene increasing the skin cell turnover your skin will become dry, uncomfortable, tight, red, with areas of flaky patches. It will also become stripped of the vital oil and water levels needed to keep the barrier at its healthiest state leading to it kick starting an over production of sebum (the natural oil found in the skin). This will result in a flare-up in breakouts and an imbalance in the skin making it oilier.</p>
                          :null}
                        </div>

                        <div className="border-t-2 grid">
                          <div className="flex justify-between items-center">
                            <label onClick={()=> {
                                if (question12===false) {
                                    setQuestion12(true)
                                } else {
                                    setQuestion12(false)
                                }
                            }} className="font-bold py-5 cursor-pointer">Can I use Retinol with Benzoyl Peroxide?</label>
                            <label onClick={()=> {
                                if (question12===false) {
                                    setQuestion12(true)
                                } else {
                                    setQuestion12(false)
                                }
                            }} className='cursor-pointer'>{question5!==true ? <AiOutlinePlus className='h-[25px] w-[25px]'/> : <AiOutlineLine className='h-[25px] w-[25px]'/>}</label>
                          </div>
                          {question12===true ? 
                            <p className="pb-5">As for benzoyl peroxide and retinol, they cancel each other out. It is not recommended to use benzoyl peroxide and retinoids together as they can literally cancel each other out rendering them less effective. They’re both drying and exfoliating ingredients, so mixing them together can cause excessive peeling, hyperpigmentation, and redness.</p>
                          :null}
                        </div>
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

/*

        <div className='mx-10 '>
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
        </div>*/