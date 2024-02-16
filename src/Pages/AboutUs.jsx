import React, { useEffect, useState } from 'react';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';
import photo1 from '../assets/1.jpg';
import photo2 from '../assets/2.jpg';
import photo3 from '../assets/14.jpg';
import EmailSubscription from '../Modals/EmailSubscription';

function AboutUs() {
    const [ isOpen, setIsOpen ] = useState(false)

    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])

    useEffect(()=> {
        const showPopup = () => {
            let token = localStorage.getItem("auth-token")
            if (token === null){
                localStorage.setItem("auth-token", "")
                token = ""
            }

            if (token==="" || token===null || token===undefined) {
                setTimeout(()=>{
                    setIsOpen(true)
                }, 5000)
            }
        }
        showPopup()
    }, [])

    return (
        <div>

        <div >
            <Navbar/>
        </div>
            {isOpen && (
                <EmailSubscription isOpen={isOpen} setIsOpen={setIsOpen}/>
            )}
        <div className='bg-gray-200'>

            <section className="container mx-auto max-w-6xl overflow-hidden sm:pt-0 mt-16 sm:grid sm:grid-cols-2">
            <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                <div
                className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right"
                >
                <h2 className="text-3xl font-bold text-gray-900 md:text-3xl xl:text-5xl">
                The brand Klued came from the word clue.
                
                </h2>
                <p className='text-xl'>clue (ˈklü)</p>
                <p className="hidden text-left text-gray-900 md:mt-4 md:block text-2xl">
                    1. Something that guides through an intricate procedure or maze of difficulties.
                </p>
                <p className="hidden text-left text-gray-900 md:mt-4 md:block text-2xl italic ">
                    specifically: a piece of evidence that leads one toward the solution of a problem
                </p>
                <p className="hidden text-left text-gray-900 md:mt-4 md:block text-2xl">
                    2. Idea and Notion
                </p>
                <p className="hidden text-left text-gray-900 md:mt-4 md:block text-2xl">
                    3. To give reliable information
                </p>
                </div>
            </div>

            <img
                alt="Student"
                src={photo3}
                className="h-56 w-full object-cover sm:h-full"
            />
            </section>

        </div>

                <div className='container mx-auto max-w-6xl'>
                <section className="bg-#6697b3 text-gray-800">
                    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
                
                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <a className="block rounded-xl  p-8 shadow-md transition">
                        <p className="mt-1 text-md text-gray-600 ">
                    <span className="mt-4 text-xl font-bold text-gray-700">We changed </span>the letter  "C" to letter "K" to have it look cool and appealing to the eye of our target market and doesn't look boring. Also added letter "D" at the end of the word as we are confident that once you purchase our product is that you will learn something from it.
                        </p>
                    </a>

                    <a className="block rounded-xl  p-8 shadow-md transition ">
                        <p className="mt-1 text-md text-gray-700">
                    <span className="mt-4 text-xl font-bold text-gray-700">Klued was born</span>  out of knowledge and passion to strive for better skin health.
                        </p>
                    </a>

                    <a className="block rounded-xl  p-8 shadow-md transition ">
                        <p className="mt-1 text-md text-gray-700">
                    <span className="mt-4 text-xl font-bold text-gray-700"> We're a team </span>of passionate people , founded by @yourporeguy, a skincare enthusiast and a skincare blogger on Instagram and TikTok who made this brand possible.
                        </p>
                    </a>

                    <a className="block rounded-xl  p-8 shadow-md transition ">
                        <p className="mt-1 text-md text-gray-700">
                        <span className="mt-4 text-xl font-bold text-gray-700">Knowledge and passion </span> are at the heart of everything we do.
                        </p>
                    </a>

                    <a className="block rounded-xl  p-8 shadow-md transition " >
                        <p className="mt-1 text-md text-gray-700">
                        <span className="mt-4 text-xl font-bold text-gray-700">We are offering quality </span> skincare products available for everyone at a price that can fit most budgets, because it's the way skincare should be. And to be able to spread knowledge about skincare.
                        </p>
                    </a>

                    <a className="block rounded-xl p-8 shadow-md ">
                        <p className="mt-1 text-md text-gray-700">
                        <span className="mt-4 text-xl font-bold text-gray-700"> We pride ourselves </span> on being selective to the ingredients we add to our products, and we want to be sure that the products you, as a customer order from us are carefully tested and result oriented.
                        </p>
                    </a>
                    
                    </div>
                </div>
            </section>
        </div>
        
        <div className='bg-blue-200'>
        <section className="container mx-auto max-w-6xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="lg:order-last lg:py-24">
                <h2 className="text-5xl font-bold sm:text-5xl text-gray-800">Vision</h2>
                <p className="mt-4 text-gray-600 text-2xl">
                Our goal is to change the way people think about taking good care of their skin by delivering premium quality skincare that everyone can afford.
                </p>
            
            </div>

            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full">
                <img
                alt="Party"
                src={photo1}
                className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
            </div>
        </section>
        </div>

        <div>

                <section>
            <div
            className="container mx-auto max-w-6xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
            >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                <div
                className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full"
                >
                <img
                    alt="Party"
                    src={photo2}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                </div>

                <div className="lg:py-24">
                <h2 className="text-5xl font-bold sm:text-5xl text-gray-800">Mission</h2>

                <div className="mt-4 text-gray-600 text-2xl">
                We were founded on the belief that 
                <p className='text-2xl'>
                skincare should not break the bank.
                </p>
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>

        <div>
            <Footer/>
        </div>
        </div>
    )
}

export default AboutUs