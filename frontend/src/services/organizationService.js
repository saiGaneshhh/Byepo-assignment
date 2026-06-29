import api from "./api";

export const getOrganizations = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/organizations/all", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const createOrganization = async (data) => {
    const token = localStorage.getItem("token");

    const response = await api.post("/organizations/create", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const updateOrganization = async (id, data) => {
    const token = localStorage.getItem("token");

    const response = await api.put(
        `/organizations/update/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const deleteOrganization = async (id) => {
    const token = localStorage.getItem("token");

    const response = await api.delete(
        `/organizations/delete/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};