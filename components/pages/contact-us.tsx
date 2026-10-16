"use client"

import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

import { EnquiryFormErrors, EnquiryForm } from "@/types/forms";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import Loader from "@/components/utils/loader";

import { isEmail, isEmpty } from 'validator';

import FloatingLogo from "@/components/common/FloatingLogo";

export default function ContactUsPage() {
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

    const [showLoader, updateLoader] = useState(false);

    const [ip, setIp] = useState("");
    const [errors, setErrors] = useState<EnquiryFormErrors>({});

    const [enquiryForm, setEnquiryForm] = useState<EnquiryForm>({
        enquiry_name: '',
        enquiry_phone_number: '',
        enquiry_email_address: '',
        enquiry_company_name: '',
        enquiry_address: '',
        enquiry_message: '',
        ip_address: ip,
        referral_url: ''
    });

    useEffect(() => {
        async function getIp() {
            const res = await fetch(basePath + "/api/ip");
            const data = await res.json();
            setIp(data.ip);
        }
    
        getIp();
    }, []);

    const handleEnquiryFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setEnquiryForm(prev => ({ ...prev, [name]: value}));
        
        setErrors(prev => ({ ...prev, [name]: undefined}));
    }

    const enquiryNameRef = useRef<HTMLInputElement>(null);
    const enquiryEmailAddressRef = useRef<HTMLInputElement>(null);
    const enquiryPhoneNumberRef = useRef<HTMLInputElement>(null);
    const enquiryCompanyNameRef = useRef<HTMLInputElement>(null);
    const enquiryAddressRef = useRef<HTMLInputElement>(null);
    const enquiryMessageRef = useRef<HTMLInputElement>(null);

    const refMap: Record<string, React.RefObject<HTMLInputElement | null>> = {
        enquiry_name: enquiryNameRef,
        enquiry_email_address: enquiryEmailAddressRef,
        enquiry_phone_number: enquiryPhoneNumberRef,
        enquiry_company_name: enquiryCompanyNameRef,
        enquiry_address: enquiryAddressRef,
        enquiry_message: enquiryMessageRef
    }

    const enquiryFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isEmpty(enquiryForm.enquiry_name)) {
            setErrors({enquiry_name: 'Please enter your name'});
            enquiryNameRef.current?.focus();
            return;
        }

        if(isEmpty(enquiryForm.enquiry_email_address)) {
            setErrors({enquiry_email_address: 'Please enter your email address'});
            enquiryEmailAddressRef.current?.focus();
            return;
        } else if(!isEmail(enquiryForm.enquiry_email_address)) {
            setErrors({enquiry_email_address: 'Please enter a valid email address'});
            enquiryEmailAddressRef.current?.focus();
            return;
        }

        if(isEmpty(enquiryForm.enquiry_phone_number)) {
            setErrors({enquiry_phone_number: 'Please enter your phone number'});
            enquiryPhoneNumberRef.current?.focus();
            return;
        }

        updateLoader(true);

        await new Promise((resolve) => requestAnimationFrame(resolve));

        try {
          const payload = {
            ...enquiryForm,
            ip_address: ip,
            referral_url: window.location.href
          };

          const response = await fetch(basePath + "/api/enquiry-form", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json"
            }
          })

          if (!response.ok) {
            const err = await response.json();

            if(err.error) {
              let error_response = JSON.parse(err.error);

              if(typeof error_response === "object" && error_response !== null && !Array.isArray(error_response)) {
                error_response = Object.values(error_response);

                const [path, msg] = Object.entries(error_response[0])[0];

                const error_message = msg;
                const error_path = path;

                if(refMap[error_path]?.current) {
                  
                  refMap[error_path]?.current.focus();
                }
                setErrors({[error_path]: error_message});
              }

              return false;
            }
          }

          const data = await response.json();

          if(data.success) {
            setEnquiryForm({
                enquiry_name: '',
                enquiry_email_address: '',
                enquiry_phone_number: '',
                enquiry_company_name: '',
                enquiry_address: '',
                enquiry_message: '',
                ip_address: '',
                referral_url: window.location.href
            })

            if(!data.result) return false;

            alert('Thank You! We will contact you soon.');
          }
        } catch(error) {
          console.error(error);
        } finally {
          updateLoader(false);
        }
    }

    return (
        <>
        <Header />
        <main className="bg-black text-white px-5 sm:px-10 md:px-15 lg:px-20 lg:pl-[20%] xl:pl-[30%] " style={{
            marginTop: `${headerHeight}px`,
            marginBottom: `${footerHeight}px`,
            minHeight: `calc(100vh - ${headerHeight}px - ${footerHeight}px)`
        }}>
          <section className="py-10 flex gap-10 sm:gap-30">
            <Image className="w-20 md:w-25 h-20 md:h-25" src={`${basePath}/images/panchshil-logo.jpg`} width={143} height={143} alt="Panchshil Logo" />
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h1 className="uppercase font-bold">Corporate Office</h1>
                <p className="text-sm">Panchshil Realty<br />Tech Park One, Tower - E, 191 Yerwada,<br />Pune - 411 006. INDIA.</p>
                <span className="text-sm">Tel: <Link href="tel:+912066473200" className="text-[lightblue]">+91-20-66473200</Link></span>
                <span className="text-sm">Email: <Link href="mailto:officeparks@panchshil.com" className="text-[lightblue]">officeparks@panchshil.com</Link></span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="uppercase font-bold">Mumbai Office</h2>
                <p className="text-sm">Panchshil Realty<br />20th Floor, Express Towers, Nariman Point, Mumbai - 400021. INDIA.</p>
                <span className="text-sm">Tel: <Link href="tel:+912266473200" className="text-[lightblue]">+91-22-66863939</Link></span>
              </div>
            </div>
          </section>
          <form className="py-10 flex flex-col gap-5 text-sm" onSubmit={enquiryFormSubmit} autoComplete="off">
            <div className="flex flex-col md:flex-row items-left md:items-center">
              <label className="uppercase w-55">Name*</label>
              <div className="relative">
                <input type="text" name="enquiry_name" className="bg-white text-black w-full md:w-xs py-1 px-1 outline-none" onChange={handleEnquiryFormChange} value={enquiryForm.enquiry_name} ref={enquiryNameRef} />
                <div className="h-1">
                    <span className={`text-xs transition-all duration-200 ${errors.enquiry_name ? "opacity-100" : "opacity-0"}`}>{errors.enquiry_name}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-left md:items-center">
              <label className="uppercase w-55">Email*</label>
              <div className="relative">
                <input type="email" name="enquiry_email_address" className="bg-white text-black w-full md:w-xs py-1 px-1 outline-none" onChange={handleEnquiryFormChange} value={enquiryForm.enquiry_email_address} ref={enquiryEmailAddressRef} />
                <div className="h-1">
                    <span className={`text-xs transition-all duration-200 ${errors.enquiry_email_address ? "opacity-100" : "opacity-0"}`}>{errors.enquiry_email_address}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-left md:items-center">
              <label className="uppercase w-55">Contact*</label>
              <div className="relative">
                <input type="tel" inputMode="numeric" name="enquiry_phone_number" className="bg-white text-black w-full md:w-xs py-1 px-1 outline-none" onChange={handleEnquiryFormChange} value={enquiryForm.enquiry_phone_number} ref={enquiryPhoneNumberRef} />
                <div className="h-1">
                    <span className={`text-xs transition-all duration-200 ${errors.enquiry_phone_number ? "opacity-100" : "opacity-0"}`}>{errors.enquiry_phone_number}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-left md:items-center">
              <label className="uppercase w-55">Company</label>
              <div className="relative">
                <input type="text" name="enquiry_company_name" className="bg-white text-black w-full md:w-xs py-1 px-1 outline-none" onChange={handleEnquiryFormChange} value={enquiryForm.enquiry_company_name} ref={enquiryCompanyNameRef} />
                <div className="h-1">
                    <span className={`text-xs transition-all duration-200 ${errors.enquiry_company_name ? "opacity-100" : "opacity-0"}`}>{errors.enquiry_company_name}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-left md:items-center">
              <label className="uppercase w-55">Address</label>
              <div className="relative">
                <input type="text" name="enquiry_address" className="bg-white text-black w-full md:w-xs py-1 px-1 outline-none" onChange={handleEnquiryFormChange} value={enquiryForm.enquiry_address} ref={enquiryCompanyNameRef} />
                <div className="h-1">
                    <span className={`text-xs transition-all duration-200 ${errors.enquiry_address ? "opacity-100" : "opacity-0"}`}>{errors.enquiry_address}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-left md:items-center">
              <label className="uppercase w-55">Comments / Enquiry</label>
              <div className="relative">
                <input type="text" name="enquiry_message" className="bg-white text-black w-full md:w-xs py-1 px-1 outline-none" onChange={handleEnquiryFormChange} value={enquiryForm.enquiry_message} ref={enquiryMessageRef} />
                <div className="h-1">
                    <span className={`text-xs transition-all duration-200 ${errors.enquiry_message ? "opacity-100" : "opacity-0"}`}>{errors.enquiry_message}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-left md:items-center">
              <label className="uppercase w-55"></label>
              <input type="submit" className="bg-white text-black py-2 rounded-sm px-3 cursor-pointer w-fit" value="Submit"/>
            </div>
          </form>
          <FloatingLogo />
        </main>
        <Footer />
        <Loader showLoader={showLoader} />
        </>
    )
}