import React, {useState} from "react"
import { Link } from 'react-router-dom';
import image1 from "../assets/18.jpg"
import image2 from "../assets/8.jpg"
import image3 from "../assets/10.jpg"

export default function Category() {
    const [whiteItems, setWhiteItems] = useState(false)
    const [pimpleItems, setPimpleItems] = useState(false)
    const [youngItems, setYoungItems] = useState(false)

    return (
        <>
            <div className="h-[50vh] w-full overflow-hidden sm:flex sm:flex-rows-3 sm:flex-row-reverse grid grid-rows-3 rounded-xl bg-cover bg-no-repeat bg-center bg-[url('https://images.pexels.com/photos/3762877/pexels-photo-3762877.jpeg?auto=compress&cs=tinysrgb&w=7360&h=4912&dpr=1')]">
                <div className="h-full max-w-screen w-full sm:w-2/3 row-span-2">
                    <div className="w-full sm:w-2/3 row-span-2 relative">
                        <div className="sm:h-[50vh] h-[35vh] sm:w-[1000px] w-full absolute items-center inset-0">
                            {whiteItems===true ? 
                            <div className="sm:p-8 px-4 py-8 h-full w-full flex gap-2 overflow-x-auto">
                                <Link to='/details/multi-brightening-complex-serum' className="hover:bg-gray-700 flex-shrink-0 h-full sm:w-[200px] w-[150px] bg-gray-800 rounded-md overflow-hidden p-2 cursor-pointer">
                                    <img  src={image1}></img>
                                    <label className="text-sm text-white sm:line-clamp-none line-clamp-1">Klued - Multi-Hyaluronic Acid Complex Serum</label>
                                </Link>
                                <div className="hover:bg-gray-700 flex-shrink-0 h-full sm:w-[200px] w-[150px] bg-gray-800 rounded-md overflow-hidden p-2 cursor-pointer">
                                    <img src={image2}></img>
                                    <label className="text-sm text-white sm:line-clamp-none line-clamp-1">Klued - 2% BHA Exfoliating Toner</label>
                                </div>
                                <div className="hover:bg-gray-700 flex-shrink-0 h-full sm:w-[200px] w-[150px] bg-gray-800 rounded-md overflow-hidden p-2 cursor-pointer">
                                    <img src={image3}></img>
                                    <label className="text-sm text-white sm:line-clamp-none line-clamp-1">Klued - 5% Niacinamide Serum</label>
                                </div>
                            </div>
                            :null}
                        </div>
                    </div>
                </div>
                <div className="sm:w-1/3 max-w-screen row-span-1 text-white sm:px-4 px-8 py-2 grid justify-center bg-black h-full w-full backdrop-blur-sm bg-opacity-80">
                    <div className="sm:my-4">
                        <h1 className="font-bold sm:text-2xl text-base">Whitening Products</h1>
                        <p className="sm:smallText tinyText">Your way to the ultimate clear complexion.</p>
                    </div>
                    <button onClick={()=>{
                        if (whiteItems===false) {
                            setWhiteItems(true)
                        }
                        if (whiteItems===true) {
                            setWhiteItems(false)
                        }
                    }} className="sm:h-10 w-full hover:bg-gray-700 border border-gray-200 p-2 hover:backdrop-blur hover:bg-opacity-10 rounded-md font-semibold">View the collection</button>
                </div>
            </div> 

            <div className="h-[50vh] w-full overflow-hidden sm:flex sm:flex-rows-3 sm:flex-row-reverse grid grid-rows-3 rounded-xl bg-cover bg-no-repeat bg-center bg-[url('https://images.pexels.com/photos/6476081/pexels-photo-6476081.jpeg?auto=compress&cs=tinysrgb&w=4162&h=2775&dpr=1')]">
                <div className="w-full sm:w-2/3 row-span-2">

                </div>
                <div className="sm:w-1/3 row-span-1 text-white sm:px-4 px-8 py-2 grid justify-center bg-black h-full w-full backdrop-blur-sm bg-opacity-80">
                    <div className="sm:my-4">
                        <h1 className="font-bold sm:text-2xl text-base">Anti Pimple Products</h1>
                        <p className="sm:smallText tinyText">Say goodbye to your insecurities.</p>
                    </div>
                    <button className="sm:h-10 w-full hover:bg-gray-700 border border-gray-200 p-2 hover:backdrop-blur hover:bg-opacity-10 rounded-md font-semibold">View the collection</button>
                </div>
            </div>    

            <div className="h-[50vh] w-full overflow-hidden sm:flex sm:flex-rows-3 sm:flex-row-reverse grid grid-rows-3 rounded-xl bg-cover bg-no-repeat bg-center bg-[url('https://images.pexels.com/photos/3436830/pexels-photo-3436830.jpeg?auto=compress&cs=tinysrgb&w=6000&h=4000&dpr=1')]">
                <div className="w-full sm:w-2/3 row-span-2">

                </div>
                <div className="sm:w-1/3 row-span-1 text-white sm:px-4 px-8 py-2 grid justify-center bg-black h-full w-full backdrop-blur-sm bg-opacity-80">
                    <div className="sm:my-4">
                        <h1 className="font-bold sm:text-2xl text-base">Anti-aging Products</h1>
                        <p className="sm:smallText tinyText">Maintain your skin's young glow and elasticity.</p>
                    </div>
                    <button className="sm:h-10 w-full hover:bg-gray-700 border border-gray-200 p-2 hover:backdrop-blur hover:bg-opacity-10 rounded-md font-semibold">View the collection</button>
                </div>
            </div>    
  
        </>
    )
}