import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await axios.post(`${API_BASE}/register`, {
    username: username,
    email: email,
    password: password,
  });
  console.log("Registration successful", response.data);
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(
    `${API_BASE}/login`,
    {
      email: email,
      password: password,
    },
    { withCredentials: true }
  );

  if (response.status === 200) {
    location.href = "/dashboard";
  }
};
