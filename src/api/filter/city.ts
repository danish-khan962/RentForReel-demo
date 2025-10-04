import axios from "axios";

export const fetchCities = async (state: string): Promise<string[]> => {
  if (!state) return [];

  try {
    // Replace this URL if your Next.js app runs on a different domain
    const response = await axios.get(`/api/location/India/${encodeURIComponent(state)}`);

    if (!response.data.error && response.data.cities) {
      return response.data.cities;
    } else {
      console.error("Unexpected API response format", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
