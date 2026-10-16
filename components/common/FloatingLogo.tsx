import Image from "next/image"

export default function FloatingLogo() {
    const basePath = process.env.NEXT_PUBLIC_PATH!.replace(/\/$/, "");

    return (
        <Image className="fixed right-5 md:right-10 bottom-25 md:bottom-30 w-10 md:w-15 z-10" src={`${basePath}/images/panchshil-logo.jpg`} width={143} height={143} alt="Panchshil Logo" />
    )
}