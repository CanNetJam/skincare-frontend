import React, { useEffect } from 'react'

export default function PageButtons({page, pages, setPage, displayedPages, setDisplayedPages, pageButtons, setPageButtons}) {
    useEffect(()=> {
        const calculatePages = () => {   
            var elements = [];
            if (pages<=5) {
                elements.push(
                    <li key={-1}>
                        <button disabled={page===0? true : false} onClick={()=>setPage(prev=>prev-1)} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg ${page!==0? 'hover:bg-gray-100 hover:text-gray-700' : null } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{'<'}</button>
                    </li>
                )
                for(let i =0; i < pages; i++){
                    elements.push(
                        <li key={i}>
                            <button disabled={page===i ? true : false} onClick={()=>setPage(i)} className={`${page===i ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700' } flex items-center justify-center px-3 h-8 leading-tight  border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                {i+1}
                            </button>
                        </li>
                    )
                }
                elements.push(
                    <li key={pages+1}>
                        <button disabled={page>=(pages-1)? true : false} onClick={()=>setPage(prev=>prev+1)} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${page<=(pages-1) ? 'hover:bg-gray-100 hover:text-gray-700' : null } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{'>'}</button>
                    </li>
                )
            } else if (pages>=5) {

                let end = displayedPages<pages ? displayedPages : pages
                elements.push(
                    <li key={'previous'}>
                        <button disabled={page===0? true : false} onClick={()=>{
                            setPage(prev=>prev-1)
                            if(page===(displayedPages-5)) {
                                setDisplayedPages(prev=>prev-5)
                            }
                            }} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg ${page!==0? 'hover:bg-gray-100 hover:text-gray-700' : null } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{'<'}</button>
                    </li>
                )
                if (displayedPages-5!==0) {
                    elements.push(
                        <li key={'less'}>
                            <button onClick={()=>{
                                setPage(prev=>prev-5)
                                setDisplayedPages(prev=>prev-5)
                            }} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 ${page!==0? 'hover:bg-gray-100 hover:text-gray-700' : null } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>...</button>
                        </li>
                    )
                }
                for(let i = displayedPages-5; i < end; i++){
                    elements.push(
                        <li key={i}>
                            <button disabled={page===i ? true : false} onClick={()=>setPage(i)} className={`${page===i ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700' } flex items-center justify-center px-3 h-8 leading-tight  border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                {i+1}
                            </button>
                        </li>
                    )
                }
                if (displayedPages<pages) {
                    elements.push(
                        <li key={'more'}>
                            <button onClick={()=>{
                                setPage(prev=>prev+5)
                                setDisplayedPages(prev=>prev+5)
                            }} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 ${displayedPages<pages? 'hover:bg-gray-100 hover:text-gray-700' : null } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>...</button>
                        </li>
                    )
                }
                elements.push(
                    <li key={'next'}>
                        <button disabled={page>=(pages-1)? true : false} onClick={()=>{
                            setPage(prev=>prev+1)
                            if((page+1)===displayedPages) {
                                setDisplayedPages(prev=>prev+5)
                            }
                            }} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${page>=(end) ? 'hover:bg-gray-100 hover:text-gray-700' : null } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{'>'}</button>
                    </li>
                )
            }
            setPageButtons(elements)
        }
        calculatePages()
    }, [pages, page])

    return (
        <ul className="inline-flex justify-center -space-x-px rtl:space-x-reverse text-sm h-8">
            {pageButtons[0]!==undefined ? 
                <>
                    {pageButtons.map((a)=> {
                        return a
                    })}
                </>
            :null}
        </ul>
    )
}
