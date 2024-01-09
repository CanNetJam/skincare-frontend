import React from 'react'

export default function SubscriptionRedirect({handleClick}) {
    return (
        <div className='h-10 fixed z-40 top-16 w-full bg-black text-white flex justify-center items-center'>
            <div className='container sm:text-base text-xs max-w-lg mx-auto flex items-center gap-4 p-2'>
                <p>Subscribe to our newsletter for special discounts!</p>
                <div>
                    <button onClick={handleClick} className="relative text-center py-1 w-full sm:px-3 px-1 font-bold rounded-lg before:bg-yellow-200 before:-z-10 bg-blue-400 z-0 text-slate-50 transition-colors before:absolute before:left-0 before:top-0 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:duration-300 hover:text-black before:hover:scale-x-100 overflow-hidden">
                        Lets go!
                    </button>
                </div>
            </div>
        </div>
    )
}
