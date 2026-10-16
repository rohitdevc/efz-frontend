"use client"

import Image from "next/image"

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

import { Developments } from "@/types/api";

import { useState, useEffect } from "react";

import nl2br from "nl2br";
import parser from 'html-react-parser';

import FloatingLogo from "@/components/common/FloatingLogo";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

type Props = {
    project: Developments
}

export default function ProjectPage({
    project
}: Props) {
    const basePath = process.env.NEXT_PUBLIC_PATH!.replace(/\/$/, "");

    const [galleryLBOpen, setGalleryLBOpen] = useState(false);
    const [galleryLBIndex, setGalleryLBIndex] = useState(0);

    const [plansLBOpen, setPlansLBOpen] = useState(false);
    const [plansLBIndex, setPlansLBIndex] = useState(0);

    const galleryLBSlides = project.galleries_data?.map((item) => ({
        src: item.gallery_image_url,
        alt: item.gallery_name,
        description: item.gallery_name
    }));

    const plansLBSlides = project.floor_plans_data?.map((item) => ({
        src: item.floor_plan_image_url,
        alt: item.floor_plan_name,
        description: item.floor_plan_name
    }));

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
            <section className="w-full relative" style={{height: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`}}>
                <video poster={project.banner_image_url} title={project.project_name} className="object-cover w-full h-full" autoPlay muted loop>
                    <source src={project.banner_video_url}></source>
                </video>
                <h1 className="bg-black/70 text-white text-lg absolute left-0 bottom-10 p-1">{project.project_name}</h1>
            </section>
            {
                project.introduction_caption && project.introduction_description && (
                <section className="bg-black text-white px-5 sm:px-10 md:px-15 lg:px-20 lg:pl-[20%] xl:pl-[30%] py-20 flex flex-col gap-10" id="overview">
                    <h2 className="uppercase text-2xl text-[#faaa31]">{project.introduction_caption}</h2>
                    <div className="text-sm leading-6 flex flex-col gap-5">{parser(nl2br(project.introduction_description))}</div>
                </section>
            )
            }
            {
                project.summaries_data && project.summaries_data.length > 0 && (
                    <section className="bg-[#545454] text-white px-5 sm:px-10 md:px-15 lg:px-20 lg:pl-[20%] xl:pl-[30%] py-20 flex flex-col gap-10" id="summary">
                        <div className="flex flex-col gap-10">
                            <h2 className="uppercase text-2xl text-[#faaa31]">{project.summary_caption}</h2>
                            <ul className="flex flex-col gap-3 text-sm">
                                {
                                    project.summaries_data.map((summary, key) => (
                                        <li key={key} className="flex">
                                            <span className="w-40 shrink-0">{summary.summary_name}</span>
                                            <span>: </span>
                                            <span className="ml-2 flex-1">{parser(nl2br(summary.summary_description))}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </section>
                )
            }
            {
                project.specifications_data && project.specifications_data.length > 0 && (
                    <section className="bg-[#585858] text-white px-5 sm:px-10 md:px-15 lg:px-20 lg:pl-[20%] xl:pl-[30%] py-20 flex flex-col gap-10" id="technical-specifications">
                        <div className="flex flex-col gap-10">
                            <h2 className="uppercase text-2xl text-[#faaa31]">Technical Specifications</h2>
                            <ul className="flex flex-col gap-3 text-sm">
                                {
                                    project.specifications_data.map((specification, key) => (
                                        <li key={key} className="flex">
                                            <span className="w-40 shrink-0">{specification.specification_name}</span>
                                            <span>: </span>
                                            <span className="ml-2 flex-1">{parser(nl2br(specification.specification_description))}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </section>
                )
            }
            {
                project.clients_data && project.clients_data.length > 0 && (
                    <section className="bg-[#585858] text-white px-5 sm:px-10 md:px-15 lg:px-20 lg:pl-[20%] xl:pl-[30%] py-20 flex flex-col gap-10" id="clients">
                        <div className="flex flex-col gap-10">
                            <h2 className="uppercase text-2xl text-[#faaa31]">Clientele</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
                                {
                                    project.clients_data.map((client, key) => (
                                        <Image key={key} src={client.client_logo_url} alt={client.client_name} width={190} height={75} className="w-full" />
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                )
            }
            {
                project.business_support_services_data && project.business_support_services_data.length > 0 && (
                    <section className="bg-[#818286] text-white px-5 sm:px-10 md:px-15 lg:px-20 lg:pl-[20%] xl:pl-[30%] py-20 flex flex-col gap-10" id="business-support-services">
                        <div className="flex flex-col gap-10">
                            <h2 className="uppercase text-2xl text-[#faaa31]">Business Support Services</h2>
                            <ul className="flex flex-col gap-3 text-sm">
                                {
                                    project.business_support_services_data.map((service, key) => (
                                        <li key={key} className="flex">
                                            <span className="w-40 shrink-0">{service.business_support_service_name}</span>
                                            <span>: </span>
                                            <span className="ml-2 flex-1">{parser(nl2br(service.business_support_service_description))}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </section>
                )
            }
            {
                project.food_court_support_services_data && project.food_court_support_services_data.length > 0 && (
                    <section className="bg-[#8b8b8e] text-white px-5 sm:px-10 md:px-15 lg:px-20 lg:pl-[20%] xl:pl-[30%] py-20 flex flex-col gap-10" id="food-court-support-services">
                        <div className="flex flex-col gap-10">
                            <h2 className="uppercase text-2xl text-[#faaa31]">Food Court Support Services</h2>
                            <ul className="flex flex-col gap-3 text-sm list-disc list-inside">
                                {
                                    project.food_court_support_services_data.map((service, key) => (
                                        <li key={key}>
                                            <span className="w-40 shrink-0">{service.food_court_support_service_name}</span>
                                            <span>: </span>
                                            <span className="ml-2 flex-1">{parser(nl2br(service.food_court_support_service_description))}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </section>
                )
            }
            {
                project.floor_plans_data && project.floor_plans_data.length > 0 && (
                <section className="bg-[#616161] text-white px-5 sm:px-10 md:px-15 lg:px-20 lg:pl-[20%] xl:pl-[30%] py-20 flex flex-col gap-10" id="plans">
                    <h2 className="uppercase text-2xl text-[#faaa31]">Floor Plans</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {
                            project.floor_plans_data.map((floor_plan, key) => (
                                <div className="flex flex-col items-center gap-1 cursor-pointer" key={key} onClick={() => {
                                        setPlansLBIndex(key);
                                        setPlansLBOpen(true);
                                    }}>
                                    <Image src={floor_plan.floor_plan_image_url} alt={floor_plan.floor_plan_name} width={600} height={600} />
                                    <h3 className="text-sm">{floor_plan.floor_plan_name}</h3>
                                </div>
                            ))
                        }
                        <Lightbox
                            open={plansLBOpen}
                            close={() => setPlansLBOpen(false)}
                            index={plansLBIndex}
                            slides={plansLBSlides}
                            captions={{
                                descriptionTextAlign: "center",
                                descriptionMaxLines: 3,
                            }}
                            plugins={[Zoom, Thumbnails, Captions]}
                            carousel={{
                                imageFit: "contain"
                            }}
                            thumbnails={{
                                position: "bottom"
                            }}
                        />
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