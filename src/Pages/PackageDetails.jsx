import Footer from '../Components/Footer';
import Navbar from '../Components/NavBar';
import Packages from "../Details/Packages";

export default function PackageDetails() {
    return (
        <>
            <div>
                <Navbar/>
            </div>
            <Packages/>
            <Footer/>
        </>
    )
}