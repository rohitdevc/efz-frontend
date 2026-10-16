"use client"

import Image from "next/image"

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

import { Project, ProjectDeveloperIntroduction } from "@/types/api";

import { useState, useEffect } from "react";
import nl2br from "nl2br";
import parser from 'html-react-parser';

import FloatingLogo from "@/components/common/FloatingLogo";

type Props = {
    introduction: ProjectDeveloperIntroduction
    projects: Project[]
}

export default function ProjectDeveloperPage({
    introduction,
    projects
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
        <main style={{
            marginTop: `${headerHeight}px`,
            marginBottom: `${footerHeight}px`,
            minHeight: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`
        }}>
           <section className="bg-black text-white px-5 sm:px-10 md:px-15 lg:px-20 lg:pl-[20%] xl:pl-[30%] py-10 flex flex-col gap-10">
                <Image className="w-20 md:w-25" src={`${basePath}/images/panchshil-logo.jpg`} width={143} height={143} alt="Panchshil Logo" />
                <p className="text-sm leading-6">{parser(nl2br(introduction.introduction_description))}</p>
            </section>
            {
                projects && projects.length > 0 && projects.map((project, key) => (
                    <section key={key} className="w-full h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${project.banner_image_url})`}} title={project.project_name}>
                        <Image src={project.project_logo_url} alt={project.project_name} width={276} height={61} className="pt-10" />
                    </section>
                ))
            }
            <FloatingLogo />
        </main>
        <Footer />
        </>
    )
}