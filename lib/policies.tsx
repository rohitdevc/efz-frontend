"use server";

import { apiGETFetch } from "./api";
import {
    Policy
} from "@/types/api";

export const getPolicies = async () => apiGETFetch<Policy[]>(`policies`);