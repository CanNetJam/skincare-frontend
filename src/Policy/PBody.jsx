import React, { useState } from 'react';
import PSideBar from './PSideBar';
import Loitering from './Loitering';
import ProgressiveCorrective from './ProgressiveCorrective';
import SafeguardPremises from './SafeguardPremises';
import SocialMedia from './SocialMedia';
import StreamLineCommunication from './StreamLineCommunication';
import Confidentiality from './Confidentiality';
import CriticalWorkDay from './CriticalWorkDay';
import DressCode from './DressCode';
import KPI from './KPI';
import Discipline from './Discipline';
import Attendance from './Attendance';
import WorkplaceDecorum1 from './WorkplaceDecorum1';
import WorkplaceDecorum2 from './WorkplaceDecorum2';
import Fragile from './Fragile';

export default function PBody({openMenu, setOpenMenu, openTab}) {
    const [ openLink, setOpenLink ] = useState("Loitering")

    return (
        <div className='flex h-full w-full'>
            <PSideBar openMenu={openMenu} setOpenMenu={setOpenMenu} openTab={openTab} openLink={openLink} setOpenLink={setOpenLink}/>
            
            {openLink==="Loitering" && (
                <Loitering/>
            )}
            {openLink==="Progressive Corrective" && (
                <ProgressiveCorrective/>
            )}
            {openLink==="Safeguard Premises" && (
                <SafeguardPremises/>
            )}
            {openLink==="Social Media Policy" && (
                <SocialMedia/>
            )}
            {openLink==="Streaming Line Communication" && (
                <StreamLineCommunication/>
            )}
            {openLink==="Confidentiality" && (
                <Confidentiality/>
            )}
            {openLink==="Critical Work Day" && (
                <CriticalWorkDay/>
            )}
            {openLink==="Dress Code" && (
                <DressCode/>
            )}
            {openLink==="KPI New Hire" && (
                <KPI/>
            )}
            {openLink==="Fragile" && (
                <Fragile/>
            )}

            {openLink==="Code of Discipline" && (
                <Discipline/>
            )}
            {openLink==="Attendance & Punctuality" && (
                <Attendance/>
            )}
            {openLink==="Work Place Decorum 1" && (
                <WorkplaceDecorum1/>
            )}
            {openLink==="Work Place Decorum 2" && (
                <WorkplaceDecorum2/>
            )}
        </div>
    )
}
