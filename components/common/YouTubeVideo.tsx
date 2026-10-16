import { IoCloseCircleOutline } from "react-icons/io5";
import { useState, forwardRef, useImperativeHandle } from "react";

export type YTVideoPopupHandle = {
    open: (youtubeId: string) => void;
};

const YTVideoPopUp = forwardRef<YTVideoPopupHandle>((_, ref) => {
    const [activePopUp, updateActivePopUp] = useState(false);
    const [YouTubeVideoId, setYouTubeVideoId] = useState<string | null>(null);
    
    useImperativeHandle(ref, () => ({
        open: (id: string) => {
            setYouTubeVideoId(id);
            updateActivePopUp(true);
        },
    }));
    
    if (!activePopUp || !YouTubeVideoId) return null;

    return (
        <div className={`fixed top-0 left-0 w-full h-screen z-10 flex justify-center items-center bg-black/75 transform origin-center transition-opacity duration-300 ${activePopUp ? 'opacity-100' : 'opacity-0'}`}>
            <IoCloseCircleOutline className="absolute top-1/4 lg:top-5 right-5 cursor-pointer text-white" size={45} onClick={() => updateActivePopUp(false)} />        
            <iframe src={`${YouTubeVideoId}?autoplay=1&rel=0&modestbranding=1&controls=1`} className="w-[90%] max-w-4xl aspect-video" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        </div>
    )
})

export default YTVideoPopUp;