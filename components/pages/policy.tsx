"use client"

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

import { Policy } from "@/types/api";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { FaFilePdf } from "react-icons/fa6";
import FloatingLogo from "@/components/common/FloatingLogo";

type Props = {
    policies: Policy[]
}

export default function PolicyPage({
    policies
}: Props) {
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
        <main className="bg-black relative" style={{
            marginTop: `${headerHeight}px`,
            marginBottom: `${footerHeight}px`,
            minHeight: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`
        }}>
            <section className="text-white px-5 sm:px-10 md:px-15 lg:px-20 lg:pl-[20%] xl:pl-[30%] py-10 flex flex-col gap-10">
                <h1 className="text-2xl uppercase text-[#faaa31]">Policy</h1>
                {
                    policies && policies.length > 0 && policies.map((investor, key) => (
                        <div key={key} className="text-sm flex flex-col gap-3">
                            <h2 key={key} className="font-bold uppercase">{investor.category_name}</h2>
                            {
                                investor.reports_data && investor.reports_data.length > 0 && (
                                    <ul className="flex flex-col gap-2">
                                        {
                                            investor.reports_data.map((reports, sub_key) => (
                                                <li key={sub_key}>
                                                    <Link href={reports.report_pdf_url} target="_blank" className="flex gap-2">
                                                    <FaFilePdf size={17} />
                                                    <span>{reports.report_name}</span>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        </div>
                    ))
                }
            </section>
            <FloatingLogo />
        </main>
        <Footer />
        </>
    )
}