import Footer from '../Components/Footer';
import ProductCategories from './ProductCategories';
import Navbar from '../Components/NavBar'

export default function ProductDetails() {
    return (
        <>
            <div>
                <Navbar/>
            </div>
            <ProductCategories />
            <Footer/>
        </>
    )
}