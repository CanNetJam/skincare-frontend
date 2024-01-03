import React, { useState } from 'react';
import KBSideBar from './KBSideBar';
import Default from './Default';
import Waybills from './Waybills';
import MassWayBills from './MassWayBills';
import ProductPackaging from './ProductPackaging';
import PackagingRules from './PackagingRules';
import ProductQuality from './ProductQuality';
import ProductInventory from './ProductInventory';
import ProductsToShip from './ProductsToShip';
import CustomerSupport from './CustomerSupport';
import UndelivredProducts from './UndeliveredProducts';
import CustomerReturnRefund from './CustomerReturnRefund';
import ContentMetrics from './ContentMetrics';
import SocialMediaChecking from './SocialMediaChecking';
import LiveSessions from './LiveSessions'

export default function KBBody({openMenu, setOpenMenu, openTab}) {
    const [ openLink, setOpenLink ] = useState("Default")
   
    return (
        <div className='flex h-full w-full'>
            {openTab!==undefined ?
                <KBSideBar openMenu={openMenu} setOpenMenu={setOpenMenu} openTab={openTab} openLink={openLink} setOpenLink={setOpenLink}/>
            :null}

            {openLink==="Default" && (
                <Default/>
            )}
            {openLink==="Waybills" && (
                <Waybills/>
            )}
            {openLink==="Mass Printing Waybills" && (
                <MassWayBills />
            )}
            {openLink==="Product Packaging" && (
                <ProductPackaging />
            )}
            {openLink==="Packaging Rules" && (
                <PackagingRules />
            )}
            {openLink==="Product Quality" && (
                <ProductQuality />
            )}
            {openLink==="Product Inventory" && (
                <ProductInventory />
            )}
            {openLink==="Floating Parcel (Product to Ship)" && (
                <ProductsToShip />
            )}

            {openLink==="Customer Support" && (
                <CustomerSupport />
            )}

            {openLink==="RTS (Undelivered Products)" && (
                <UndelivredProducts />
            )}
            {openLink==="Customer Return/Refund" && (
                <CustomerReturnRefund />
            )}
            
            {openLink==="Content Metrics" && (
                <ContentMetrics />
            )}
            {openLink==="Social Media Checking" && (
                <SocialMediaChecking />
            )}
            {openLink==="Live Sessions" && (
                <LiveSessions />
            )}
        </div>
    )
}
