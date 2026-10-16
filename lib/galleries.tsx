"use server";

import { apiGETFetch } from "./api";
import {
    GalleryImage,
    GalleryVideo
} from "@/types/api";

export const getGalleryImages = async () => apiGETFetch<GalleryImage[]>(`galleries/images`);

export const getGalleryVideos = async () => apiGETFetch<GalleryVideo[]>(`galleries/videos`);