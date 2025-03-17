import axios from "../utils/api";

export async function loginRequest(user: string, password: string) {
  return (await axios.post("/auth/login", {user, password}));
}

export async function checkAuthStatus() {
    return await axios.get("/auth/auth-status")
}
