import React, { useState, useEffect, useCallback } from "react";
import {
  getAllHomePageSections,
  addHomePageSection,
  updateHomePageSection,
  deleteHomePageSection,
} from "../../api/homeSectionsService";
import { HomePageSection } from "../../types";

type SectionFormData = Omit<HomePageSection, "_id" | "type">;

const SectionFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  section: HomePageSection | null;
}> = ({ isOpen, onClose, onSave, section }) => {
  const [formData, setFormData] = useState<SectionFormData>({
    title: "",
    subtitle: "",
    content: "",
    order: 0,
    visible: true,
    imageUrl: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (section) {
      setFormData({
        title: section.title,
        subtitle: section.subtitle || "",
        content: section.content || "",
        order: section.order,
        visible: section.visible,
        imageUrl: section.imageUrl || "",
      });
    } else {
      setFormData({
        title: "",
        subtitle: "",
        content: "",
        order: 0,
        visible: true,
        imageUrl: "",
      });
    }
  }, [section, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({
        ...formData,
        [name]: type === "number" ? parseInt(value) || 0 : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (section) {
        await updateHomePageSection(section._id, formData);
      } else {
        await addHomePageSection(formData);
      }
      onSave();
    } catch (error) {
      console.error("Failed to save section:", error);
      alert("Falha ao salvar a seção.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          {section ? "Editar Seção" : "Adicionar Nova Seção"}
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
            <label className="block text-gray-700">Subtítulo</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Conteúdo (Parágrafo)</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows={5}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              URL da Imagem (Opcional)
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ordem de Exibição</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="visible"
                checked={formData.visible}
                onChange={handleChange}
                className="h-5 w-5 text-sky-600 rounded"
              />
              <span className="ml-2 text-gray-700">Visível no site</span>
            </label>
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

const HomePageSectionsPage: React.FC = () => {
  const [sections, setSections] = useState<HomePageSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] =
    useState<HomePageSection | null>(null);

  const loadSections = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllHomePageSections();
      setSections(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error("Failed to load sections:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  const handleAdd = () => {
    setSelectedSection(null);
    setIsModalOpen(true);
  };

  const handleEdit = (section: HomePageSection) => {
    setSelectedSection(section);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta seção?")) {
      await deleteHomePageSection(id);
      loadSections();
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    loadSections();
  };

  const handleToggleVisibility = async (section: HomePageSection) => {
    await updateHomePageSection(section._id, { visible: !section.visible });
    loadSections();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          Seções da Página Inicial
        </h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
        >
          Adicionar Seção
        </button>
      </div>

      {isLoading ? (
        <p>Carregando seções...</p>
      ) : (
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section._id}
              className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {section.title}{" "}
                  {section.type === "services" && (
                    <span className="text-xs bg-gray-200 text-gray-600 font-medium ml-2 px-2 py-1 rounded-full">
                      SISTEMA
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-500">
                  Ordem: {section.order} |{" "}
                  {section.visible ? (
                    <span className="text-green-600">Visível</span>
                  ) : (
                    <span className="text-gray-400">Oculto</span>
                  )}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleToggleVisibility(section)}
                  className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"
                  title={section.visible ? "Ocultar" : "Mostrar"}
                >
                  {section.visible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C3.732 4.943 9.522 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-9.064 7-9.542 7S3.268 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.27 8.138 15.522 5 10 5a9.74 9.74 0 00-3.536.793l-1.766-1.766zM10 13a3 3 0 110-6 3 3 0 010 6z"
                        clipRule="evenodd"
                      />
                      <path d="M2 10C3.27 11.862 6.018 15 10 15c.65 0 1.284-.136 1.897-.393l-1.465-1.465A5.003 5.003 0 0110 12a5 5 0 01-2.424-.93L5.68 12.82A9.975 9.975 0 012 10z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => handleEdit(section)}
                  className="text-sky-600 hover:text-sky-900 p-2"
                >
                  Editar
                </button>
                {section.type !== "services" && (
                  <button
                    onClick={() => handleDelete(section._id)}
                    className="text-red-600 hover:text-red-900 p-2"
                  >
                    Excluir
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <SectionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        section={selectedSection}
      />
    </div>
  );
};

export default HomePageSectionsPage;
