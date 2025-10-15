import type { Company } from "../types";

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
  if (response.status === 204) return null;
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Ocorreu um erro na operação.");
  }
  return response.json();
};

export const getCompanies = async (): Promise<Company[]> => {
  const response = await fetch("/api/companies");
  return handleResponse(response);
};

export const addCompany = async (
  companyData: Omit<Company, "_id">
): Promise<Company> => {
  const response = await fetch("/api/companies", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(companyData),
  });
  return handleResponse(response);
};

export const updateCompany = async (
  id: string,
  companyData: Partial<Omit<Company, "_id">>
): Promise<Company> => {
  const response = await fetch(`/api/companies/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify(companyData),
  });
  return handleResponse(response);
};

export const deleteCompany = async (id: string): Promise<void> => {
  const response = await fetch(`/api/companies/${id}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
  await handleResponse(response);
};
