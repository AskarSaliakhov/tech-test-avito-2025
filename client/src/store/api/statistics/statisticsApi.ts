import { useQuery } from "@tanstack/react-query";
import { api } from "../api.ts";

export const useDecisions = () => {
    return useQuery({
        queryKey: ["decisions"],
        queryFn: async () => {
            const { data } = await api.get(`/stats/chart/decisions`);
            return data;
        },
    });
};

export const useActivity = () => {
    return useQuery({
        queryKey: ["activity"],
        queryFn: async () => {
            const { data } = await api.get(`/stats/chart/activity`);
            return data;
        },
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await api.get(`/stats/chart/categories`);
            return data;
        },
    });
};

export const useSummary = () => {
    return useQuery({
        queryKey: ["summary"],
        queryFn: async () => {
            const { data } = await api.get(`/stats/summary`);
            return data;
        },
    });
};
