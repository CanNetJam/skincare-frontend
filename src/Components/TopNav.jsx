import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../App";
import photo1 from '../assets/Compressed-Webp/logo-min.webp';
import Cart from './Cart';
import DropdownUser from './DropdownUser';
import axios from "axios";

function Navbar(props) {
    const navigate = useNavigate()
    const { userData, setUserData } = useContext(UserContext || null)
    const [ openMenu, setopenMenu ] = useState(false)
    const [ open, setOpen ] = useState(false)
    const [shop, setShop] = useState(false)
    const [transactions, setTransactions] = useState(false)
    const [users, setUsers] = useState(false)
    const [ search, setSearch ] = useState("")
    const [ availableItems, setAvailableItems ] = useState([])
    const [ openSearch, setOpenSearch ] = useState(false)

    useEffect(()=> {
        const getProducts = async () => {
            try {
                const products = await axios.get(`${import.meta.env.DEV ? import.meta.env.VITE_DEVCONNECTIONSTRING : import.meta.env.VITE_CONNECTIONSTRING}/product/get-all-products`)
                setAvailableItems(products.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [])
    
    const filteredProducts = 
    search === '' ? 
    availableItems
    : availableItems.filter((product) =>
        product.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(search?.toLowerCase().replace(/\s+/g, ''))
    )

    useEffect(() => {
        const resetTabs = () => {
            setShop(false)
            setTransactions(false)
            setUsers(false)
        }
        resetTabs()
    }, [openMenu])

    const logOut = async () => {
        setUserData({
            token: undefined,
            user: undefined,
            cartNumber: 0
        })
        localStorage.setItem("auth-token", "")
        localStorage.setItem("user-type", "")
        localStorage.setItem("user-verified", false)
        localStorage.setItem("items", JSON.stringify([]))
        setopenMenu(false)
    }

    return (
        <header>
            <div className="h-min bg-white w-full z-50 fixed inset-0 shadow-md block">
                <div className="h-16 mx-auto sm:px-6 flex justify-between items-center gap-4">

                    <div className="flex w-full items-center gap-6">
                        <a className="block flex-shrink-0" href="/">
                            <img title='Klued logo' alt='Klued logo' loading='eager' height={'45px'} width={'125px'} className='h-[45px] w-[125px] object-contain' src={photo1}/>
                        </a>

                        <div className="relative h-full w-full hidden sm:block">
                            <div className='relative w-full z-50'>
                                <label htmlFor="product-search" className="sr-only">Search</label>
                                <div className="hidden absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 sm:flex items-center ps-3 pointer-events-none z-10">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text" id="product-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search product..."/>
                                {search!=="" ?
                                    <div className="grid gap-2 absolute bg-white h-auto border max-h-[150px] w-full overflow-y-scroll rounded-b-xl no-scrollbar shadow-md">
                                        {filteredProducts.map((a, index)=> {
                                            return <Link onClick={()=>setSearch("")} to={`/products/${encodeURIComponent(a.name.replace(/\s+/g, '-').toLowerCase())}/${a._id}`} state={{productid: a._id, productname: a.name}} target='_blank' className="h-auto w-auto flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-100" key={index}>
                                                <div className='flex h-[40px] w-[40px] items-center justify-center border overflow-hidden rounded-md'>
                                                    <img className='h-full w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a?.displayimage}.jpg`}></img>
                                                </div>
                                                {a.name}
                                            </Link>
                                        })}
                                    </div>
                                :null}
                            </div>
                        </div> 
                    </div>

                    <div className="hidden lg:top-0.5 lg:flex w-full lg:justify-end lg:items-center">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-4 text-sm">
                                <li>
                                    <Link
                                    className="flex whitespace-nowrap justify-center items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                    to="/products"
                                    >
                                    Our Products
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                    className="flex whitespace-nowrap justify-center items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                    to="/understanding-your-skin"
                                    >
                                    Understanding your skin
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                    className="flex whitespace-nowrap justify-center items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                    to="/about-us"
                                    >
                                    About Us
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                    className="flex justify-center items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                    to="/faqs"
                                    >
                                    FAQs
                                    </Link>
                                </li>

                                {userData?.user===undefined ?
                                    <li>
                                        <button onClick={()=>{
                                            if(open===false) {
                                            setOpen(true)
                                            } else {
                                            setOpen(false)
                                            }
                                        }} className="relative flex justify-center items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M20 7h-4v-3c0-2.209-1.791-4-4-4s-4 1.791-4 4v3h-4l-2 17h20l-2-17zm-11-3c0-1.654 1.346-3 3-3s3 1.346 3 3v3h-6v-3zm-4.751 18l1.529-13h2.222v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h2.222l1.529 13h-15.502z"/></svg>
                                            <label className='cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 text-sm font-semibold pt-2'>
                                                {userData?.cartNumber }
                                            </label>  
                                        </button>
                                    </li>
                                : 
                                    userData?.user?.type==="Customer" ?
                                        <li>
                                            <button onClick={()=>{
                                                if(open===false) {
                                                setOpen(true)
                                                } else {
                                                setOpen(false)
                                                }
                                            }} className="relative flex justify-center items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M20 7h-4v-3c0-2.209-1.791-4-4-4s-4 1.791-4 4v3h-4l-2 17h20l-2-17zm-11-3c0-1.654 1.346-3 3-3s3 1.346 3 3v3h-6v-3zm-4.751 18l1.529-13h2.222v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h2.222l1.529 13h-15.502z"/></svg>
                                                <label className='cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 text-sm font-semibold pt-2'>
                                                    {userData?.cartNumber }
                                                </label>  
                                            </button>
                                        </li>
                                    : 
                                    null
                                }
                            
                                {userData?.user!==undefined ?
                                    <li>
                                        <div className="flex items-center">
                                            {/* <!-- User Area --> */}
                                            <DropdownUser forwardUserData={props.userData!==undefined ? props.userData : undefined}/>
                                            {/* <!-- User Area --> */}
                                        </div>
                                    </li>
                                :                    
                                    <Link
                                    className="flex justify-center items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                    to="/login"
                                    >
                                    Login
                                    </Link>
                                }
                            
                            </ul>
                        </nav>
                    </div>

                    <div className={`${openMenu===true ? 'transform transition ease-in-out duration-500 sm:duration-700' : 'translate-x-full transform transition ease-in-out duration-500 sm:duration-700' } lg:hidden top-16 pt-4 sm:w-64 right-0 min-h-screen h-full sm:border-l-2 bg-white z-50 fixed overflow-y-auto w-full`}>
                        <div className='h-64 sm:h-auto w-full sm:w-96 grid gap-0 px-10'>
                            <Link onClick={()=>setopenMenu(false)} to="/products" className='h-10 w-full flex items-center justify-around'><span className='h-10 sm:w-full w-full flex items-center font-bold text-[16px] cursor-pointer hover:bg-gray-200 rounded-md'>Our Products</span></Link>
                            <Link onClick={()=>setopenMenu(false)} to="/understanding-your-skin" className='h-10 w-full flex items-center justify-around'><span className='h-10 sm:w-full w-full flex items-center font-bold text-[16px] cursor-pointer hover:bg-gray-200 rounded-md'>Understanding Your Skin</span></Link>
                            <Link onClick={()=>setopenMenu(false)} to="/about-us" className='h-10 w-full flex items-center justify-around'><span className='h-10 sm:w-full w-full flex items-center font-bold text-[16px] cursor-pointer hover:bg-gray-200 rounded-md'>About Us</span></Link>
                            <Link onClick={()=>setopenMenu(false)} to="/faqs" className='h-10 w-full flex items-center justify-around'><span className='h-10 sm:w-full w-full flex items-center font-bold text-[16px] cursor-pointer hover:bg-gray-200 rounded-md'>FAQs</span></Link>
                            <label className='mb-6'></label>
                            <label className='border-t-2 mb-6'></label>
                            {userData?.user!==undefined ?
                                <>
                                {userData.user?.type==="Super Admin" ?
                                    <Link onClick={()=>setopenMenu(false)} to="/sales-report" className='h-10 w-full font-bold flex items-center gap-3.5 text-sm duration-300 ease-in-out hover:text-primary lg:text-base'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 20v2h-2v-2h2zm2-2h-6v6h6v-6zm6-1v5h-2v-5h2zm2-2h-6v9h6v-9zm6-2v9h-2v-9h2zm2-2h-6v13h6v-13zm0-11l-6 1.221 1.716 1.708-6.85 6.733-3.001-3.002-7.841 7.797 1.41 1.418 6.427-6.39 2.991 2.993 8.28-8.137 1.667 1.66 1.201-6.001z"/></svg>
                                        Sales Report
                                    </Link>
                                :null}
                                {userData.user?.type==="Super Admin" || userData.user?.type==="Store Admin" ? 
                                    <>
                                        <button onClick={()=>{
                                            setShop(!shop)
                                            setTransactions(false)
                                            setUsers(false)
                                        }} className='h-10 w-full font-bold flex items-center gap-3.5 text-sm duration-300 ease-in-out hover:text-primary lg:text-base'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.939 0l-.939 4.971v1.098c0 1.066-.933 1.931-2 1.931s-2-.865-2-1.932v-1.097l2.996-4.971h1.943zm-3.052 0l-2.887 4.971v1.098c0 1.066-.933 1.931-2 1.931s-2-.865-2-1.932v-1.097l4.874-4.971h2.013zm17.113 6.068c0 1.067-.934 1.932-2 1.932s-2-.933-2-2v-1.098l-2.887-4.902h2.014l4.873 4.971v1.097zm-10-1.168v1.098c0 1.066-.934 2.002-2 2.002-1.067 0-2-.933-2-2v-1.098l1.047-4.902h1.905l1.048 4.9zm2.004-4.9l2.994 5.002v1.098c0 1.067-.932 1.9-1.998 1.9s-2-.933-2-2v-1.098l-.939-4.902h1.943zm4.996 12v7h-18v-7h18zm2-2h-22v14h22v-14z"/></svg>
                                            Shop
                                        </button>
                                        {shop===true ? 
                                            <div className='px-4 py-2'>
                                                <Link
                                                    to="/update-videos"
                                                    className="h-10 flex gap-2 items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 14.236v3.528l-2-1v-1.528l2-1zm2-3.236l-6 3v4l6 3v-10zm-10 2v5.5c0 .276-.224.5-.5.5h-9c-.276 0-.5-.224-.5-.5v-5.5c-.702 0-1.373-.127-2-.35v6.35c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-6.35c-.627.223-1.298.35-2 .35zm0-8c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm-10 0c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm10-2c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm-10 0c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"/></svg>
                                                    My Videos
                                                </Link>

                                                <Link
                                                    to="/update-product"
                                                    className="h-10 flex gap-2 items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                                >
                                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m19 20.25c0-.402-.356-.75-.75-.75-2.561 0-11.939 0-14.5 0-.394 0-.75.348-.75.75s.356.75.75.75h14.5c.394 0 .75-.348.75-.75zm-7.403-3.398 9.124-9.125c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-9.143 9.103c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 7.651-7.616 2.335 2.327-7.637 7.638z" fillRule="nonzero"/></svg>
                                                    My Products
                                                </Link>
                                                
                                                <Link
                                                    to="/update-package"
                                                    className="h-10 flex gap-2 items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                                >
                                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z"/></svg>
                                                    My Packages
                                                </Link>
                                            </div>
                                        :null}
                                    </>
                                : null}
                                {userData.user?.type==="Super Admin" || userData.user?.type==="Sales Admin" ? 
                                    <>
                                        <button onClick={()=>{
                                            setTransactions(!transactions)
                                            setUsers(false)
                                            setShop(false)
                                        }} className='h-10 w-full font-bold flex items-center gap-3.5 text-sm duration-300 ease-in-out hover:text-primary lg:text-base'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12.562l1.932-7.562 3.526.891-1.974 7.562-3.484-.891zm18.415.902c.125.287.187.598.155.91-.079.829-.698 1.448-1.457 1.602-.254.533-.733.887-1.285 1.002-.244.512-.722.89-1.296 1.01-.325.668-.97 1.012-1.674 1.012-.516 0-1.004-.183-1.356-.538-.928.404-1.902-.048-2.232-.863-.596-.068-1.107-.452-1.332-.997-.599-.071-1.114-.458-1.34-1.003-1.188-.138-1.848-1.44-1.198-2.495-.233-.058-.494-.104-.751-.152l.383-1.464c.524.1 1.01.219 1.453.358.913-.655 2.151-.295 2.549.679.608.069 1.116.464 1.334 1 .598.068 1.111.451 1.335.998.738.082 1.36.653 1.449 1.434l.002.225.45.402c.252.291.68.324.96.106.286-.223.324-.624.075-.909l-1.457-1.279c-.157-.139.052-.38.213-.241l1.491 1.308c.257.294.692.332.969.114.285-.22.316-.631.068-.916l-1.896-1.628c-.162-.135.048-.38.208-.242l1.944 1.669c.248.282.678.335.967.114.283-.22.349-.606-.002-.995-1.24-1.112-2.671-2.405-4.143-3.796-.355.488-2.176 1.502-3.279 1.502s-1.779-.675-1.96-1.343c-.157-.582.051-1.139.532-1.42.535-.313 1.055-.761 1.562-1.268-.789-.586-1.203-.398-2.067.013-.503.238-1.1.521-1.854.647l.437-1.67c1.327-.488 2.549-1.608 4.505-.083l.491-.552c.395-.447.911-.715 1.503-.715.436 0 .91.161 1.408.417 1.518.793 2.293 1.256 3.443 1.294l.394 1.508h-.008c-1.797.033-2.676-.508-4.516-1.47-.513-.263-.859-.318-1.1-.044-.984 1.12-2.031 2.309-3.192 3.063.573.458 2.019-.458 2.592-.92.25-.201.638-.468 1.128-.468.553 0 .955.331 1.244.619.68.68 2.57 2.389 3.407 3.142.434-.242.868-.435 1.311-.605l.383 1.467c-.319.134-.633.286-.95.461zm-11.037.875l.609-.747c.25-.3.215-.722-.08-.944-.296-.223-.737-.158-.986.14l-.61.749c-.251.298-.214.721.08.942s.737.159.987-.14zm1.328 1.006l.617-.755c.248-.297.213-.722-.082-.943-.294-.221-.734-.159-.984.142l-.616.754c-.251.3-.21.712.086.936.297.222.729.167.979-.134zm1.343.992l.608-.747c.251-.299.215-.721-.08-.944-.296-.222-.735-.157-.986.142l-.609.745c-.251.3-.213.724.082.945.293.221.734.16.985-.141zm1.865-.691c-.294-.224-.735-.159-.987.139l-.612.751c-.249.299-.213.722.082.943.295.221.735.16.986-.142l.61-.75c.253-.297.217-.72-.079-.941zm1.427 1.134l-.24-.212c-.063.239-.173.464-.332.65l-.358.441c.133.106.288.176.448.176.149 0 .295-.046.415-.138.284-.223.317-.632.067-.917zm5.201-10.889l1.974 7.562 3.484-.891-1.932-7.562-3.526.891z"/></svg>
                                            Transactions
                                        </button> 
                                        {transactions===true ? 
                                            <div className='px-4 py-2'>
                                                <Link
                                                    to="/all-orders"
                                                    className="h-10 flex gap-2 items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                                >
                                                <svg width="24" height="24"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15zm13.5 10.75c0-.414-.336-.75-.75-.75h-4.5c-.414 0-.75.336-.75.75s.336.75.75.75h4.5c.414 0 .75-.336.75-.75zm-11.772-.537 1.25 1.114c.13.116.293.173.455.173.185 0 .37-.075.504-.222l2.116-2.313c.12-.131.179-.296.179-.459 0-.375-.303-.682-.684-.682-.185 0-.368.074-.504.221l-1.66 1.815-.746-.665c-.131-.116-.293-.173-.455-.173-.379 0-.683.307-.683.682 0 .188.077.374.228.509zm11.772-2.711c0-.414-.336-.75-.75-.75h-4.5c-.414 0-.75.336-.75.75s.336.75.75.75h4.5c.414 0 .75-.336.75-.75zm-11.772-1.613 1.25 1.114c.13.116.293.173.455.173.185 0 .37-.074.504-.221l2.116-2.313c.12-.131.179-.296.179-.46 0-.374-.303-.682-.684-.682-.185 0-.368.074-.504.221l-1.66 1.815-.746-.664c-.131-.116-.293-.173-.455-.173-.379 0-.683.306-.683.682 0 .187.077.374.228.509zm11.772-1.639c0-.414-.336-.75-.75-.75h-4.5c-.414 0-.75.336-.75.75s.336.75.75.75h4.5c.414 0 .75-.336.75-.75z"/></svg>
                                                    Manage Orders
                                                </Link>

                                                <Link
                                                    to="/all-tickets"
                                                    className="h-10 flex gap-2 items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                                >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 22v-20h16v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-14.386h-20v24h10.189c3.163 0 9.811-7.223 9.811-9.614zm-11.073-8.14c-.081-.659.431-1.246 1.101-1.246.628 0 1.124.552 1.045 1.184l-.618 4.941c-.029.231-.226.405-.459.405-.232 0-.43-.174-.459-.405l-.61-4.879zm1.069 8.754c-.563 0-1.021-.457-1.021-1.021s.457-1.021 1.021-1.021c.564 0 1.021.457 1.021 1.021s-.457 1.021-1.021 1.021z"/></svg>
                                                    Manage Reports
                                                </Link>
                                            </div>
                                        :null}
                                    </>
                                : null}
                                {userData.user?.type==="Super Admin" || userData.user?.type==="General Admin" ? 
                                    <>
                                        <button onClick={()=>{
                                            setTransactions(false)
                                            setUsers(!users)
                                            setShop(false)
                                        }} className='h-10 w-full font-bold flex items-center gap-3.5 text-sm duration-300 ease-in-out hover:text-primary lg:text-base'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.644 17.08c2.866-.662 4.539-1.241 3.246-3.682-3.932-7.427-1.042-11.398 3.111-11.398 4.235 0 7.054 4.124 3.11 11.398-1.332 2.455.437 3.034 3.242 3.682 2.483.574 2.647 1.787 2.647 3.889v1.031h-18c0-2.745-.22-4.258 2.644-4.92zm-12.644 4.92h7.809c-.035-8.177 3.436-5.313 3.436-11.127 0-2.511-1.639-3.873-3.748-3.873-3.115 0-5.282 2.979-2.333 8.549.969 1.83-1.031 2.265-3.181 2.761-1.862.43-1.983 1.34-1.983 2.917v.773z"/></svg>
                                            Users
                                        </button> 
                                        {users===true ? 
                                            <div className='px-4 py-2'>
                                                <Link
                                                    to="/user-accounts"
                                                    className="h-10 flex gap-2 items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                                >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.997 18h-.998c0-1.552.06-1.775-.88-1.993-1.438-.332-2.797-.645-3.293-1.729-.18-.396-.301-1.048.155-1.907 1.021-1.929 1.277-3.583.702-4.538-.672-1.115-2.707-1.12-3.385.017-.576.968-.316 2.613.713 4.512.465.856.348 1.51.168 1.908-.49 1.089-1.836 1.4-3.262 1.728-.982.227-.92.435-.92 2.002h-.995l-.002-.623c0-1.259.1-1.985 1.588-2.329 1.682-.389 3.344-.736 2.545-2.209-2.366-4.365-.676-6.839 1.865-6.839 2.492 0 4.227 2.383 1.867 6.839-.775 1.464.824 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.81-2.214c-1.289-.298-2.489-.559-1.908-1.657 1.77-3.342.47-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.325 0 1.269.574 2.175.904 2.925h1.048c-.17-.75-1.466-2.562-.766-3.736.412-.692 1.704-.693 2.114-.012.38.631.181 1.812-.534 3.161-.388.733-.28 1.301-.121 1.648.305.666.977.987 1.737 1.208 1.507.441 1.368.042 1.368 1.48h.997l.002-.463c0-.945-.074-1.492-1.193-1.75zm-22.805 2.214h.997c0-1.438-.139-1.039 1.368-1.48.761-.221 1.433-.542 1.737-1.208.159-.348.267-.915-.121-1.648-.715-1.349-.914-2.53-.534-3.161.41-.682 1.702-.681 2.114.012.7 1.175-.596 2.986-.766 3.736h1.048c.33-.75.904-1.656.904-2.925.001-1.509-.982-2.326-2.247-2.326-1.87 0-3.17 1.787-1.4 5.129.581 1.099-.619 1.359-1.908 1.657-1.12.258-1.194.805-1.194 1.751l.002.463z"/></svg>
                                                    User Accounts
                                                </Link>
                                                
                                                <Link
                                                    to="/emails"
                                                    className="h-10 flex gap-2 items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                                                    Email Subscriptions
                                                </Link>
                                            </div>
                                        :null}
                                    </>
                                : null}

                                {userData.user?.access?.length!==0 && userData.user?.type!=="Customer" ?
                                    <Link onClick={()=>setopenMenu(false)}
                                    className="h-10 flex gap-2 items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                    to="/knowledge-base"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.495 2h16.505v-2h-17c-1.656 0-3 1.343-3 3v18c0 1.657 1.344 3 3 3h17v-20h-16.505c-1.376 0-1.376-2 0-2zm.505 4h14v16h-14v-16zm5.211 11.365c.464-1.469 1.342-3.229 1.496-3.675.225-.646-.174-.934-1.429.171l-.278-.525c1.432-1.559 4.381-1.91 3.378.504-.627 1.508-1.075 2.525-1.331 3.31-.374 1.144.569.68 1.493-.173.127.206.167.271.294.508-2.054 1.953-4.331 2.125-3.623-.12zm3.895-6.71c-.437.372-1.084.364-1.446-.018-.361-.382-.302-.992.135-1.364.438-.372 1.084-.363 1.446.018.362.382.302.993-.135 1.364z"/></svg>
                                    Knowledge Base
                                    </Link>
                                :null}
                                {userData.user?.type!=="Customer" ? 
                                    <Link onClick={()=>setopenMenu(false)}
                                    className="h-10 flex gap-2 items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                    to="/internal-policy"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.312 12.644c-.972-1.189-3.646-4.212-4.597-5.284l-1.784 1.018 4.657 5.35c.623.692.459 1.704-.376 2.239-.773.497-5.341 3.376-6.386 4.035-.074-.721-.358-1.391-.826-1.948-.469-.557-6.115-7.376-7.523-9.178-.469-.601-.575-1.246-.295-1.817.268-.549.842-.918 1.43-.918.919 0 1.408.655 1.549 1.215.16.641-.035 1.231-.623 1.685l1.329 1.624 7.796-4.446c1.422-1.051 1.822-2.991.93-4.513-.618-1.053-1.759-1.706-2.978-1.706-1.188 0-.793-.016-9.565 4.475-1.234.591-2.05 1.787-2.05 3.202 0 .87.308 1.756.889 2.487 1.427 1.794 7.561 9.185 7.616 9.257.371.493.427 1.119.15 1.673-.277.555-.812.886-1.429.886-.919 0-1.408-.655-1.549-1.216-.156-.629.012-1.208.604-1.654l-1.277-1.545c-.822.665-1.277 1.496-1.377 2.442-.232 2.205 1.525 3.993 3.613 3.993.596 0 1.311-.177 1.841-.51l9.427-5.946c.957-.664 1.492-1.781 1.492-2.897 0-.744-.24-1.454-.688-2.003zm-8.292-10.492c.188-.087.398-.134.609-.134.532 0 .997.281 1.243.752.312.596.226 1.469-.548 1.912l-5.097 2.888c-.051-1.089-.579-2.081-1.455-2.732l5.248-2.686zm3.254 10.055l-4.828 2.823-.645-.781 4.805-2.808.668.766zm-6.96.238l4.75-2.777.668.768-4.773 2.791-.645-.782zm8.49 1.519l-4.881 2.854-.645-.781 4.858-2.84.668.767z"/></svg>
                                    Internal Policy
                                    </Link>
                                :null}
                                {userData.user?.type==="Customer" ? 
                                    <>
                                        <Link onClick={()=>setopenMenu(false)} to={`/orders/${userData.user._id}`} state={{profileid: userData.user._id}} className="h-10 flex gap-2 items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"/></svg>
                                            My Orders
                                        </Link>
                                        <Link onClick={()=>setopenMenu(false)} to={`/tickets/${userData.user._id}`} state={{profileid: userData.user._id}} className="h-10 flex gap-2 items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 22v-20h16v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-14.386h-20v24h10.189c3.163 0 9.811-7.223 9.811-9.614zm-11.073-8.14c-.081-.659.431-1.246 1.101-1.246.628 0 1.124.552 1.045 1.184l-.618 4.941c-.029.231-.226.405-.459.405-.232 0-.43-.174-.459-.405l-.61-4.879zm1.069 8.754c-.563 0-1.021-.457-1.021-1.021s.457-1.021 1.021-1.021c.564 0 1.021.457 1.021 1.021s-.457 1.021-1.021 1.021z"/></svg>
                                            My Tickets
                                        </Link>
                                    </>
                                :null}
                                <Link onClick={()=>setopenMenu(false)}
                                    to={`/accounts/profile/${userData.user._id}`} state={{profileid: userData.user._id}}
                                    className="h-10 flex gap-2 items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700"
                                >
                                    <svg
                                    className="fill-current"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        d="M20.8656 8.86874C20.5219 8.49062 20.0406 8.28437 19.525 8.28437H19.4219C19.25 8.28437 19.1125 8.18124 19.0781 8.04374C19.0437 7.90624 18.975 7.80312 18.9406 7.66562C18.8719 7.52812 18.9406 7.39062 19.0437 7.28749L19.1125 7.21874C19.4906 6.87499 19.6969 6.39374 19.6969 5.87812C19.6969 5.36249 19.525 4.88124 19.1469 4.50312L17.8062 3.12812C17.0844 2.37187 15.8469 2.33749 15.0906 3.09374L14.9875 3.16249C14.8844 3.26562 14.7125 3.29999 14.5406 3.23124C14.4031 3.16249 14.2656 3.09374 14.0937 3.05937C13.9219 2.99062 13.8187 2.85312 13.8187 2.71562V2.54374C13.8187 1.47812 12.9594 0.618744 11.8937 0.618744H9.96875C9.45312 0.618744 8.97187 0.824994 8.62812 1.16874C8.25 1.54687 8.07812 2.02812 8.07812 2.50937V2.64687C8.07812 2.78437 7.975 2.92187 7.8375 2.99062C7.76875 3.02499 7.73437 3.02499 7.66562 3.05937C7.52812 3.12812 7.35625 3.09374 7.25312 2.99062L7.18437 2.88749C6.84062 2.50937 6.35937 2.30312 5.84375 2.30312C5.32812 2.30312 4.84687 2.47499 4.46875 2.85312L3.09375 4.19374C2.3375 4.91562 2.30312 6.15312 3.05937 6.90937L3.12812 7.01249C3.23125 7.11562 3.26562 7.28749 3.19687 7.39062C3.12812 7.52812 3.09375 7.63124 3.025 7.76874C2.95625 7.90624 2.85312 7.97499 2.68125 7.97499H2.57812C2.0625 7.97499 1.58125 8.14687 1.20312 8.52499C0.824996 8.86874 0.618746 9.34999 0.618746 9.86562L0.584371 11.7906C0.549996 12.8562 1.40937 13.7156 2.475 13.75H2.57812C2.75 13.75 2.8875 13.8531 2.92187 13.9906C2.99062 14.0937 3.05937 14.1969 3.09375 14.3344C3.12812 14.4719 3.09375 14.6094 2.99062 14.7125L2.92187 14.7812C2.54375 15.125 2.3375 15.6062 2.3375 16.1219C2.3375 16.6375 2.50937 17.1187 2.8875 17.4969L4.22812 18.8719C4.95 19.6281 6.1875 19.6625 6.94375 18.9062L7.04687 18.8375C7.15 18.7344 7.32187 18.7 7.49375 18.7687C7.63125 18.8375 7.76875 18.9062 7.94062 18.9406C8.1125 19.0094 8.21562 19.1469 8.21562 19.2844V19.4219C8.21562 20.4875 9.075 21.3469 10.1406 21.3469H12.0656C13.1312 21.3469 13.9906 20.4875 13.9906 19.4219V19.2844C13.9906 19.1469 14.0937 19.0094 14.2312 18.9406C14.3 18.9062 14.3344 18.9062 14.4031 18.8719C14.575 18.8031 14.7125 18.8375 14.8156 18.9406L14.8844 19.0437C15.2281 19.4219 15.7094 19.6281 16.225 19.6281C16.7406 19.6281 17.2219 19.4562 17.6 19.0781L18.975 17.7375C19.7312 17.0156 19.7656 15.7781 19.0094 15.0219L18.9406 14.9187C18.8375 14.8156 18.8031 14.6437 18.8719 14.5406C18.9406 14.4031 18.975 14.3 19.0437 14.1625C19.1125 14.025 19.25 13.9562 19.3875 13.9562H19.4906H19.525C20.5562 13.9562 21.4156 13.1312 21.45 12.0656L21.4844 10.1406C21.4156 9.72812 21.2094 9.21249 20.8656 8.86874ZM19.8344 12.1C19.8344 12.3062 19.6625 12.4781 19.4562 12.4781H19.3531H19.3187C18.5281 12.4781 17.8062 12.9594 17.5312 13.6469C17.4969 13.75 17.4281 13.8531 17.3937 13.9562C17.0844 14.6437 17.2219 15.5031 17.7719 16.0531L17.8406 16.1562C17.9781 16.2937 17.9781 16.5344 17.8406 16.6719L16.4656 18.0125C16.3625 18.1156 16.2594 18.1156 16.1906 18.1156C16.1219 18.1156 16.0187 18.1156 15.9156 18.0125L15.8469 17.9094C15.2969 17.325 14.4719 17.1531 13.7156 17.4969L13.5781 17.5656C12.8219 17.875 12.3406 18.5625 12.3406 19.3531V19.4906C12.3406 19.6969 12.1687 19.8687 11.9625 19.8687H10.0375C9.83125 19.8687 9.65937 19.6969 9.65937 19.4906V19.3531C9.65937 18.5625 9.17812 17.8406 8.42187 17.5656C8.31875 17.5312 8.18125 17.4625 8.07812 17.4281C7.80312 17.2906 7.52812 17.2562 7.25312 17.2562C6.77187 17.2562 6.29062 17.4281 5.9125 17.8062L5.84375 17.8406C5.70625 17.9781 5.46562 17.9781 5.32812 17.8406L3.9875 16.4656C3.88437 16.3625 3.88437 16.2594 3.88437 16.1906C3.88437 16.1219 3.88437 16.0187 3.9875 15.9156L4.05625 15.8469C4.64062 15.2969 4.8125 14.4375 4.50312 13.75C4.46875 13.6469 4.43437 13.5437 4.36562 13.4406C4.09062 12.7187 3.40312 12.2031 2.6125 12.2031H2.50937C2.30312 12.2031 2.13125 12.0312 2.13125 11.825L2.16562 9.89999C2.16562 9.76249 2.23437 9.69374 2.26875 9.62499C2.30312 9.59062 2.40625 9.52187 2.54375 9.52187H2.64687C3.4375 9.55624 4.15937 9.07499 4.46875 8.35312C4.50312 8.24999 4.57187 8.14687 4.60625 8.04374C4.91562 7.35624 4.77812 6.49687 4.22812 5.94687L4.15937 5.84374C4.02187 5.70624 4.02187 5.46562 4.15937 5.32812L5.53437 3.98749C5.6375 3.88437 5.74062 3.88437 5.80937 3.88437C5.87812 3.88437 5.98125 3.88437 6.08437 3.98749L6.15312 4.09062C6.70312 4.67499 7.52812 4.84687 8.28437 4.53749L8.42187 4.46874C9.17812 4.15937 9.65937 3.47187 9.65937 2.68124V2.54374C9.65937 2.40624 9.72812 2.33749 9.7625 2.26874C9.79687 2.19999 9.9 2.16562 10.0375 2.16562H11.9625C12.1687 2.16562 12.3406 2.33749 12.3406 2.54374V2.68124C12.3406 3.47187 12.8219 4.19374 13.5781 4.46874C13.6812 4.50312 13.8187 4.57187 13.9219 4.60624C14.6437 4.94999 15.5031 4.81249 16.0875 4.26249L16.1906 4.19374C16.3281 4.05624 16.5687 4.05624 16.7062 4.19374L18.0469 5.56874C18.15 5.67187 18.15 5.77499 18.15 5.84374C18.15 5.91249 18.1156 6.01562 18.0469 6.11874L17.9781 6.18749C17.3594 6.70312 17.1875 7.56249 17.4625 8.24999C17.4969 8.35312 17.5312 8.45624 17.6 8.55937C17.875 9.28124 18.5625 9.79687 19.3531 9.79687H19.4562C19.5937 9.79687 19.6625 9.86562 19.7312 9.89999C19.8 9.93437 19.8344 10.0375 19.8344 10.175V12.1Z"
                                        fill=""
                                    />
                                    <path
                                        d="M11 6.32498C8.42189 6.32498 6.32501 8.42186 6.32501 11C6.32501 13.5781 8.42189 15.675 11 15.675C13.5781 15.675 15.675 13.5781 15.675 11C15.675 8.42186 13.5781 6.32498 11 6.32498ZM11 14.1281C9.28126 14.1281 7.87189 12.7187 7.87189 11C7.87189 9.28123 9.28126 7.87186 11 7.87186C12.7188 7.87186 14.1281 9.28123 14.1281 11C14.1281 12.7187 12.7188 14.1281 11 14.1281Z"
                                        fill=""
                                    />
                                    </svg>
                                    Account Settings
                                </Link>

                                <button onClick={()=>{ logOut(), navigate("/")}} className="h-10 flex gap-2 items-center text-gray-900 font-bold text-[16px] cursor-pointer hover:text-gray-700">
                                    <svg
                                    className="fill-current"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                                        fill=""
                                    />
                                    <path
                                        d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                                        fill=""
                                    />
                                    </svg>
                                    Log Out
                                </button>
                                </>
                            :
                                <Link onClick={()=>setopenMenu(false)}
                                className='h-10 sm:h-1 w-full flex items-center justify-around'
                                to="/login"
                                >
                                    <div className='bg-blue-400 text-white text-center h-10 w-full flex justify-center items-center font-bold text-[16px] cursor-pointer hover:bg-gray-200 rounded-md'>
                                        Login
                                    </div>
                                </Link>   
                            }
                        </div>
                    </div>

                <div className='lg:hidden justify-end flex items-center px-2'>

                    <div onClick={()=>setOpenSearch(!openSearch)} className='sm:hidden cursor-pointer px-1 h-full flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>
                    </div>

                    {userData?.user===undefined ?
                        <div onClick={()=>{
                            if(open===false) {
                                setOpen(true)
                            } else {
                                setOpen(false)
                            }
                        }} className='h-10 sm:h-1 w-full flex items-center justify-around px-2 relative'>
                            <span className='h-10 sm:w-full w-full flex items-center font-bold text-[16px] cursor-pointer hover:bg-gray-200 rounded-md'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M20 7h-4v-3c0-2.209-1.791-4-4-4s-4 1.791-4 4v3h-4l-2 17h20l-2-17zm-11-3c0-1.654 1.346-3 3-3s3 1.346 3 3v3h-6v-3zm-4.751 18l1.529-13h2.222v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h2.222l1.529 13h-15.502z"/></svg>
                            </span>
                            <label className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 text-xs font-semibold pt-3'>{userData?.cartNumber }</label>  
                        </div>
                    : 
                        userData?.user?.type==="Customer" ?
                            <div onClick={()=>{
                                if(open===false) {
                                    setOpen(true)
                                } else {
                                    setOpen(false)
                                }
                            }} className='h-10 sm:h-1 w-min flex items-center justify-around px-2 relative'>
                                <span className='h-10 sm:w-full w-full flex items-center font-bold text-[16px] cursor-pointer hover:bg-gray-200 rounded-md'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M20 7h-4v-3c0-2.209-1.791-4-4-4s-4 1.791-4 4v3h-4l-2 17h20l-2-17zm-11-3c0-1.654 1.346-3 3-3s3 1.346 3 3v3h-6v-3zm-4.751 18l1.529-13h2.222v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h2.222l1.529 13h-15.502z"/></svg>
                                </span>
                                <label className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 text-xs font-semibold pt-3'>{userData?.cartNumber }</label>  
                            </div>
                        : null
                    }

                    <div onClick={()=>{
                        if(openMenu===false) {
                        setopenMenu(true)
                        }
                        if(openMenu===true) {
                        setopenMenu(false)
                        }
                    }} className='w-auto h-full px-2 flex justify-end items-center cursor-pointer'>
                        <svg height="34" width="34" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z"/></svg>
                    </div>
                    </div>
                        <Cart open={open} setOpen={setOpen} />
                    </div>

                    <div className={`${openSearch===false ? 'transition-height ease-in-out duration-500 sm:duration-700 h-0' : 'transition-height ease-in-out duration-500 sm:duration-700 h-12'} bg-white w-full shadow-md relative sm:hidden block`}>
                        <div className={`${openSearch===false ? 'transition-height ease-in-out duration-500 sm:duration-700 h-0' : 'transition-height ease-in-out duration-500 sm:duration-700 h-12'} relative w-full`}>
                            <div className={`${openSearch===false ? 'transition-height ease-in-out duration-500 sm:duration-700 h-0' : 'transition-height ease-in-out duration-500 sm:duration-700 h-12'} sm:hidden absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none z-10`}>
                                <svg className="w-[75%] h-[75%] text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <label htmlFor="product-search" className="sr-only">Search</label>
                            <input onChange={(e)=>setSearch(e.target.value)} value={search} disabled={openSearch===false ?true:false} type="text" id="product-search" className={`${openSearch===false ? 'transition-height ease-in-out duration-500 sm:duration-700 h-0' : 'transition-height ease-in-out duration-500 sm:duration-700 h-12'} block w-full text-sm pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="Search product..."/>
                            
                            {search!=="" && openSearch===true ?
                                <div className={`grid gap-2 absolute bg-white h-auto border max-h-[150px]  w-full overflow-y-scroll rounded-b-xl no-scrollbar shadow-md`}>
                                    {filteredProducts.map((a, index)=> {
                                        return <Link onClick={()=>setSearch("")} to={`/products/${encodeURIComponent(a.name.replace(/\s+/g, '-').toLowerCase())}/${a._id}`} state={{productid: a._id, productname: a.name}} target='_blank' className="h-auto w-auto flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-100" key={index}>
                                            <div className='flex h-[40px] w-[40px] items-center justify-center border overflow-hidden rounded-md'>
                                                <img className='h-full w-full object-cover' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDNAME}/image/upload/f_auto,q_30/${a?.displayimage}.jpg`}></img>
                                            </div>
                                            {a.name}
                                        </Link>
                                    })}
                                </div>
                            :null}
                        </div>
                    </div>
                </div>
        </header>
    )
}

export default Navbar