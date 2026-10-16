import {
  getMetaData,
  getBanner
} from '@/lib/common';

import {
  getGalleryImages,
  getGalleryVideos
} from '@/lib/galleries';

import GalleryPage from "@/components/pages/gallery";
import { generateMetadata as createMetadata } from '@/components/utils/generateMetadata';

const banner = await getBanner('Gallery');

export async function generateMetadata() {
  const [meta_data ] = await Promise.all([
    getMetaData("Gallery")
  ]);;

  return createMetadata({
    meta_data,
    banner,
  });
}

export default async function Page() {
  const [
    images,
    videos
  ] = await Promise.all([
    getGalleryImages(),
    getGalleryVideos()
  ]);

  return (
    <GalleryPage
    banner={banner}
    images={images}
    videos={videos}
    />
  )
}