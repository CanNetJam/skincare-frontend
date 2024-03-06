import React from 'react';

export default function EmptyContent() {
    return (
        <div className='min-h-[40vh] w-full flex justify-center items-center text-gray-500 border-x border-b rounded-b-md shadow-md'>
            <div className='max-w-[250px] flex items-center px-6 rounded-full'>
                <label className='font-semibold text-lg text-center'>Seems like this  page is empty.</label>
            </div>
        </div>
    )
}
