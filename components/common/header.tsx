"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowDropdown, IoIosMenu } from "react-icons/io";

export default function Header() {
    const basePath = process.env.NEXT_PUBLIC_PATH!.replace(/\/$/, "");

    const [menuState, updateMenuState] = useState(false);

    const nav_options = [
        {
            nav_name: 'About',
            nav_link: '/about-us',
            nav_colour_code: '#58595b',
            nav_sub_links: []
        },
        {
            nav_name: 'Phase I',
            nav_link: '/eon-free-zone-phase-i',
            nav_colour_code: '#818286',
            nav_sub_links: [
                {
                    nav_name: 'Overview',
                    nav_link: '/eon-free-zone-phase-i#overview',
                },
                {
                    nav_name: 'Summary',
                    nav_link: '/eon-free-zone-phase-i#summary',
                },
                {
                    nav_name: 'Technical Specifications',
                    nav_link: '/eon-free-zone-phase-i#technical-specifications',
                },
                {
                    nav_name: 'Clientele',
                    nav_link: '/eon-free-zone-phase-i#clients',
                },
                {
                    nav_name: 'Business Support Services',
                    nav_link: '/eon-free-zone-phase-i#business-support-services',
                },
                {
                    nav_name: 'Food Court Support Services',
                    nav_link: '/eon-free-zone-phase-i#food-court-support-services',
                },
                {
                    nav_name: 'Floor Plans',
                    nav_link: '/eon-free-zone-phase-i#plans',
                }
            ]
        },
        {
            nav_name: 'Phase II',
            nav_link: '/eon-free-zone-phase-ii',
            nav_colour_code: '#a8a9ad',
            nav_sub_links: [
                {
                    nav_name: 'Overview',
                    nav_link: '/eon-free-zone-phase-ii#overview',
                },
                {
                    nav_name: 'Summary',
                    nav_link: '/eon-free-zone-phase-ii#summary',
                },
                {
                    nav_name: 'Clientele',
                    nav_link: '/eon-free-zone-phase-ii#clients',
                },
                {
                    nav_name: 'Business Support Services',
                    nav_link: '/eon-free-zone-phase-ii#business-support-services',
                },
                {
                    nav_name: 'Food Court Support Services',
                    nav_link: '/eon-free-zone-phase-ii#food-court-support-services',
                },
                {
                    nav_name: 'Floor Plans',
                    nav_link: '/eon-free-zone-phase-ii#plans',
                }
            ]
        },
        {
            nav_name: 'Gallery',
            nav_link: '/gallery',
            nav_colour_code: '#faaa31',
            nav_sub_links: []
        },
        {
            nav_name: 'Project Developer',
            nav_link: '/project-developer',
            nav_colour_code: '#f58634',
            nav_sub_links: []
        },
        {
            nav_name: 'Contact',
            nav_link: '/contact-us',
            nav_colour_code: '#f16601',
            nav_sub_links: []
        },
    ]

    const [activeFirstNav, updateActiveFirstNav] = useState(-1);

    const updateMobileMenu = (key: number) => {
        if(activeFirstNav >= 0) {
            updateActiveFirstNav(-1)
        } else {
            updateActiveFirstNav(key)
        }
    }

    return (
        <header className="fixed top-0 w-full z-5 bg-white">
            <div className="relative">
                <div className="flex items-center justify-between px-5 sm:px-10 md:px-5 lg:px-15 xl:px-25 2xl:px-40">
                    <Link href="/" className="w-[100px] md:w-[140px]">
                        <Image src={`${basePath}/images/efz-logo.png`} alt="EFZ logo" width={155} height={60} className="object-contain w-full h-full" loading="eager" />
                    </Link>
                    {
                        nav_options && nav_options.length > 0 && (
                            <ul className="hidden md:flex text-white uppercase text-xs" onMouseLeave={() => {updateActiveFirstNav(-1); } }>
                                {
                                    nav_options.map((nav_option, key) => (
                                        <li key={key} className="relative">
                                            {
                                                nav_option.nav_link ? (
                                                    <Link className="py-3 md:px-3 lg:px-6 xl:px-10" href={nav_option.nav_link} style={{backgroundColor: `${nav_option.nav_colour_code}`}} onMouseEnter={() => { updateActiveFirstNav(key); }}>{nav_option.nav_name}</Link>
                                                ) : (
                                                    <span className="cursor-pointer py-3 md:px-3 lg:px-6 xl:px-10" style={{backgroundColor: `${nav_option.nav_colour_code}`}} onMouseEnter={() => { updateActiveFirstNav(key); }}>{nav_option.nav_name}</span>
                                                )
                                            }
                                            {
                                                nav_option.nav_sub_links && nav_option.nav_sub_links.length > 0 && (
                                                    <ul className={`absolute left-0 top-4 flex flex-col mt-3 text-[10px] transition-all duration-200 origin-top ${activeFirstNav === key ? 'scale-y-100' : 'scale-y-0'}`} onMouseEnter={() => updateActiveFirstNav(key)}>
                                                        {
                                                            nav_option.nav_sub_links.map((nav_sub_link, nav_sub_link_key) => (
                                                                <li key={nav_sub_link_key} className="relative border-t border-black">
                                                                    <Link className="py-2 md:px-3 lg:px-6 xl:px-10 block whitespace-nowrap" href={nav_sub_link.nav_link} style={{backgroundColor: `${nav_option.nav_colour_code}`}} >{nav_sub_link.nav_name}</Link>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                    <IoIosMenu className="md:hidden text-black cursor-pointer" size={40} onClick={() => { updateMenuState(!menuState) }} />
                </div>
            {
                nav_options && nav_options.length > 0 && (
                    <ul className={`absolute top-22 md:hidden w-full flex-col justify-center items-center z-2 text-white uppercase text-xs transition-all duration-300 origin-top ${menuState ? 'scale-y-100' : 'scale-y-0'}`}>
                        {
                            nav_options.map((nav_option, key) => (
                                <li key={key} className="relative border-t border-black">
                                    {
                                        nav_option.nav_link ? (
                                            <Link className="py-2 flex justify-center items-center w-full" href={nav_option.nav_link} style={{backgroundColor: `${nav_option.nav_colour_code}`}}>{nav_option.nav_name}</Link>
                                        ) : (
                                            <span className="cursor-pointer py-2 flex justify-center items-center w-full gap-1" style={{backgroundColor: `${nav_option.nav_colour_code}`}} onClick={() => { updateMobileMenu(key); }}>{nav_option.nav_name} <IoMdArrowDropdown size={20} /></span>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            </div>
        </header>
    )
}