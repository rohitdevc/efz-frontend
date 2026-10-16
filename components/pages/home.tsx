"use client"

import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from "swiper/modules"

import "swiper/css";
import "swiper/css/navigation";

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

import FloatingLogo from "@/components/common/FloatingLogo";

import { HomeSlider } from "@/types/api";

import { useState, useEffect } from "react";

type Props = {
    sliders: HomeSlider[]
}

export default function HomePage({sliders}: Props) {
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
        <div>
        <Header />
        <main
        style={{
            marginTop: `${headerHeight}px`,
            marginBottom: `${footerHeight}px`,
            minHeight: `calc(100dvh - ${headerHeight}px - ${footerHeight}px)`
        }}>
            {
                sliders && sliders.length > 0 && (
                <section className="relative w-full overflow-hidden">
                    <Swiper
                    modules={[Navigation, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={0}
                    speed={800}
                    loop={true}
                    autoplay={{delay: 5000, pauseOnMouseEnter: false}}
                    navigation={{prevEl: '.master-slider-prev', nextEl: '.master-slider-next'}}
                    className="w-full overflow-hidden"
                    style={{height: `calc(100dvh - ${headerHeight}px - ${footerHeight}px)`}}
                    >
                        {
                            sliders.map((slider, key) => (
                                <SwiperSlide key={key}>
                                    <Image src={slider.slider_image_url} alt={slider.slider_caption} width={1920} height={1080} priority={key === 0} className="w-full h-full object-cover object-center" />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <button className="master-slider-prev text-white cursor-pointer absolute left-5 top-1/2 -translate-y-1/2 z-5" aria-label="Previous Slide">
                        <MdArrowBackIos size={40} className="text-[#faaa31]" />
                    </button>
                    <button className="master-slider-next text-white cursor-pointer absolute right-5 top-1/2 -translate-y-1/2 z-5" aria-label="Next Slide">
                        <MdArrowForwardIos size={40} className="text-[#faaa31]" />
                    </button>
                </section>
                )
            }
            <FloatingLogo />
        </main>
        <Footer />
        </div>
    )
}