// api.js
import axios from "axios";

const API_KEY = "0841e504c4msh72936683e333123p1b7064jsn394fedc4d559";

export const fetchJobsByCity = async (city) => {
  const url = `https://jsearch.p.rapidapi.com/search?query=developer%20in%20${city}&page=1&num_pages=1`;

  const headers = {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data.data; // returns array of job objects
  } catch (error) {
    console.error("Job fetch error:", error);
    return [];
  }
};
