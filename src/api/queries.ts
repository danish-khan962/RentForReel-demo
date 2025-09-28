import axiosInstance from "./axiosInstance";

const myQueries = {
    // Get spaces with filters
    getSpaces: async (filters: {
        city?: string;
        state?: string;
        popularity?: string;
        priceMinHour?: number;
        priceMaxHour?: number;
    }) => {
        const response = await axiosInstance.get(`/listing/all?limit=16`, {
            params: filters,
        });
        return response.data;
    },

    // Get a single space by ID
    getSpaceById: async (id: string) => {
        const response = await axiosInstance.get(`/listing/${id}`);
        return response.data;
    },

    // Send a space-specific enquiry form data
    sendEnquiry: async (payload: {
        name: string;
        email: string;
        phone: string;
        spaceId: string;
        authId: string;
    }) => {
        const response = await axiosInstance.post(`/enquiry/${payload.spaceId}`, payload);
        return response.data;
    },

    //  Add the new function to send platform enquiries
    sendPlatformEnquiry: async (payload: {
        name: string;
        email: string;
        phone: string;
        budget: string;
        purpose: string;
    }) => {
        const response = await axiosInstance.post('/enquiry/platform/enquiry', payload);
        return response.data;
    },
};

export default myQueries;