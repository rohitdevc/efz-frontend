export interface MetaData {
    meta_title: string;
    meta_description: string;
    canonical_url: string;
}

export interface Banner {
    banner_image_url: string;
    banner_image_caption?: string;
    banner_image_description?: string;
}

export interface TokenResponse {
    access_token: string;
}

export interface HomeSlider {
    slider_caption: string;
    slider_image_url: string;
}

export interface AboutIntroduction {
    introduction_caption: string;
    introduction_description: string;
}

export interface ProjectDeveloperIntroduction {
    introduction_description: string;
}

export interface Project {
    project_name: string;
    project_logo_url: string;
    banner_image_url: string;
}

export interface GalleryImageData {
    gallery_name: string;
    gallery_image_url: string;
}

export interface GalleryImage {
    category_name: string;
    galleries_data: GalleryImageData[]
}

export interface GalleryVideoData {
    gallery_name: string;
    gallery_image_url: string;
    gallery_embed_url: string;
}

export interface GalleryVideo {
    category_name: string;
    galleries_data: GalleryVideoData[]
}

type PolicyReport = {
    report_name: string;
    report_pdf_url: string;
}

export interface Policy {
    category_name: string;
    reports_data: PolicyReport[]
}

export interface Newsletter {
    newsletter_name: string;
    newsletter_thumbnail_url: string;
    newsletter_pdf_url: string;
}

type Summary = {
    summary_name: string;
    summary_description: string;
}

type Specification = {
    specification_name: string;
    specification_description: string;
}

type FloorPlan = {
    floor_plan_name: string;
    floor_plan_image_url: string;
}

type Gallery = {
    gallery_name: string;
    gallery_image_url: string;
}

type BusinessSupportService = {
    business_support_service_name: string;
    business_support_service_description: string;
}

type FoodCourtSupportService = {
    food_court_support_service_name: string;
    food_court_support_service_description: string;
}

type Client = {
    client_name: string;
    client_logo_url: string;
}

export interface Developments {
    project_name: string;
    introduction_caption: string;
    introduction_description: string;
    summary_caption: string;
    summaries_data: Summary[];
    specifications_data: Specification[];
    business_support_services_data: BusinessSupportService[];
    food_court_support_services_data: FoodCourtSupportService[];
    floor_plans_data: FloorPlan[];
    galleries_data: Gallery[];
    clients_data: Client[];
    meta_title: string;
    meta_description: string;
    banner_image_url: string;
    banner_video_url: string;
    canonical_url: string;
}

export interface Development {
    project_name: string;
    page_slug: string;
}