import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api.ts";

export const useAdvertisements = ({ page = 1, search = '', filters = [] }) => {
    return useQuery({
        queryKey: ["advertisementsData", page, search, filters],
        queryFn: async () => {
            const { data } = await api.get("/ads", {
                params: { page, search, filters },
            });
            return data;
        },
    });
};

export const useAdvertisement = (id: number) => {
    return useQuery({
        queryKey: ["oneAdvertisement", id],
        queryFn: async () => {
            const { data } = await api.get(`/ads/${id}`);
            return data;
        },
    });
};

export const useApproveAdvertisement = (id: number) => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const { data } = await api.post(`/ads/${id}/approve`);
            return data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["oneAdvertisement", id] });
        }
    });
}


export const useRejectAdvertisement = (id: number) => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (body: { reason: string; comment: string }) => {
            const { data } = await api.post(`/ads/${id}/reject`, body);
            return data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["oneAdvertisement", id] });
        },
    });
};

export const useRequestChangesAdvertisement = (id: number) => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (body: { reason: string; comment: string }) => {
            const { data } = await api.post(`/ads/${id}/request-changes`, body);
            return data;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["oneAdvertisement", id] });
        },
    });
};


