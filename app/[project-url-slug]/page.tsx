import { generateMetadata as createMetadata } from '@/components/utils/generateMetadata';
import { getDevelopments, getDevelopment } from '@/lib/developments';
import { notFound } from "next/navigation";
import ProjectPage from '@/components/pages/project';

type PageProps = {
  params: Promise<{
    "project-url-slug": string
  }>
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const developments = await getDevelopments();

  return developments.map((development) => {
    return {
      "project-url-slug": development.page_slug,
    }
  });
}

export async function generateMetadata({ params }: PageProps) {
  const { "project-url-slug": project_url_slug } = await params;
  
  const [meta_data] = await Promise.all([
    getDevelopment(project_url_slug)
  ]);

  if(!meta_data) {
    notFound();
  }

  const banner = meta_data;

  return createMetadata({
    meta_data,
    banner,
  });
}

export default async function Page({ params }: PageProps) {
  const { "project-url-slug": project_url_slug } = await params;

  const project = await getDevelopment(project_url_slug);

  if(!project) {
    notFound();
  }

  return (
    <ProjectPage
    project={project}
    />
  )
}