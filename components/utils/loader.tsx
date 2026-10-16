type Props = {
    showLoader: boolean
}

export default function Loader({showLoader}: Props) {
    const basePath = process.env.NEXT_PUBLIC_PATH!.replace(/\/$/, "");
    
    return (
        <div className={`h-full w-full fixed top-0 left-0 z-15 cursor-wait bg-center bg-no-repeat bg-white opacity-50 ${showLoader === false ? 'hidden': ''}`} style={{backgroundImage: `url(${basePath}/images/img_loader.gif)`}}></div>
    )
}