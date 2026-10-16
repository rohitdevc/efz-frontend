import { Banner } from "@/types/api";

type Props = {
    page_name: string;
    banner: Banner
}

export default function CommonBanner({page_name, banner}: Props) {
    return (
        <section className="w-full h-60 bg-cover bg-center bg-no-repeat flex justify-center items-center text-white" style={{backgroundImage: `url(${banner.banner_image_url})`}}>
            <h1 className="text-3xl uppercase">{page_name}</h1>
        </section>
    )
}