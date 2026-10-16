"use server";

import { apiGETFetch } from "./api";
import {
    Newsletter
} from "@/types/api";

export const getNewsletters = async () => apiGETFetch<Newsletter[]>(`newsletters`);