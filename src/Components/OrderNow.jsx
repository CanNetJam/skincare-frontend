export default function OrderNow() {
    return (
        <>
            <div className="sm:min-h-[50vh] h-auto w-full bg-blue-300 grid justify-center py-6">
                <div className="flex justify-center">
                    <h1 className="text-black font-bold sm:text-4xl text-2xl">Product is also available on: </h1>
                </div>
                <br/>
                <div className="h-full grid grid-cols-3 sm:flex gap-2">
                    <a href='https://shopee.ph/klued?categoryId=100630&entryPoint=ShopByPDP&itemId=19274794841&upstream=search' 
                        target="_blank" className="sm:h-[175px] sm:w-[175px] h-[100px] w-[100px] overflow-hidden rounded-xl p-4 cursor-pointer">
                        <img className='h-full w-full' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/1200px-Shopee_logo.svg.png"></img>
                    </a>
                    <a href='https://www.lazada.com.ph/shop/klued?spm=a2o4l.searchlist.card.1.7724165f7WLZ9s&from=onesearch_brand_124351655'
                        target="_blank" className="sm:h-[175px] sm:w-[175px] h-[100px] w-[100px] overflow-hidden rounded-xl p-4 cursor-pointer">
                        <img className='h-full w-full' src="https://logos-world.net/wp-content/uploads/2022/06/Lazada-Symbol.png"></img>
                    </a>
                    <a href='https://www.tiktok.com/@klued_' target='_blank' className="sm:h-[175px] sm:w-[175px] h-[100px] w-[100px] overflow-hidden rounded-xl p-4 cursor-pointer">
                        <img className='h-full w-full' src="https://static-00.iconduck.com/assets.00/tiktok-icon-1890x2048-ihin0vop.png"></img>
                    </a>
                </div>
            </div>
        </>
    )
}