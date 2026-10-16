import { Banner, MetaData } from "@/types/api";
import type { Metadata } from "next";

type Props = {
  meta_data: MetaData
  banner: Banner
}

export async function generateMetadata({meta_data, banner}: Props): Promise<Metadata> {
  return {
    title: meta_data.meta_title,
    description: meta_data.meta_description,
    alternates: {
      canonical: meta_data.canonical_url,
    },

    other: {
      "msapplication-TileColor": "#da532c",
    },

    openGraph: {
      title: meta_data.meta_title,
      description: meta_data.meta_description,
      type: "website",
      url: meta_data.canonical_url,
      siteName: process.env.PROJECT_NAME,
      images: [
        {
          url: banner.banner_image_url,
          width: 1200,
          height: 630,
          alt: meta_data.meta_title
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: meta_data.meta_title,
      description: meta_data.meta_description,
      images: [banner.banner_image_url],
    },
  }
}