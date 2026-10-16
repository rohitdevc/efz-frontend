"use server";

import { apiGETFetch } from "./api";
import {
    HomeSlider
} from "@/types/api";

export const getSliders = async () => apiGETFetch<HomeSlider[]>(`home/slider`);