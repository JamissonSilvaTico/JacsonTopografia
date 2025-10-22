import React, { useState, useEffect, useCallback } from "react";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../../api/projectService";
import { Project } from "../../types";

const ProjectFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  project: Project | null;
}> = ({ isOpen, onClose, onSave, project }) => {
  const [formData, setFormData] = useState<Omit<Project, "id">>({
    title: "",
    shortDescription: "",
    longDescription: "",
    imageUrl: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        shortDescription: project.shortDescription,
        longDescription: project.longDescription,
        imageUrl: project.imageUrl,
      });
    } else {
      setFormData({
        title: "",
        shortDescription: "",
        longDescription: "",
        imageUrl: "",
      });
    }
  }, [project, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (project) {
        await updateProject(project.id, formData);
      } else {
        await addProject(formData);
      }
      onSave();
    } catch (error) {
      console.error("Failed to save project:", error);
      alert("Falha ao salvar o projeto.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg m-4 max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          {project ? "Editar Projeto" : "Adicionar Novo Projeto"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">URL da Imagem</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descrição Curta</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows={2}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descrição Longa</label>
            <textarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows={5}
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
              disabled={isSaving}
            >
              {isSaving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProjectsEditorPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    const data = await getProjects();
    setProjects(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleAdd = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      await deleteProject(id);
      loadProjects();
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    loadProjects();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Projetos</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
        >
          Adicionar Projeto
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        {isLoading ? (
          <p className="p-4">Carregando projetos...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrição Curta
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {project.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-sm truncate">
                    {project.shortDescription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-sky-600 hover:text-sky-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        project={selectedProject}
      />
    </div>
  );
};

export default ProjectsEditorPage;
