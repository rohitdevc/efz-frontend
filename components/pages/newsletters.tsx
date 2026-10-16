"use client"

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

import { Banner, Newsletter } from "@/types/api";

import { useState, useEffect } from "react";
import { FaLink } from "react-icons/fa";
import Link from "next/link";
import CommonBanner from "@/components/common/CommonBanner";
import Image from "next/image";

import FloatingLogo from "@/components/common/FloatingLogo";

type Props = {
    banner: Banner
    newsletters: Newsletter[]
}

export default function NewsletterPage({
    banner,
    newsletters
}: Props) {
    const basePath = process.env.NEXT_PUBLIC_PATH!.replace(/\/$/, "");

    const [headerHeight, setHeaderHeight] = useState(0);
    const [footerHeight, setFooterHeight] = useState(0);

    useEffect(() => {
        const header = document.querySelector("header");
        const footer = document.querySelector("footer");

        if (!header || !footer) return;

        const updateHeights = () => {
            setHeaderHeight(header.getBoundingClientRect().height);
            setFooterHeight(footer.getBoundingClientRect().height);
        };

        const observer = new ResizeObserver(updateHeights);

        observer.observe(header);
        observer.observe(footer);
        updateHeights();

        return () => observer.disconnect();
    }, []);

    return (
        <>
        <Header />
        <main className="bg-black" style={{
            marginTop: `${headerHeight}px`,
            marginBottom: `${footerHeight}px`,
            minHeight: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`
        }}>
            <CommonBanner page_name="Newsletters" banner={banner} />
            {
                newsletters && newsletters.length > 0 && (
                <section className="bg-[#545454] text-white px-5 sm:px-10 md:px-15 lg:px-20 lg:pl-[20%] xl:pl-[30%] py-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {
                            newsletters.map((newsletter, key) => (
                                <div className="flex flex-col gap-5 group" key={key}>
                                    <div className="relative">
                                        <Image src={newsletter.newsletter_thumbnail_url} alt={newsletter.newsletter_name} width={300} height={425} className="w-full" />
                                        <Link className="absolute inset-0 left-0 bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 flex justify-center items-center" href={newsletter.newsletter_pdf_url} target="_blank">
                                            <div className="bg-[#faaa31] rounded-full w-15 h-15 flex justify-center items-center">
                                                <FaLink size={25} className="text-white"/>
                                            </div>
                                        </Link>
                                    </div>
                                    <h2 className="text-lg">{newsletter.newsletter_name}</h2>
                                </div>
                            ))
                        }
                    </div>
                </section>
            )
            }
            <FloatingLogo />
        </main>
        <Footer />
        </>
    )
}