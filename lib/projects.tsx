"use server";

import { apiGETFetch } from "./api";
import {
    ProjectDeveloperIntroduction,
    Project
} from "@/types/api";

export const getProjectDeveloperIntroduction = async () => apiGETFetch<ProjectDeveloperIntroduction>(`project-developers/introduction`);

export const getProjects = async () => apiGETFetch<Project[]>(`project-developers/projects`);