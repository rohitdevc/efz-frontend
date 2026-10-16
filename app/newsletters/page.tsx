import {
  getMetaData,
  getBanner
} from '@/lib/common';

import { getNewsletters } from '@/lib/newsletters';

import NewsletterPage from "@/components/pages/newsletters";
import { generateMetadata as createMetadata } from '@/components/utils/generateMetadata';

const banner = await getBanner('Gallery');

export async function generateMetadata() {
  const [ meta_data ] = await Promise.all([
    getMetaData("Newsletters")
  ])

  return createMetadata({
    meta_data,
    banner,
  });
}

export default async function Page() {
  const newsletters = await getNewsletters();

  return (
    <NewsletterPage
    banner={banner}
    newsletters={newsletters}
    />
  )
}