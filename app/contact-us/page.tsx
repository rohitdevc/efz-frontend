import {
  getMetaData,
  getBanner
} from '@/lib/common';

import ContactUsPage from "@/components/pages/contact-us";
import { generateMetadata as createMetadata } from '@/components/utils/generateMetadata';

export async function generateMetadata() {
  const [ meta_data, banner ] = await Promise.all([
    getMetaData("Contact Us"),
    getBanner("Home")
  ])

  return createMetadata({
    meta_data,
    banner,
  });
}

export default async function Page() {
  return (
    <ContactUsPage />
  )
}