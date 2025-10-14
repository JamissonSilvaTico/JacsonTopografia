// --- AUTHENTICATION SERVICE ---
// Makes API calls to the backend for authentication.

const SESSION_TOKEN_KEY = "gtecdrone_session_token";

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Ocorreu um erro.");
  }
  return data;
};

export const login = async (username: any, password: any) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await handleResponse(response);
  if (data.token) {
    sessionStorage.setItem(SESSION_TOKEN_KEY, data.token);
  }
  return data;
};

export const logout = () => {
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
};

export const isAuthenticated = () => {
  return sessionStorage.getItem(SESSION_TOKEN_KEY) !== null;
};

const getAuthToken = (): string | null => {
  return sessionStorage.getItem(SESSION_TOKEN_KEY);
};

const getAuthHeader = (): Record<string, string> => {
  const token = getAuthToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export const changePassword = async (oldPassword: any, newPassword: any) => {
  const response = await fetch("/api/auth/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });
  return handleResponse(response);
};
