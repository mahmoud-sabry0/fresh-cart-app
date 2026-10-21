import axios from "axios";

export const api = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
});

// read the token on every request so login/logout take effect immediately
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) config.headers.token = token;
  return config;
});

export function getErrorMessage(err) {
  const data = err?.response?.data;
  // validation failures come back as { message: "fail", errors: { msg } }
  return data?.errors?.msg || data?.message || err?.message || "Something went wrong";
}

// resolves to { data } even on failure, so callers can safely check data.status
export function safeRequest(promise) {
  return promise.catch((err) => ({
    data: err?.response?.data ?? { status: "error", message: getErrorMessage(err) },
  }));
}

export function getUserIdFromToken(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(payload)).id;
  } catch {
    return null;
  }
}
