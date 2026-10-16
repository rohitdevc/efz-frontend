"use client"

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

import { TfiClose } from "react-icons/tfi";

export default function Footer() {
    const basePath = process.env.NEXT_PUBLIC_PATH!.replace(/\/$/, "");

    const [showDisclaimer, updateShowDisclaimer] = useState(false);

    return (
        <>
        <footer className="fixed bottom-0 w-full z-5 bg-white flex items-center justify-between px-2 sm:px-10 md:px-15 lg:px-20 xl:px-25 2xl:px-40 py-2 uppercase text-[10px] md:text-xs">
            <div className="px-5 py-2 w-[110px]">
                <Image src={`${basePath}/images/eon.png`} alt="EON logo" width={155} height={67} className="object-contain w-full h-full" />
            </div>
            <div className="flex flex-col gap-2 md:gap-3 text-[#58595b] font-bold text-right">
                <ul className="flex gap-2 sm:gap-3 justify-end">
                    <li>
                        <Link href={`${basePath}/policy`}>Policy</Link>
                    </li>
                    <li>|</li>
                    <li>
                        <Link href={`${basePath}/newsletters`}>Newsletters</Link>
                    </li>
                    <li>|</li>
                    <li onClick={() => updateShowDisclaimer(true)}>
                        <span className="cursor-pointer">Disclaimer</span>
                    </li>
                </ul>
                <p>COPYRIGHT: EON KHARADI INFRASTRUCTURE PVT. LTD. {new Date().getFullYear()}</p>
            </div>
        </footer>
        <section className={`fixed top-0 left-0 h-screen overflow-y-auto w-full p-5 md:p-10 transition-all duration-300 origin-top text-black bg-black/50 z-5 ${showDisclaimer ? 'scale-y-100' : 'scale-y-0'}`}>
            <div className="bg-white relative max-w-screen md:w-2xl lg:w-3xl mx-auto py-10 px-5 md:px-10 flex flex-col gap-5">
                <TfiClose size={20} className="absolute right-5 top-5 cursor-pointer" onClick={() => updateShowDisclaimer(false)}/>
                <h2 className="uppercase text-3xl text-center">Disclaimer</h2>
                <div className="text-sm flex flex-col gap-4">
                    <p>Eon Kharadi Infrastructure Pvt. Ltd. makes all reasonable efforts to include accurate and up-to-date information in this presentation. However, EKIPL does not make any warranties or representations expressed or implied regarding the timeliness, accuracy, or completeness of the information contained or referred to in this presentation. Therefore, any advice or information received via this presentation should not be acted upon without consulting our sales team. In this presentation, references to any products, features, or services are to be read as statements of fact and not as their endorsement or recommendation by EKIPL.</p>
                    <p>It is the constant endeavour of EKIPL to enhance the quality of the project. Hence, EKIPL reserves the right to make any changes in any way, at any time and for any reason, without prior notice, to the contents and information on this, including materials, equipment, specifications, prices, and/or availability. It is clearly understood that dimensions and floor plan layouts are approximate, and Building illustrations are design concepts only. Images are only for illustrative purposes, and views rendered are representational and not intended to reflect actual views.</p>
                    <p>Any use of this presentation and any legal dispute arising in connection therewith shall exclusively be governed by Indian law, and all arbitration shall fall within the jurisdiction of Pune Courts.</p>
                </div>
            </div>
        </section>
        </>
    )
}