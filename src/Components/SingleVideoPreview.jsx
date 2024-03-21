import React from 'react'

const SingleVideoPreview = React.memo((file) => {
    return (
        <>
            {file.file[0]!==undefined ? 
                <>
                    <video className="h-full w-full object-contain" src={URL.createObjectURL(file.file[0])}></video>
                </>
            :
                null
            }
        
        </>
    )
})


export default SingleVideoPreview
