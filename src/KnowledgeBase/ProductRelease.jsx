import React, { useEffect } from 'react';

export default function ProductRelease() {
    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])

    useEffect(() => {
        const handleContextmenu = e => {
            e.preventDefault()
        }
        document.addEventListener('contextmenu', handleContextmenu)
        return function cleanup() {
            document.removeEventListener('contextmenu', handleContextmenu)
        }
    }, [])

    return (
        <div className='bg-blue-200 h-auto w-full text-base sm:text-lg sm:p-8 p-4'>
            <section className='my-2'>
                <h1 className='subHeading text-center sm:mb-6 mb-2'>Preparing Product Released<br/>(KB-020)</h1>
                <p><b>Written on:</b> April 10, 2024 <br/> <b>Updated on:</b> April 13, 2024</p>
            </section>
            <br/>
            <div className='h-auto sm:rounded-[30px] rounded-[10px] overflow-hidden'>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2'>
                    <h2 className='font-bold contentHeading my-4 text-center'>Tiktok</h2>
                    <h3 className='font-bold contentSubHeading my-4'><b>Steps:</b></h3>
                    <ol className='sm:ml-8 ml-4 list-decimal sm:text-lg text-base text-justify'>
                        <li className='my-2'>First go to <b>“MANAGE ORDERS”</b>, Then go to <b>“TO SHIP”</b>, After that go to <b>“ORDER STATUS”</b> beside of filter.</li>
                        <li className='my-2'>Then click <b>“ORDER STATUS”</b> and click <b>“AWAITING COLLECTION”</b>.</li>
                        <li className='my-2'>After that click <b>“EXPORT”</b> beside of sort by. Then click the <b></b>“FILTERED ORDERS” and click <b>“EXCEL”</b> under the export format.</li>
                        <li className='my-2'>Then click the green <b>“EXPORT”</b> icon. Then wait for a minute until the exported file is ready to download.</li>
                        <li className='my-2'>Once its ready click <b>“DOWNLOAD”</b>. </li>
                        <li className='my-2'>Go to the folder where your exported file located. Then click <b>"Open File"</b>.</li>
                        <li className='my-2'>Then click <b>"Enable Editing"</b>.</li>
                        <li className='my-2'>Go to column <b>"J or QUANTITY"</b>. Then click on the first quantity.</li>
                        <li className='my-2'>Press <b>"Ctrl+Shift+Arrow Down"</b> to highlights all the quantity.</li>
                        <li className='my-2'>Then click on icon that you will see in the left side of the highlighted quantity. Then select the <b>“CONVERT TO NUMBER”</b>.</li>
                        <li className='my-2'>Then Create a <b>“NEW SHEET”</b>.</li>
                        <li className='my-2'>Then go to column <b>"H or PRODUCT NAME"</b>. Then click on the first product name.</li>
                        <li className='my-2'>Press <b>"Ctrl+Shift+Arrow Down"</b> to highlights all the product name. Then press <b>"Ctrl+C"</b> to copy.</li>
                        <li className='my-2'>Go to <b>"New Sheet"</b> that you created and press <b>"Ctrl+V"</b> to pasted the copied product name.</li>
                        <li className='my-2'>Go to <b>"Data"</b> then <b>"Remove Duplicates"</b>.</li>
                        <li className='my-2'>Sort them by item, bundle deal, and buy-and-get deals.</li>
                        <li className='my-2'>Then go to <b>"Column B1"</b> then type the formula <b>"=SUMIF(range,criteria,[sum_range])"</b>. Then hit <b>"Enter"</b>.</li>
                        <li className='my-2'>Drag down <b>"Column B1"</b> until the last content.</li>
                        <li className='my-2'>Add the products included in bundle deals and buy-and-get deals to the specific product item that we have.</li>
                    </ol>
                    <iframe className='sm:min-h-[500px] h-auto w-full' src="https://drive.google.com/file/d/1O5RK4VTidzrs6SY4EHj0eBdn5XY0p-sS/preview" allow="autoplay"></iframe>
                </section>
                <section className='container bg-gray-100 mx-auto sm:p-10 p-2 grid gap-2'>
                    <h2 className='font-bold contentHeading my-4 text-center'>Lazada</h2>
                    <h3 className='font-bold contentSubHeading my-4'><b>Steps:</b></h3>
                    <ol className='sm:ml-8 ml-4 list-decimal sm:text-lg text-base text-justify'>
                        <li className='my-2'>First go to <b>“ORDERS”</b> then go to <b>“TO HANDOVER”</b>. Then locate the <b>“EXPORT”</b> and click it. Then click <b>“EXPORT ALL”</b>.</li>
                        <li className='my-2'>Then click <b>“OK”</b>. To confirm export. Then wait a minute until the exported file being downloaded.</li>
                        <li className='my-2'>Go to the destination or folder where the exported file is located. Then click <b>"Open File"</b>.</li>
                        <li className='my-2'>Then click <b>"Enable Editing"</b>.</li>
                        <li className='my-2'>After that, create a <b>”NEW SHEET”</b>.</li>
                        <li className='my-2'>Find <b>"Column AZ or ITEM NAME"</b> then click on the first <b>"Item Name"</b>.</li>
                        <li className='my-2'>Press <b>"Ctrl+Shift+Arrow Down"</b> to highlight all the item name. Then press <b>"Ctrl+C"</b> to copy the content.</li>
                        <li className='my-2'>Then go to <b>"New Sheet"</b> that you created and press <b>"Ctrl+V"</b> to paste the copied content.</li>
                        <li className='my-2'>Go to <b>"Data"</b> then <b>"Remove Duplicates"</b>.</li>
                        <li className='my-2'>Sort them by item, bundle deal, and buy one get one deals.</li>
                        <li className='my-2'>Then go to <b>"Column B1"</b> then type the formula <b>"=COUNTIF(range,criteria)"</b>. Then hit <b>"Enter"</b>.</li>
                        <li className='my-2'>Drag down <b>"Column B1"</b> until to the last content.</li>
                        <li className='my-2'>Add the products included in bundle deals and buy one get one deals to the specific product item.</li>
                    </ol>
                    <iframe className='sm:min-h-[500px] h-auto w-full' src="https://drive.google.com/file/d/1pS-PqAJolw8BdwRITPjsH6BPy31XS4GM/preview" allow="autoplay"></iframe>
                </section>
                <section className='container bg-white mx-auto sm:p-10 p-2 grid gap-2'>
                    <h2 className='font-bold contentHeading my-4 text-center'>Shopee</h2>
                    <h3 className='font-bold contentSubHeading my-4'><b>Steps:</b></h3>
                    <ol className='sm:ml-8 ml-4 list-decimal sm:text-lg text-base text-justify'>
                        <li className='my-2'>Go to my <b>“ORDERS”</b> then go to <b>“PROCESSED”</b> </li>
                        <li className='my-2'>Then locate <b>“EXPORT”</b>. you will find it in the upper right side, above the search button. Then click.</li>
                        <li className='my-2'>After that click the <b>“DOWNLOAD”</b>.</li>
                        <li className='my-2'>Go to the destination or folder where the exported file is located. Then click <b>"Open File"</b>.</li>
                        <li className='my-2'>Then click <b>"Enable Editing"</b>.</li>
                        <li className='my-2'>Press <b>"Ctrl+Shift+L"</b>. Then go to tracking and press the arrow then find if there's a <b>"Blanks"</b> if there is, remove the check or uncheck the <b>“Blanks”</b>.</li>
                        <li className='my-2'>Go to column <b>"Q"</b> then click the first quantity. Then press <b>"Ctrl+Shift+Arrow Down"</b>.</li>
                        <li className='my-2'>Then click the logo that appears in the left side. After that, click <b>"Convert to Number"</b>.</li>
                        <li className='my-2'>Create a <b>"New Sheet"</b>.</li>
                        <li className='my-2'>Go to sheet 1 <b>"Column L or Product Name"</b> click the first product name, then press <b>"Ctrl+Shift+Arrow Down"</b> to highlight all the product.</li>
                        <li className='my-2'>Then press <b>"Ctrl+C"</b> to copy and go to the <b>"New Sheet"</b> you created, then press <b>"Ctrl+V"</b> to paste.</li>
                        <li className='my-2'>Then click <b>"Wrap Text"</b> and go to <b>"Data"</b> then <b>"Remove Duplicates"</b>.</li>
                        <li className='my-2'>Sort them by item, bundle deal, and buy & get deals.</li>
                        <li className='my-2'>Then go to <b>"Column B1"</b> then type the formula <b>"=SUMIF(range,criteria,[sum_range])"</b>. Then hit <b>"Enter"</b>.</li>
                        <li className='my-2'>Drag down <b>"Column B1"</b> until the last content.</li>
                        <li className='my-2'>Then Add each product included in bundle deals and buy one get one deals to the specific product item that we have.</li>
                    </ol>
                    <iframe className='sm:min-h-[500px] h-auto w-full' src="https://drive.google.com/file/d/1Hwxn35f0VKggCpqdl3cwv-hwMAm-FBEt/preview" allow="autoplay"></iframe>
                </section>
            </div>
        </div>
    )
}
