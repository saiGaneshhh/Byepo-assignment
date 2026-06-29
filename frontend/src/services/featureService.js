import api from "./api";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
    Authorization: `Bearer ${getToken()}`
});

// Get All Features
export const getFeatures = async () => {
    const response = await api.get("/features/all", {
        headers: headers(),
    });

    return response.data;
};

// Create Feature
export const createFeature = async (data) => {
    const response = await api.post(
        "/features/create",
        data,
        {
            headers: headers(),
        }
    );

    return response.data;
};

// Update Feature
export const updateFeature = async (id, data) => {
    const response = await api.put(
        `/features/update/${id}`,
        data,
        {
            headers: headers(),
        }
    );

    return response.data;
};

// Delete Feature
export const deleteFeature = async (id) => {
    const response = await api.delete(
        `/features/delete/${id}`,
        {
            headers: headers(),
        }
    );

    return response.data;
};