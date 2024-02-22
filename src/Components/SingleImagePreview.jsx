import React from "react";

const SingleImagePreview = React.memo((file) => {
    return (
        <>
            {file.file[0]!==undefined ? 
                <>
                    <img className="absolute inset-0 h-full w-full object-cover" src={URL.createObjectURL(file.file[0])}></img>
                </>
            :
                null
            }
        
        </>
    )
})

export default SingleImagePreview