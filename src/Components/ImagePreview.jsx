import React from "react";

const ImagePreview = React.memo((props) => {

    function removeIngredient(index) {
        let list = props.prodIngredients
        list.splice(index, 1)
        props.setProdIngredients(list)
    }
    
    return (
        <>
            {props?.prodIngredients[0]!==undefined ? 
                <div className="grid grid-cols-6 gap-2 my-2">
                    {props?.prodIngredients.map((a, index)=> {
                        return (
                            <div className="h-auto w-auto col-span-2 block justify-center p-4 rounded-lg bg-blue-400 relative" key={index}>
                                <label onClick={()=>removeIngredient(index)}  className="absolute right-0 top-0 pr-4 cursor-pointer font-bold hover:text-gray-600">x</label>
                                <img className="h-[150px] w-[200px] rounded-lg" src={URL.createObjectURL(a.photo)}></img>
                                <label>{a.name}</label>
                                <label className="inline-block">{a.desc}</label>
                            </div>
                        )
                    })}
                </div>
            :
                <div className="my-2">
                    <label className="font-bold">No ingredients added yet.</label>
                </div>
            }
        
        </>
    )
})

export default ImagePreview