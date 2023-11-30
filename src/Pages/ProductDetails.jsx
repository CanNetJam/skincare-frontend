import Footer from '../Components/Footer';
import Product1 from '../Details/Product1';
import Navbar from '../Components/Navbar';
import ProductCategories from './ProductCategories';

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