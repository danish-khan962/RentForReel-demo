import axios from "axios";

const STATE_API_URL = process.env.NEXT_PUBLIC_STATE_API_URL as string;

export interface State {
  name: string;
  state_code: string;
}

export const fetchStates = async (): Promise<string[]> => {
  try {
    if (!STATE_API_URL) {
      console.error("Environment variable NEXT_PUBLIC_STATE_API_URL is missing");
      return [];
    }

    const response = await axios.get(STATE_API_URL);
    if (!response.data.error && response.data.data?.states) {
      return response.data.data.states.map((state: State) => state.name);
    } else {
      console.error("Unexpected API response format", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
};
