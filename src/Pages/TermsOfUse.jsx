import React, { useEffect } from 'react';
import Navbar from '../Components/TopNav';
import Footer from '../Components/Footer';

export default function TermsOfUse() {
    useEffect(()=> {
        const windowOpen = () => {   
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        windowOpen()
    }, [])

    return (
        <>
            <Navbar/>
        
            <div className='container mx-auto py-10 '>
                <h1 className='font-bold lg:text-4xl text-3xl lg:py-6 py-10 text-center'>Klued Skin Care Products Trading Terms of Use</h1>
                <p className='px-4 text-justify'>
                    <b>Effective Date: May 20, 2023
                    <br/>
                    <br/>
                    1. Acceptance of Terms</b>
                    <br/>
                    By accessing or using the Klued Skin Care Products Trading website ("Website") or mobile application ("App"), you agree to comply with and be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use our website or App.
                    <br/>
                    <br/>
                    <b>2. Changes to Terms</b>
                    <br/>
                    Klued Skin Care Products Trading reserves the right to modify or replace these Terms at any time. We will notify users of any significant changes through the Website or App. Your continued use of the Website or App following the posting of changes constitutes acceptance of those changes.
                    <br/>
                    <br/>
                    <b>3. User Registration</b>
                    <br/>
                    3.1. To access certain features of the Website or App, you may be required to register for an account. You must provide accurate and complete information during the registration process and keep your account information up-to-date.
                    <br/>
                    3.2. You are responsible for maintaining the security of your account login information, and Klued Skin Care Products Trading cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
                    <br/>
                    <br/>
                    <b>4. Privacy</b>
                    <br/>
                    Your use of the Website or App is governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand how we collect, use, and disclose your information.
                    <br/>
                    <br/>
                    <b>5. Content and Intellectual Property</b>
                    <br/>
                        5.1. All content on the Website or App, including text, graphics, logos, images, and software, is the property of Klued Skin Care Products Trading and is protected by intellectual property laws.
                        <br/>
                        5.2. You may not reproduce, distribute, modify, or otherwise use any content from the Website or App without Klued Skin Care Products Trading's prior written consent.
                        <br/>
                    <br/>
                    <b>6. User Conduct</b>
                    <br/>
                            6.1. You agree not to use the Website or App for any unlawful purpose or in violation of these Terms.
                            <br/>
                            6.2. You agree not to engage in any activity that could interfere with the operation of the Website or App, including but not limited to hacking, scraping, or transmitting viruses or malware.
                            <br/>
                            <br/>
                    <b>7. Termination</b>
                    <br/>
                    Klued Skin Care Products Trading reserves the right to terminate or suspend your access to the Website or App for any reason, including violations of these Terms.
                    <br/>
                    <br/>
                    <b>8. Disclaimer of Warranties</b>
                    <br/>
                    The Website and App are provided "as is" and without warranties of any kind, whether express or implied. Klued Skin Care Products Trading disclaims all warranties, including but not limited to, implied warranties of merchantability and fitness for a particular purpose.
                    <br/>
                    <br/>
                    <b>9. Limitation of Liability</b>
                    <br/>
                    To the extent permitted by law, Klued Skin Care Products Trading shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your use of the Website or App.
                    <br/>
                    <br/>
                    <b>10. Governing Law</b>
                    <br/>
                    These Terms are governed by and construed in accordance with the laws of the Philippines, without regard to its conflict of law principles.
                    <br/>
                    <br/>
                    <b>11. Contact Information</b>
                    <br/>
                    If you have any questions or concerns about these Terms, please contact us at hello@kluedskincare.com.
                </p>
            </div>

            <Footer/>
        </>
    )
}
