// src/api/filter/locality.ts
import axios from "axios";

export const fetchLocalities = async (pincode: string): Promise<string[]> => {
  try {
    if (!pincode) return [];

    const res = await axios.get(`/api/pincode/${pincode}`);
    if (res.data && Array.isArray(res.data)) {
      return res.data;
    } else {
      console.error("Unexpected response format", res.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching localities:", error);
    return [];
  }
};
