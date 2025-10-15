import type { SiteSettings } from "../types";

const SESSION_TOKEN_KEY = "gtecdrone_session_token";

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

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Falha na operação de configurações.");
  }
  return response.json();
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const response = await fetch("/api/settings");
  return handleResponse(response);
};

export const updateSiteSettings = async (
  settings: Partial<SiteSettings>
): Promise<SiteSettings> => {
  const response = await fetch("/api/settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(settings),
  });
  return handleResponse(response);
};
