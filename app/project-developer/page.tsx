import {
  getMetaData,
  getBanner
} from '@/lib/common';

import {
  getProjectDeveloperIntroduction,
  getProjects
} from '@/lib/projects';

import ProjectDeveloperPage from "@/components/pages/project-developer";
import { generateMetadata as createMetadata } from '@/components/utils/generateMetadata';

export async function generateMetadata() {
  const [ meta_data, banner ] = await Promise.all([
    getMetaData("Project Developer"),
    getBanner("Home")
  ])

  return createMetadata({
    meta_data,
    banner,
  });
}

export default async function Page() {
  const [
    introduction,
    projects
  ] = await Promise.all([
    getProjectDeveloperIntroduction(),
    getProjects()
  ]);

  return (
    <ProjectDeveloperPage
    introduction={introduction}
    projects={projects}
    />
  )
}