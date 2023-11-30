import { PiWarningFill } from "react-icons/pi";

export default function Precautions() {
    return(
        <div className='min-h-screen h-auto w-full bg-fixed bg-[url("https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover'>
            <div className='min-h-screen h-auto w-full grid text-white bg-gray-700 bg-opacity-80'>
                <div className="h-full w-full container mx-auto grid sm:px-12 sm:py-8 p-4">
                    <div className="flex justify-center m-6 items-center gap-2">
                        <h1 className="uppercase subHeading text-blue-400">Precautions </h1>
                        <PiWarningFill className="text-blue-400 sm:h-[50px] sm:w-[50px] h-[30px] w-[30px]"/>
                    </div>
                    <div className="sm:grid-cols-2 grid sm:gap-4 px-4">
                        <div data-aos="fade-up"
     data-aos-duration="3000" className="h-auto sm:m-4 max-h-[250px] w-full rounded-xl overflow-hidden">
                            <img className="h-full w-full object-cover" src="https://img.freepik.com/free-photo/skin-allergy-reaction-test-person-s-arm_23-2149140457.jpg?w=740&t=st=1700115203~exp=1700115803~hmac=6f266b9a4cb6720378266dbbe57959520cad9bd2dc0738770dec6567de447d25"></img>
                        </div>
                        <div data-aos="fade-down"
     data-aos-duration="3000" className="w-auto p-4 flex items-center">
                            <p className="tinyText text-justify"><span className="text-blue-400 font-semibold sm:text-xl text-base">PATCH TESTING</span>: When adding new products to your skincare routine, we always recommend patch testing. Apply a small amount of the product on dry cleansed skin behind the ear or on your inner arm. Wait at least 24 hours to see if any irritation occurs. If you notice any irritation such as redness, itchiness or burning, rinse off and discontinue use. Please note, it can take up to 72 hours for a reaction to present itself. Introduce new products slowly, and one at a time, so that you can easily identify any sources of irritation.</p>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-2 sm:gap-4 flex flex-col-reverse px-4">
                        <div data-aos="fade-up"
     data-aos-duration="3000" className="w-auto p-4 flex items-center">
                            <p className="tinyText text-justify"><span className="text-blue-400 font-semibold sm:text-xl text-base">PREGNANCY OR BREASTFEEDING</span>: We do not recommend this product if pregnant or breastfeeding, consult your doctor before use.</p>         
                        </div>
                        <div data-aos="fade-down"
     data-aos-duration="3000" className="h-auto w-full sm:m-4 max-h-[250px] rounded-xl overflow-hidden">
                            <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1615766553246-9147b6d50e90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTN8fHxlbnwwfHx8fHw%3D"></img>
                        </div>
                    </div>

                    <div className="sm:grid-cols-2 grid sm:gap-4 px-4">
                        <div data-aos="fade-up"
     data-aos-duration="3000" className="h-auto sm:m-4 max-h-[250px] w-full rounded-xl overflow-hidden">
                            <img className="h-full w-full object-cover" src="https://images.pexels.com/photos/2598024/pexels-photo-2598024.jpeg?auto=compress&cs=tinysrgb&w=600"></img>
                        </div>
                        <div data-aos="fade-down"
     data-aos-duration="3000" className="w-auto p-4 flex items-center">
                            <p className="smallText text-justify"><span className="text-blue-400 font-semibold sm:text-xl text-base">CHILDREN UNDER AGE 12</span>: This product is only recommended for people age 13 and above.</p>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-2 sm:gap-4 flex flex-col-reverse px-4">
                        <div data-aos="fade-up" data-aos-duration="3000" className="w-auto p-4 flex items-center">
                            <p className="tinyText text-justify"><span className="text-blue-400 font-semibold sm:text-xl text-base">FOR EXTERNAL USE ONLY</span></p>
                        </div>
                        <div data-aos="fade-down" data-aos-duration="3000" className="h-auto w-full sm:m-4 max-h-[250px] rounded-xl overflow-hidden">
                            <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

//https://img.freepik.com/free-photo/smart-attractive-asian-woman-doctor-explain-discuss-with-old-asian-man-consult-clinic-background-health-concept_609648-2327.jpg?w=740&t=st=1700109174~exp=1700109774~hmac=c65bd8cd4d8af75f9d6304ddee8ecf192d03c343de5f255825f0eb3d51dcba6c