import axios from "../utils/api";

export async function loginRequest(user: string, password: string) {
  return (await axios.post("/login", {user, password}));
}

export async function checkAuthStatus() {
    return await axios.get("/auth-status")
}
