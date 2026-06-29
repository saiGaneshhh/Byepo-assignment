import api from "./api";

export const getOrganizations = async () => {
    const response = await api.get("/organizations/public");
    return response.data;
};

export const checkFeature = async (data) => {
    const response = await api.post("/features/check", data);
    return response.data;
};