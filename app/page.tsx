import {
  getMetaData,
  getBanner
} from '@/lib/common';

import { getSliders } from '@/lib/home';

import HomePage from "@/components/pages/home";
import { generateMetadata as createMetadata } from '@/components/utils/generateMetadata';

export async function generateMetadata() {
  const [meta_data, banner ] = await Promise.all([
    getMetaData("Home"),
    getBanner("Home")
  ]);;

  return createMetadata({
    meta_data,
    banner,
  });
}

export default async function Page() {
  const sliders = await getSliders();
  
  return (
    <HomePage sliders={sliders}
    />
  )
}