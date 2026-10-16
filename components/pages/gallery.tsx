"use client"

import Image from "next/image"

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from "swiper/modules"

import "swiper/css";
import "swiper/css/navigation";

import { MdArrowBackIos, MdArrowForwardIos, MdOutlinePlayArrow } from "react-icons/md";

import YTVideoPopUp, { YTVideoPopupHandle } from "@/components/common/YouTubeVideo";

import { Banner, GalleryImage, GalleryVideo } from "@/types/api";

import { useState, useEffect, useRef } from "react";

import FloatingLogo from "@/components/common/FloatingLogo";

import CommonBanner from "@/components/common/CommonBanner";

type Props = {
    banner: Banner
    images: GalleryImage[]
    videos: GalleryVideo[]
}

export default function GalleryPage({
    banner,
    images,
    videos
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

    const image_categories: string[] = [];
    const video_categories: string[] = [];

    images.forEach((image) => {
        if(!image_categories.includes(image.category_name)) {
            image_categories.push(image.category_name)
        }
    })

    videos.forEach((video) => {
        if(!video_categories.includes(video.category_name)) {
            video_categories.push(video.category_name)
        }
    })

    const [activeImageCategory, updateActiveImageCategory] = useState(0);
    const [activeVideoCategory, updateActiveVideoCategory] = useState(0);

    const videoPopupRef = useRef<YTVideoPopupHandle>(null);

    return (
        <>
        <Header />
        <main className="bg-[#545454]" style={{
            marginTop: `${headerHeight}px`,
            marginBottom: `${footerHeight}px`,
            minHeight: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`
        }}>
            <CommonBanner page_name="Gallery" banner={banner} />
            <section className="px-5 sm:px-10 lg:px-15 xl:px-25 2xl:px-50 py-20 flex flex-col gap-10 md:gap-20 text-white">
                {
                    images && images.length > 0 && (
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col sm:flex-row justify-between">
                            <h2 className="uppercase text-[#faaa31] text-3xl">Images</h2>
                            <ul className="flex gap-3 md:gap-5 text-base md:text-lg items-center justify-end">
                                {
                                    image_categories.map((image_category, key) => (
                                        <>
                                        <li key={key} className={`transition-all duration-300 ${activeImageCategory === key ? 'text-[#faaa31]' : ''}`} onClick={() => updateActiveImageCategory(key)}>{image_category}</li>
                                        {
                                            (key + 1) !== image_categories.length && (
                                                <li className="text-4xl text-[#faaa31]">|</li>
                                            )
                                        }
                                        </>
                                    ))
                                }
                            </ul>
                        </div>
                        {
                            images[activeImageCategory].galleries_data && images[activeImageCategory].galleries_data.length > 0 && (
                            <div className="relative w-full">
                                <Swiper
                                modules={[Navigation, Autoplay]}
                                slidesPerView={1}
                                spaceBetween={0}
                                speed={800}
                                loop={true}
                                autoplay={{delay: 5000, pauseOnMouseEnter: false}}
                                navigation={{prevEl: '.image-slider-prev', nextEl: '.image-slider-next'}}
                                watchOverflow={true}
                                onLock={() => {
                                    document.querySelectorAll(".image-slider-prev, .image-slider-next")
                                        .forEach((el) => el.classList.add("hidden"));
                                }}
                                onUnlock={() => {
                                    document.querySelectorAll(".image-slider-prev, .image-slider-next")
                                        .forEach((el) => el.classList.remove("hidden"));
                                }}
                                breakpoints={{640: {slidesPerView: 2, spaceBetween: 30}, 1024: {slidesPerView: 3, spaceBetween: 30}, 1280: {slidesPerView: 4, spaceBetween: 30}}}
                                className="w-full"
                                >
                                    {
                                        images[activeImageCategory].galleries_data.map((image, key) => (
                                            <SwiperSlide key={key} className="!flex flex-col gap-3">
                                                <Image src={image.gallery_image_url} alt={image.gallery_name} width={1920} height={1080} priority={key === 0} className="w-full h-full object-cover object-center" />
                                                <h3>{image.gallery_name}</h3>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                                <button className="image-slider-prev bg-black cursor-pointer flex justify-center items-center w-10 h-10 absolute -left-3 top-[40%] -translate-y-1/2 z-3" aria-label="Previous Slide">
                                    <MdArrowBackIos size={30} className="text-[#faaa31]" />
                                </button>
                                <button className="image-slider-next bg-black cursor-pointer flex justify-center items-center w-10 h-10 absolute -right-3 top-[40%] -translate-y-1/2 z-3" aria-label="Next Slide">
                                    <MdArrowForwardIos size={30} className="text-[#faaa31]" />
                                </button>
                            </div>
                            )
                        }
                    </div>
                )
                }
                {
                    videos && videos.length > 0 && (
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col sm:flex-row justify-between">
                            <h2 className="uppercase text-[#faaa31] text-3xl">Videos</h2>
                            <ul className="flex gap-3 md:gap-5 text-base md:text-lg items-center justify-end">
                                {
                                    video_categories.map((video_category, key) => (
                                        <>
                                        <li key={key} className={`transition-all duration-300 ${activeVideoCategory === key ? 'text-[#faaa31]' : ''}`} onClick={() => updateActiveVideoCategory(key)}>{video_category}</li>
                                        {
                                            (key + 1) !== video_categories.length && (
                                                <li className="text-4xl text-[#faaa31]">|</li>
                                            )
                                        }
                                        </>
                                    ))
                                }
                            </ul>
                        </div>
                        {
                            videos[activeVideoCategory].galleries_data && videos[activeVideoCategory].galleries_data.length > 0 && (
                            <div className="relative w-full">
                                <Swiper
                                modules={[Navigation, Autoplay]}
                                slidesPerView={1}
                                spaceBetween={0}
                                speed={800}
                                loop={true}
                                autoplay={{delay: 5000, pauseOnMouseEnter: false}}
                                navigation={{prevEl: '.video-slider-prev', nextEl: '.video-slider-next'}}
                                watchOverflow={true}
                                onLock={() => {
                                    document.querySelectorAll(".video-slider-prev, .video-slider-next")
                                        .forEach((el) => el.classList.add("hidden"));
                                }}
                                onUnlock={() => {
                                    document.querySelectorAll(".video-slider-prev, .video-slider-next")
                                        .forEach((el) => el.classList.remove("hidden"));
                                }}
                                breakpoints={{640: {slidesPerView: 2, spaceBetween: 30}, 1024: {slidesPerView: 3, spaceBetween: 30}, 1280: {slidesPerView: 4, spaceBetween: 30}}}
                                className="w-full"
                                >
                                    {
                                        videos[activeVideoCategory].galleries_data.map((video, key) => (
                                            <SwiperSlide key={key} className="!flex flex-col gap-3 cursor-pointer" onClick={() => videoPopupRef.current?.open(video.gallery_embed_url)}>
                                                <div className="relative">
                                                    <Image src={video.gallery_image_url} alt={video.gallery_name} width={1920} height={1080} priority={key === 0} className="w-full h-full object-cover object-center" />
                                                    <MdOutlinePlayArrow className="text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                                </div>
                                                <h3>{video.gallery_name}</h3>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                                <button className="video-slider-prev bg-black cursor-pointer flex justify-center items-center w-10 h-10 absolute -left-3 top-[40%] -translate-y-1/2 z-3" aria-label="Previous Slide">
                                    <MdArrowBackIos size={30} className="text-[#faaa31]" />
                                </button>
                                <button className="video-slider-next bg-black cursor-pointer flex justify-center items-center w-10 h-10 absolute -right-3 top-[40%] -translate-y-1/2 z-3" aria-label="Next Slide">
                                    <MdArrowForwardIos size={30} className="text-[#faaa31]" />
                                </button>
                            </div>
                            )
                        }
                    </div>
                )
                }
            </section>
            <YTVideoPopUp ref={videoPopupRef} />
            <FloatingLogo />
        </main>
        <Footer />
        </>
    )
}