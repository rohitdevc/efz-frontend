import {
  getMetaData,
  getBanner
} from '@/lib/common';

import {
  getAboutIntroduction
} from '@/lib/about-us';

import AboutUsPage from "@/components/pages/about-us";
import { generateMetadata as createMetadata } from '@/components/utils/generateMetadata';

export async function generateMetadata() {
  const [meta_data, banner ] = await Promise.all([
    getMetaData("About Us"),
    getBanner("Home")
  ]);;

  return createMetadata({
    meta_data,
    banner,
  });
}

export default async function Page() {
  const [
    introduction
  ] = await Promise.all([
    getAboutIntroduction()
  ]);

  return (
    <AboutUsPage
    introduction={introduction}
    />
  )
}