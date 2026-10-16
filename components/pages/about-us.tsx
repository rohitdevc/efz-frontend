"use client"

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

import { AboutIntroduction } from "@/types/api";

import { useState, useEffect } from "react";
import nl2br from "nl2br";
import parser from 'html-react-parser';

import FloatingLogo from "@/components/common/FloatingLogo";

type Props = {
    introduction: AboutIntroduction
}

export default function AboutUsPage({
    introduction
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
        <main style={{
            marginTop: `${headerHeight}px`,
            marginBottom: `${footerHeight}px`,
            minHeight: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`
        }}>
            <section className="bg-black text-white px-5 sm:px-10 md:px-15 lg:px-20 lg:pl-[20%] xl:pl-[30%] py-20 flex flex-col gap-10">
                <h1 className="uppercase text-2xl text-[#faaa31]">{introduction.introduction_caption}</h1>
                <p className="text-sm leading-6">{parser(nl2br(introduction.introduction_description))}</p>
            </section>
            <section className="bg-[#818286] text-white px-5 sm:px-10 md:px-15 lg:px-20 lg:pl-[20%] xl:pl-[30%] py-20 flex flex-col gap-10">
                <h2 className="uppercase text-2xl text-[#faaa31]">Location</h2>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7564.930172728809!2d73.9489914!3d18.5530595!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3c56c715b71%3A0xf26b57648efd5ec2!2sEON%20Free%20Zone%2C%20Kharadi%2C%20Pune%2C%20Maharashtra%20411014!5e0!3m2!1sen!2sin!4v1617270132463!5m2!1sen!2sin" className="h-100 w-full xl:w-[85%]"></iframe>
            </section>
            <FloatingLogo />
        </main>
        <Footer />
        </>
    )
}