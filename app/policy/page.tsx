import {
  getMetaData,
  getBanner
} from '@/lib/common';

import {
  getPolicies
} from '@/lib/policies';

import PolicyPage from "@/components/pages/policy";
import { generateMetadata as createMetadata } from '@/components/utils/generateMetadata';

export async function generateMetadata() {
  const [ meta_data, banner ] = await Promise.all([
    getMetaData("Policy"),
    getBanner("Home")
  ])

  return createMetadata({
    meta_data,
    banner,
  });
}

export default async function Page() {
  const policies = await getPolicies();

  return (
    <PolicyPage
    policies={policies}
    />
  )
}