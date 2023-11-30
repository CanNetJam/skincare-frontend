import Routines from "../Components/Routines"
import Precautions from "../Components/Precautions"
import DoDonts from "../Components/DoDonts"
import Navbar from '../Components/NavBar'
import Footer from '../Components/Footer'
import Usage from '../Components/Usage'
import OrderNow from '../Components/OrderNow'
import image1 from "../assets/18.jpg"

export default function Product1() {
    return (
        <>
            <div>
                <Navbar/>
            </div>
            <div className="h-full w-full flex container mx-auto mt-16 sm:px-10">
                <div className="min-h-[300vh] h-auto w-full sm:px-20 z-10 px-4 py-16">
                    <div className="pb-10">
                        <h1 className="subHeading">Klued - Multi-Hyaluronic Acid Complex Serum</h1>
                        <br/>
                        <p className="tinyText">
                        Our Multi-Hyaluronic Acid Complex Serumis a powerhouse of hydration, addressingthe different layers of your skin for a multi-targeted approach. Whether your skin is in need of an immediate moisture boost or long-term hydration.
                        <br/><br/>Unveil youthful, bouncy skin with our oil-free serum. Infused with 6 molecular weights of Hyaluronic Acid, it deeply hydrates, plumps, and diminishes fine lines, ensuring healthy and vibrant skin.
                        <br/><br/>Combines six different types of Hyaluronic Acid, each with its unique molecular weight and properties, for a comprehensive approach to skin hydration
                        </p>
                    </div>
                    <div className="flex justify-center"><h3 className="subHeading">Key Ingredients</h3></div>
                    <br/>
                    <div className="w-full grid justify-center my-8 bg-white rounded-xl p-4">
                        <img className='h-full w-full rounded-full object-cover' src="https://veracityselfcare.com/cdn/shop/articles/Actives2_800x@2x.jpg?v=1690913793"></img>
                        <br/>
                        <h5 className="contentHeading text-blue-400 text-center">Sodium Hyaluronate Crosspolymer</h5>
                        <p className="smallText text-center mt-4">This advanced form of Hyaluronic Acid offers enhanced stability and extended moisture retention. It forms a flexible film on the skin's surface, locking in hydration for a prolonged, dewy complexion.</p>
                    </div>

                    <div className="w-full grid justify-center my-14 bg-white rounded-xl p-4">
                        <img className='h-full w-full rounded-full object-cover' src="https://purezanature.com/image/purezanature/image/data/Sodium%20Hyaluronate.jpg"></img>
                        <br/>
                        <h5 className="contentHeading text-blue-400 text-center">Sodium Hyaluronate</h5>
                        <p className="smallText text-center mt-4">Known for its exceptional ability to hold water, Sodium Hyaluronate penetrates the skin's upper layers to deliver intense hydration. It plumps the skin, reducing the appearance of fine lines and wrinkles.</p>
                    </div>

                    <div className="w-full grid justify-center my-14 bg-white rounded-xl p-4">
                        <img className='h-full w-full rounded-full object-cover' src="https://puresense.co.in/cdn/shop/articles/1_1.jpg?v=1661838465"></img>
                        <br/>
                        <h5 className="contentHeading text-blue-400 text-center">Hydrolyzed Sodium Hyaluronate</h5>
                        <p className="smallText text-center mt-4">This hydrolyzed version of Hyaluronic Acid has a lower molecular weight, allowing it to penetrate deeper into the skin. It provides long-lasting hydration and supports the skin's natural moisture balance.</p>
                    </div>

                    <div className="w-full grid justify-center my-14 bg-white rounded-xl p-4">
                        <img className='h-full w-full rounded-full object-cover' src="https://ingredientsecret.com/wp-content/uploads/2022/06/close-up-hyaluronic-acid-tratment.jpeg"></img>
                        <br/>
                        <h5 className="contentHeading text-blue-400 text-center">Hyaluronic Acid</h5>
                        <p className="smallText text-center mt-4">The star ingredient for hydration, Hyaluronic Acid is a moisture magnet. It attracts and retains water in the skin, instantly revitalizing it and enhancing its natural radiance.</p>
                    </div>

                    <div className="w-full grid justify-center my-14 bg-white rounded-xl p-4">
                        <img className='h-full w-full rounded-full object-cover' src="https://images.squarespace-cdn.com/content/v1/58d3ea56d482e9f59601eff9/1493136675010-RKLIUGNNZ64WN89YW5T2/sourced+from+http%3A%2F%2Fblog.tataharperskincare.com%2F"></img>
                        <br/>
                        <h5 className="contentHeading text-blue-400 text-center">Hydrolyzed Hyaluronic Acid</h5>
                        <p className="smallText text-center mt-4">With its smaller molecular size, this form of Hyaluronic Acid penetrates even further into the skin, providing a deep and sustained moisturizing effect. It helps to plump and firm the skin's appearance.</p>
                    </div>

                    <div className="w-full grid justify-center my-14 bg-white rounded-xl p-4">
                        <img className='h-full w-full rounded-full object-cover' src="https://www.forealbio.com/wp-content/uploads/2018/09/Sodium-acetylated-hyaluronate-2.jpg"></img>
                        <br/>
                        <h5 className="contentHeading text-blue-400 text-center">Sodium Acetylated Hyaluronate</h5>
                        <p className="smallText text-center mt-4">This specialized form of Hyaluronic Acid is prized for its remarkable skin-smoothing properties. It helps to diminish the look of fine lines and promotes a silky, youthful texture.</p>
                    </div>

                </div>
                <div className='h-screen w-full sticky top-0 items-center'>
                    <img className='h-full w-full object-cover z-10 overflow-visible' src={image1}></img>
                </div>
            </div>
            <Usage/>
            <Routines />
            <Precautions />
            <DoDonts />
            <OrderNow/>
            <Footer/>
        </>
    )
}