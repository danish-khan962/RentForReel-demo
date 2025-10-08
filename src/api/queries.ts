import axiosInstance from "./axiosInstance";

// Define a type for the filters object
export interface GetSpacesFilters {
  limit?: number
  page?: number
  q?: string
  city?: string
  state?: string
  popularity?: string
  fetchAll?: boolean // flag for client-side search
}

const myQueries = {
  // Get spaces with filters
  getSpaces: async (filters: GetSpacesFilters) => {
    const { fetchAll, ...apiFilters } = filters

    // Determine limit
    const limit = fetchAll ? 9999 : filters.limit || 16
    const queryFilters: Record<string, string | number> = { ...apiFilters, limit }

    const response = await axiosInstance.get("/listing/all", {
      params: queryFilters,
    })
    return response.data
  },

  // Get a single space by ID
  getSpaceById: async (id: string) => {
    const response = await axiosInstance.get(`/listing/${id}`)
    return response.data
  },

  // Send a space-specific enquiry form data
  sendEnquiry: async (payload: {
    name: string
    email: string
    phone: string
    spaceId: string
    authId: string
  }) => {
    const response = await axiosInstance.post(`/enquiry/${payload.spaceId}`, payload)
    return response.data
  },

  // Send platform enquiries
  sendPlatformEnquiry: async (payload: {
    name: string
    email: string
    phone: string
    budget: string
    purpose: string
  }) => {
    const response = await axiosInstance.post("/enquiry/platform/enquiry", payload)
    return response.data
  },

  // Get videos for creator's spotlight wall
  getVideos: async () => {
    const response = await axiosInstance.get("/admin/videos")
    return response.data
  },

  //Getting cards for featured listing
  getFeaturedSpaces: async (stateName: string) => {
  const response = await axiosInstance.get(`/listing/featured/${stateName}`)
  return response.data
}
}

export default myQueries
