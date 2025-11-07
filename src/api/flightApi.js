const API_URL = "http://localhost:5000/api/flights";

export const getFlights = async () => {
  const response = await fetch(API_URL);
  return response.json();
};
