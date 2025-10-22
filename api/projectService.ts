import type { Project } from "../types";

const getAuthToken = (): string | null => {
  return sessionStorage.getItem("gtecdrone_session_token");
};

const getAuthHeader = (): Record<string, string> => {
  const token = getAuthToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

const handleResponse = async (response: Response) => {
  if (response.status === 204) return null; // Handle No Content response for delete
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Ocorreu um erro na operação de projeto.");
  }
  return response.json();
};

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch("/api/projects");
  return handleResponse(response);
};

export const getProjectById = async (
  id: string
): Promise<Project | undefined> => {
  const response = await fetch(`/api/projects/${id}`);
  if (response.status === 404) return undefined;
  return handleResponse(response);
};

export const addProject = async (
  project: Omit<Project, "id">
): Promise<Project> => {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(project),
  });
  return handleResponse(response);
};

export const updateProject = async (
  id: string,
  updatedProjectData: Partial<Project>
): Promise<Project> => {
  const response = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(updatedProjectData),
  });
  return handleResponse(response);
};

export const deleteProject = async (
  id: string
): Promise<{ success: boolean }> => {
  const response = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Falha ao excluir projeto.");
  }
  return { success: true };
};
