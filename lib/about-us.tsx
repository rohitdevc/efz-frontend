"use server";

import { apiGETFetch } from "./api";
import {
    AboutIntroduction
} from "@/types/api";

export const getAboutIntroduction = async () => apiGETFetch<AboutIntroduction>(`about/introduction`);